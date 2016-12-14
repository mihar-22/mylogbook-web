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
            'regno' => 'required|string|alpha_num|max:6',
            'year' => 'required|string|digits:4',
            'make' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'type' => 'required|string|max:50',
            'trans' => 'required|max:1|in:A,M',
            'odo' => 'required|integer|max:999999'
        ];
    }
}
