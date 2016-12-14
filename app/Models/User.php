<?php

namespace App\Models;

use App\Models\Car;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

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

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

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
