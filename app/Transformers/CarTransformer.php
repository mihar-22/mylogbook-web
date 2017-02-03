<?php

namespace App\Transformers;

use App\Models\Car;
use League\Fractal\TransformerAbstract;

class CarTransformer extends TransformerAbstract
{
    public function transform(Car $car)
    {
        return [
            'id' => (int) $car->id,
            'make' => $car->make,
            'model' => $car->model,
            'registration' => $car->registration,
            'type' => $car->type,
            'created_at' => (string) $car->created_at,
            'updated_at' => (string) $car->updated_at,
            'deleted_at' => $car->deleted_at ? (string) $car->deleted_at : null
        ];
    }
}