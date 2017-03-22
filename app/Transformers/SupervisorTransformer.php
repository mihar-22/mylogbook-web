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
            'gender' => $supervisor->gender,
            'is_accredited' => (bool) $supervisor->is_accredited,
            'created_at' => (string) $supervisor->created_at,
            'updated_at' => (string) $supervisor->updated_at,
            'deleted_at' => $supervisor->deleted_at ? (string) $supervisor->deleted_at : null
        ];
    }
}