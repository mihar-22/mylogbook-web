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
            'regno' => 'string|alpha_num|max:6',
            'odo' => 'integer|max:999999'
        ];
    }
}
