<?php

namespace App\Http\Requests\Supervisor;

use App\Http\Requests\FormatResponse;
use App\Models\Supervisor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreSupervisor extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        return Auth::user()->can('create', Supervisor::class);
    }

    public function rules()
    {
        return [
            'first_name' => 'required|string|alpha|max:50',
            'last_name' => 'required|string|alpha|max:50',
            'license' => 'required|string|alpha_num|max:10',
            'gender' => 'required|max:1|in:M,F',
            'avatar' => 'required|integer|min:1|max:6'
        ];
    }
}
