<?php

namespace App\Http\Requests\Car;

use App\Http\Requests\FormatResponse;
use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateCar extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        $car = Car::find($this->route('car'));

        return $car && Auth::user()->can('update', $car);
    }

    public function rules()
    {
        return [
            'make' => 'string|max:50',
            'registration' => 'string|alpha_num|max:6',
            'type' => 'string|in:sedan,wagon,suv,4wd,hatchback,coupe,convertible,sports,ute,micro,van'
        ];
    }
}
