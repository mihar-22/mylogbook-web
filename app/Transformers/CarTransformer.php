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
            'name' => $car->name,
            'registration' => $car->registration,
            'type' => $car->type
        ];
    }
}