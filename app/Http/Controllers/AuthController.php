<?php

namespace App\Http\Controllers;

use App\Auth\EmailBroker;
use App\Facades\ApiResponder;
use App\Http\Requests\Auth\LoginUser;
use App\Http\Requests\Auth\LogoutUser;
use App\Http\Requests\Auth\RegisterUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	private $users;

	private $broker;

	public function __construct(User $users, EmailBroker $broker)
	{
		$this->users = $users;

		$this->broker = $broker;
	}

    public function register(RegisterUser $request)
    {
    	$newUser = $request->only(['name', 'email', 'password']);

    	$user = $this->users->create($newUser);

    	$this->broker->sendVerifyLink($user);

        return ApiResponder::respondWithMessage('confirmation email sent')
                             ->setStatusCode(201);
    }

    public function login(LoginUser $request)
    {
    	$credentials = [
    		'email' => $request->email, 
    		'password' => $request->password,
    		'is_verified' => 1 
    	];

    	if ( ! Auth::guard('web')->attempt($credentials) ) 
            return ApiResponder::respondWithMessage('invalid credentials')
                                 ->setStatusCode(400);

        $user = $this->users->whereEmail($credentials['email'])->first();

        $user->generateApiToken();

        $data = ['api_token' => $user->api_token];

        return ApiResponder::respondWithData('user authenticated', $data)
                             ->setStatusCode(200);
    }

    public function logout(LogoutUser $request)
    {
        Auth::user()->invalidateApiToken();

        return ApiResponder::respondWithMessage('user logged out')
                             ->setStatusCode(200);
    }

    public function verifyEmail(Request $request, $email, $token)
    {
        $user = $this->users->whereEmail($email)->firstOrFail();

    	if ( ! $this->broker->verify($user, $token) ) abort(404);

		return view('auth.email.success');
    }
}
