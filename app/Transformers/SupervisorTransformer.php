<?php

namespace App\Transformers;

use App\Models\Supervisor;
use League\Fractal\TransformerAbstract;

class SupervisorTransformer extends TransformerAbstract
{
    public function transform(Supervisor $supervisor)
    {
        return [
            'id' => (int) $supervisor->id,
            'first_name' => $supervisor->first_name,
            'last_name' => $supervisor->last_name,
            'license' => $supervisor->license,
            'gender' => $supervisor->gender
        ];
    }
}