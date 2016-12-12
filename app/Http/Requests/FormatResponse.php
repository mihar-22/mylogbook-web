<?php

namespace App\Http\Requests;

use App\Facades\ApiResponder;
use Illuminate\Contracts\Validation\Validator;

trait FormatResponse {
    public function response(array $errors)
    {
        if ($this->expectsJson()) {
        	return ApiResponder::respondWithErrors('validation failed', $errors)
        						->setStatusCode(422);
        }

        return $this->redirector->to($this->getRedirectUrl())
                                          ->withInput($this->except($this->dontFlash))
                                          ->withErrors($errors, $this->errorBag);
    }

    public function formatErrors(Validator $validator)
    {

    	return array_map('reset', $validator->errors()->toArray());
    }

    public function forbiddenResponse()
    {
        return ApiResponder::respondWithMessage('unauthorized')
                            ->setStatusCode(403);
    }
}