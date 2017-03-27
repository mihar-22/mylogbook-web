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
            'name' => 'required|string|max:100',
            'gender' => 'required|string|in:M,F',
            'is_accredited' => 'required|boolean'
        ];
    }
}
