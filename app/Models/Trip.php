<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
	public $timestamps = false;

    protected $table = 'trips';

    protected $casts = [
        // Weather
        'clear' => 'boolean',
        'rain' => 'boolean',
        'thunder' => 'boolean',

        // Traffic
        'light' => 'boolean',
        'moderate' => 'boolean',
        'heavy' => 'boolean',

        // Roads
        'local_street' => 'boolean',
        'main_road' => 'boolean',
        'inner_city' => 'boolean',
        'freeway' => 'boolean',
        'rural_highway' => 'boolean',
        'gravel' => 'boolean'
    ];

    protected $fillable = [
    	'start',
    	'end',
    	'odometer',    	
    	'distance',

    	// Weather
    	'clear',
    	'rain',
    	'thunder',

    	// Traffic
    	'light',
    	'moderate',
    	'heavy',

    	// Roads
    	'local_street',
    	'main_road',
    	'inner_city',
    	'freeway',
    	'rural_highway',
    	'gravel',

        // Resources
        'car_id',
        'supervisor_id'
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

    static public function flatten(array $trip) {
        $flat = array();

        foreach ($trip as $key => $value) {
            if (is_array($value)) { $flat = array_merge($flat, $value); }
            else { $flat[$key] = $value; }
        }

        return $flat;
    }
}
