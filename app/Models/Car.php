<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'cars';

    protected $fillable = [
        'year', 'make', 'model', 'trans', 'type', 'regno', 'odo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
