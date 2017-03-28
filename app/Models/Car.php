<?php

namespace App\Models;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes;

    public static $types = [
        'sedan',
        'wagon',
        'suv',
        'off road',
        'hatchback',
        'coupe',
        'convertible',
        'sports',
        'ute',
        'micro',
        'van'
    ];

    protected $table = 'cars';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'registration',
        'type'
    ];

    protected $hidden = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
