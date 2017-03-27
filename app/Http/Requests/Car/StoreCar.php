<?php

namespace App\Http\Requests\Car;

use App\Http\Requests\FormatResponse;
use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCar extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        return Auth::user()->can('create', Car::class);
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'registration' => 'required|string|alpha_num|max:6',
            'type' => 'required|string|in:sedan,wagon,suv,4wd,hatchback,coupe,convertible,sports,ute,micro,van'
        ];
    }
}
