<?php

namespace App\Models;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supervisor extends Model
{
    use SoftDeletes;

    protected $table = 'supervisors';

    protected $dates = ['deleted_at'];

    protected $casts = ['is_accredited' => 'boolean'];

    protected $fillable = [
    	'first_name', 
        'last_name',
        'gender',
        'is_accredited'
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
