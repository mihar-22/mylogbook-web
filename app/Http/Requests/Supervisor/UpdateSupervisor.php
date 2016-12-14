<?php

namespace App\Http\Requests\Supervisor;

use App\Http\Requests\FormatResponse;
use App\Models\Supervisor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSupervisor extends FormRequest
{
	use FormatResponse;
	
    public function authorize()
    {
        $supervisor = Supervisor::find($this->route('supervisor'));

        return $supervisor && Auth::user()->can('update', $supervisor);
    }

    public function rules()
    {
        return [
            'first_name' => 'string|alpha|max:50',
            'last_name' => 'string|alpha|max:50',
            'gender' => 'max:1|in:M,F',
            'avatar' => 'integer|min:1|max:6'
        ];
    }
}
