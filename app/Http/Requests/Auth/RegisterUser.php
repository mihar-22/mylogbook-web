<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\FormatResponse;
use Carbon\Carbon;
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
        $birthdayAfter = Carbon::parse('80 years ago')->subDays(1)->toDateString();
        
        $birthdayBefore = Carbon::parse('15 years ago')->addDays(1)->toDateString();

        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|string',
            'birthday' => "required|date_format:Y-m-d|after:{$birthdayAfter}|before:{$birthdayBefore}"
        ];
    }
}
