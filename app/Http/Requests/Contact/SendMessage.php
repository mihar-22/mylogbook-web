<?php

namespace App\Http\Requests\Contact;

use App\Http\Requests\FormatResponse;
use Illuminate\Foundation\Http\FormRequest;

class SendMessage extends FormRequest
{
    use FormatResponse;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'email' => 'required|string|email',
            'topic' => 'required|string|in:Help,Feedback,Bug',
            'message' => 'required|string|max:500'
        ];
    }
}
