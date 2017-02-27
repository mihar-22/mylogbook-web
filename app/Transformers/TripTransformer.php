<?php

namespace App\Transformers;

use App\Models\Trip;
use League\Fractal\TransformerAbstract;

class TripTransformer extends TransformerAbstract
{
    public function transform(Trip $trip)
    {
        return [
            'id' => (int) $trip->id,
            'started_at' => (string) $trip->started_at,
            'ended_at'  =>  (string) $trip->ended_at,
            'odometer' => (int) $trip->odometer,     
            'distance' => (double) $trip->distance,
            'car_id' => (int) $trip->car_id,
            'supervisor_id' => (int) $trip->supervisor_id,
            'weather' => [
                'clear' => (boolean) $trip->clear,
                'rain' => (boolean) $trip->rain,
                'thunder' => (boolean) $trip->thunder
            ],
            'traffic' => [
                'light' => (boolean) $trip->light,
                'moderate' => (boolean) $trip->moderate,
                'heavy' => (boolean) $trip->heavy
            ],
            'roads' => [
                'local_street' => (boolean) $trip->local_street,
                'main_road' => (boolean) $trip->main_road,
                'inner_city' => (boolean) $trip->inner_city,
                'freeway' => (boolean) $trip->freeway,
                'rural_highway' => (boolean) $trip->rural_highway,
                'gravel' => (boolean) $trip->gravel
            ],
            'location' => [
                'latitude' => (double) $trip->latitude,
                'longitude' => (double) $trip->longitude,
            ]
        ];
    }
}