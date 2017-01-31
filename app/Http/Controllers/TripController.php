<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Trip\StoreTrip;
use App\Models\Trip;
use App\Transformers\TripTransformer;
use Illuminate\Support\Facades\Auth;

class TripController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $trips = Auth::user()->trips;

        return ApiResponder::respondWithCollection($trips, new TripTransformer)
                             ->setStatusCode(200);
    }

    public function store(StoreTrip $request)
    {
        $store = $request->only(
            'start',
            'end',
            'odometer',     
            'distance',
            'car_id',
            'supervisor_id',
            'weather',
            'traffic',
            'roads'
        );

        Auth::user()->trips()->create(Trip::flatten($store));

        return ApiResponder::respondWithMessage('trip created')
                             ->setStatusCode(201);
    }
}
