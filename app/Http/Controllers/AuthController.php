<?php

namespace App\Http\Controllers;

use App\Auth\EmailBroker;
use App\Facades\ApiResponder;
use App\Http\Requests\Auth\LoginUser;
use App\Http\Requests\Auth\RegisterUser;
use App\Http\Requests\Auth\VerifyEmail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	private $users;

	private $broker;

	public function __construct(User $users, EmailBroker $broker)
	{
		$this->middleware('auth')->only(['check', 'logout']);

        $this->users = $users;

		$this->broker = $broker;
	}

    public function register(RegisterUser $request)
    {
    	$user = $this->users->create($request->all());

    	$this->broker->sendVerifyLink($user);

        return ApiResponder::respondWithMessage('confirmation email sent')
                             ->setStatusCode(201);
    }

    public function check()
    {
        return ApiResponder::respondWithMessage('authenticated')
                             ->setStatusCode(200);
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

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'api_token' => $user->api_token,
            'birthday' => $user->birthday
        ];

        return ApiResponder::respondWithData('user authenticated', $data)
                             ->setStatusCode(200);
    }

    public function logout()
    {
        Auth::user()->invalidateApiToken();

        return ApiResponder::respondWithMessage('user logged out')
                             ->setStatusCode(200);
    }

    public function verify(VerifyEmail $request)
    {
        $user = $this->users->whereEmail($request->email)->first();

    	if ( ! $this->broker->verify($user, $request->token) ) {
            return ApiResponder::respondWithMessage('email verification failed')
                                 ->setStatusCode(400);
        }

        return ApiResponder::respondWithMessage('email verified')
                             ->setStatusCode(200);
    }
}
