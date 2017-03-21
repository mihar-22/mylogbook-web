<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    // C = Clear, R = Rain, T = Thunder, F = Fog, H = Hail, S = Snow
    public static $weatherConditions = [
        'C', 'R', 'T', 'F', 'H', 'S'
    ];

    // L = Light, M = Moderate, H = Heavy
    public static $trafficConditions = [
        'L', 'M', 'H'
    ];

    // L = Local Street, M = Main Road, I = Inner City, F = Freeway, R = Rural Road, G = Gravel
    public static $roadConditions = [
        'L', 'M', 'I', 'F', 'R', 'G'
    ];

	public $timestamps = false;

    protected $table = 'trips';

    protected $dates = ['started_at', 'ended_at'];

    protected $fillable = [
    	'started_at',
    	'ended_at',
    	'odometer',    	
    	'distance',
        'weather',
        'traffic',
        'roads',
        'start_latitude',
        'start_longitude',        
        'end_latitude',
        'end_longitude',
        'timezone',
        'car_id',
        'supervisor_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(Supervisor::class);
    }
}
