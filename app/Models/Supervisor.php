<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    protected $table = 'supervisors';

    protected $fillable = [
    	'first_name', 'last_name', 'gender', 'avatar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
