<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\FormatResponse;
use Illuminate\Foundation\Http\FormRequest;

class LoginUser extends FormRequest
{
    use FormatResponse;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ];
    }
}
