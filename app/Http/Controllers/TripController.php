<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Trip\StoreTrip;
use Illuminate\Support\Facades\Auth;

class TripController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(StoreTrip $request)
    {
        $trip = $request->only(
            'start',
            'end',
            'odometer',     
            'distance',

            // Weather
            'clear',
            'rain',
            'thunder',

            // Traffic
            'light',
            'moderate',
            'heavy',

            // Roads
            'local_street',
            'main_road',
            'inner_city',
            'freeway',
            'rural_highway',
            'gravel',

            // Resources
            'car_id',
            'supervisor_id'
        );

        Auth::user()->trips()->create($trip);

        return ApiResponder::respondWithMessage('trip created')
                             ->setStatusCode(201);
    }
}
