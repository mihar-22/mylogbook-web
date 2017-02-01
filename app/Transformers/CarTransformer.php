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
            'deleted_at' => $car->deleted_at
        ];
    }
}