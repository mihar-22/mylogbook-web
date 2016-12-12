<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $casts = [
        'is_verified' => 'boolean'
    ];

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];

    public function setPasswordAttribute($password) 
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function generateApiToken() 
    {
        $bytes = random_bytes(random_int(32, 64));

        $this->api_token = bin2hex($bytes);

        $this->save();
    }

    public function invalidateApiToken()
    {
        $this->api_token = null;

        $this->save();
    }

    public function confirmEmail()
    {
        $this->is_verified = true;

        $this->save();
    }

    public function resetPassword($password)
    {
        $this->password = $password;

        $this->save();
    }
}
