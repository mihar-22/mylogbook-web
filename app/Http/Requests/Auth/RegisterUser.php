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
            'name' => 'required|string|alpha_space|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|string'
        ];
    }
}
