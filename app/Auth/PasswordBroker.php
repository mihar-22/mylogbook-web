<?php

namespace App\Auth;

use App\Notifications\ResetPassword as ResetPasswordNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PasswordBroker
{
    private $table = 'password_resets';

    public function sendResetLink($user)
    {
        $token = $this->create($user->email);

        $user->notify(new ResetPasswordNotification($token));
    }

    public function reset($user, $password, $token)
    {
        if ( ! ($this->exists($user->email, $token) && $this->delete($user->email)) ) return false;

        $user->resetPassword($password);

        return true;
    }

    private function exists($email, $token)
    {
        $token = (array) $this->getTable()->where('email', $email)->where('token', $token)->first();

        return $token && ( ! $this->hasTokenExpired($token) );
    }

    private function create($email)
    {
        $this->delete($email);

        $token = $this->createNewToken();

        $this->getTable()->insert($this->getPayload($email, $token));

        return $token;
    }

    private function hasTokenExpired($token)
    {
        $expiresAt = Carbon::parse($token['created_at'])->addSeconds((60 * 60));

        return $expiresAt->isPast();
    }

    private function delete($email)
    {
        return $this->getTable()->where('email', $email)->delete();
    }

    private function getPayload($email, $token)
    {
        return ['email' => $email, 'token' => $token, 'created_at' => new Carbon];
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