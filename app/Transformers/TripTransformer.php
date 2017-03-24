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
            'conditions' => [
                'weather' => $trip->weather,
                'traffic' => $trip->traffic,
                'roads' => $trip->roads,
                'light' => $trip->light
            ],
            'coordinates' => [
                'start_latitude' => (double) $trip->start_latitude,
                'start_longitude' => (double) $trip->start_longitude,
                'end_latitude' => (double) $trip->end_latitude,
                'end_longitude' => (double) $trip->end_longitude
            ],
            'location' => [
                'start' => $trip->start_location,
                'end' => $trip->end_location,
                'timezone' => $trip->timezone
            ],
            'resources' => [
                'car_id' => (int) $trip->car_id,
                'supervisor_id' => (int) $trip->supervisor_id
            ]
        ];
    }
}