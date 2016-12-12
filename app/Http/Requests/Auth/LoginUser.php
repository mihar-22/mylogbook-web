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
            'email' => 'required|email',
            'password' => 'required|min:6|string'
        ];
    }
}
