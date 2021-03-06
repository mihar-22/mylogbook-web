<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\FormatResponse;
use Illuminate\Foundation\Http\FormRequest;

class RegisterUser extends FormRequest
{
    use FormatResponse;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'birthday' => "required|date_format:Y-m-d"
        ];
    }
}
