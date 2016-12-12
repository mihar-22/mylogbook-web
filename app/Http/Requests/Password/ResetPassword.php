<?php

namespace App\Http\Requests\Password;

use App\Http\Requests\FormatResponse;
use Illuminate\Foundation\Http\FormRequest;

class ResetPassword extends FormRequest
{
    use FormatResponse;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|min:6|string',
        ];
    }
}
