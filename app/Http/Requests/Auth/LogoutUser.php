<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\FormatResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class LogoutUser extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [];
    }

    public function failedAuthorization()
    {
        throw new AuthenticationException($this->forbiddenResponse());
    }
}
