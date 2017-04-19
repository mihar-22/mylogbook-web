<?php

namespace App\Http\Controllers;

use App\Auth\PasswordBroker;
use App\Facades\ApiResponder;
use App\Http\Requests\Password\ResetPassword;
use App\Http\Requests\Password\SendResetLink;
use App\Models\User;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    private $users;

    private $broker;

    public function __construct(User $users, PasswordBroker $broker)
    {
        $this->broker = $broker;

        $this->users = $users;
    }

    public function sendResetLink(SendResetLink $request)
    {
        $user = $this->users->whereEmail($request->email)->first();

        $this->broker->sendResetLink($user);

        return ApiResponder::respondWithMessage('reset link sent')
                             ->setStatusCode(200);
    }

    public function showResetForm($email, $token)
    {
        return view('password.reset')->with(
            ['email' => $email, 'token' => $token]
        );
    }

    public function resetPassword(ResetPassword $request)
    {	
        $user = $this->users->whereEmail($request->email)->first();

        if ( ! $this->broker->reset($user, $request->password, $request->token) ) abort(404);

        $user->invalidateApiToken();
       
       return view('password.success');
    }
}
