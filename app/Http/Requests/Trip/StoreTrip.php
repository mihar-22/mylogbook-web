<?php

namespace App\Http\Requests\Trip;

use App\Http\Requests\FormatResponse;
use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTrip extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {   
        $car = Car::find($this->request->get('car_id'));

        $supervisor = Supervisor::find($this->request->get('supervisor_id'));

        return $car &&
               $supervisor &&
               policy(Trip::class)->create(Auth::user(), $car, $supervisor);
    }

    public function rules()
    {
        return [
            'started_at' => 'required|date_format:Y-m-d H:i:s|after:today',
            'ended_at' => 'required|date_format:Y-m-d H:i:s|after:started_at',
            'odometer' => 'required|integer|max:999999',
            'distance' => 'required|regex:/^(\d{1,6})(\.)(\d{1,2})$/',
            'car_id' => 'required|integer',
            'supervisor_id' => 'required|integer',
            
            'weather.clear' => 'boolean',
            'weather.rain' => 'boolean',
            'weather.thunder' => 'boolean',

            'traffic.light' => 'boolean',
            'traffic.moderate' => 'boolean',
            'traffic.heavy' => 'boolean',

            'roads.local_street' => 'boolean',
            'roads.main_road' => 'boolean',
            'roads.inner_city' => 'boolean',
            'roads.freeway' => 'boolean',
            'roads.rural_highway' => 'boolean',
            'roads.gravel' => 'boolean'
        ];  
    }
}
