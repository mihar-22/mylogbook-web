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
            'weather' => $trip->weather,
            'traffic' => $trip->traffic,
            'roads' => $trip->roads,
            'light' => $trip->light,
            'start_latitude' => (double) $trip->start_latitude,
            'start_longitude' => (double) $trip->start_longitude,
            'end_latitude' => (double) $trip->end_latitude,
            'end_longitude' => (double) $trip->end_longitude,
            'timezone' => (string) $trip->timezone
        ];
    }
}