<?php

namespace App\Http;

use Illuminate\Http\Response;

class ApiResponder
{
    public function respondWithMessage($message)
    {
        return $this->respond($message);
    }

    public function respondWithData($message, $data)
    {
        return $this->respond($message, $data);
    }

    public function respondWithErrors($message, $errors)
    {
        return $this->respond($message, null, $errors);
    }

    private function respond($message = '', $data = null, $errors = null)
    {
        $response = array_filter([
            'message' => $message,
            'data' => $data,
            'errors' => $errors
        ]);

        return response($response);
    }
}