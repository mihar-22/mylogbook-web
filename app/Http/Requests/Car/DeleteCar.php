<?php

namespace App\Http\Requests\Car;

use App\Http\Requests\FormatResponse;
use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteCar extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        $car = Car::find($this->route('car'));

        return $car && Auth::user()->can('delete', $car);
    }

    public function rules()
    {
        return [];
    }
}
