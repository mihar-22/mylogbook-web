<?php

namespace App\Auth;

use App\Notifications\VerifyEmail as VerifyEmailNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EmailBroker
{
    private $table = 'email_validations';

    public function sendVerifyLink($user)
    {
        $token = $this->create($user->email);

        $user->notify(new VerifyEmailNotification($token));
    }

    public function verify($user, $token)
    {
        if ( ! ($this->exists($user->email, $token) && $this->delete($user->email)) ) return false;
    
        $user->confirmEmail();

        return true;
    }

    private function create($email)
    {
        $this->delete($email);

        $token = $this->createNewToken();

        $this->getTable()->insert($this->getPayload($email, $token));

        return $token;
    }

    private function exists($email, $token)
    {
        return $this->getTable()->where('email', $email)->where('token', $token)->first();
    }

    private function delete($email)
    {
        return $this->getTable()->where('email', $email)->delete();
    }

    private function getPayload($email, $token)
    {
        return ['email' => $email, 'token' => $token];
    }

    private function createNewToken()
    {
        return hash_hmac('sha256', Str::random(40), env('APP_KEY'));
    }

    private function getTable()
    {
        return DB::table($this->table);
    }
}