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
            'reg' => $car->regno,
            'year' => $car->year,
            'make' => $car->make,
            'model' => $car->model,
            'type' => $car->type,
            'transmission' => $car->trans,
            'odometer' => (int) $car->odo
        ];
    }
}