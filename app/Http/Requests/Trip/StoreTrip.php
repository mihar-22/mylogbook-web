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
            'start' => 'required|date_format:Y/m/d H:i:s|after:today',
            'end' => 'required|date_format:Y/m/d H:i:s|after:start',
            'odometer' => 'required|integer|max:999999',
            'distance' => 'required|regex:/^(\d{2,6})(\.)(\d{2})$/',

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
            'gravel' => 'boolean',

            // Resources
            'car_id' => 'required|integer',
            'supervisor_id' => 'required|integer'
        ];  
    }
}
