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
            'odometer' => 'required|integer|min:0|max:999999',
            'distance' => 'required|regex:/^(\d{1,11})(\.)(\d{1,2})$/',

            'weather' => 'required|weather',
            'traffic' => 'required|traffic',
            'roads' => 'required|roads',
            'light' => 'required|light',
            
            'start_latitude' => 'required|latitude',
            'start_longitude' => 'required|longitude',
            'end_latitude' => 'required|latitude',
            'end_longitude' => 'required|longitude',

            'start_location' => 'required|string|max:50',
            'end_location' => 'required|string|max:50',
            'timezone' => 'required|string|max:100',

            'car_id' => 'required|integer',
            'supervisor_id' => 'required|integer'
        ];  
    }
}
