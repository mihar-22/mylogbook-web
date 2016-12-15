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
            'registration' => $car->registration,
            'year' => $car->year,
            'make' => $car->make,
            'model' => $car->model,
            'type' => $car->type,
            'transmission' => $car->transmission,
            'odometer' => (int) $car->odometer
        ];
    }
}