<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\FormatResponse;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class VerifyEmail extends FormRequest
{
    use FormatResponse;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|string|email|exists:users,email',
            'token' => 'required|string'
        ];
    }
}
