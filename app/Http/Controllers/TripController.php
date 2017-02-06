<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Trip\StoreTrip;
use App\Models\Trip;
use App\Transformers\TripTransformer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $trips = $this->trips()->get();

        return ApiResponder::respondWithCollection($trips, new TripTransformer)
                             ->setStatusCode(200);
    }

    public function store(StoreTrip $request)
    {
        Auth::user()->trips()->create(Trip::flatten($request->all()));

        return ApiResponder::respondWithMessage('trip created')
                             ->setStatusCode(201);
    }

    public function transactions($since)
    {
        $trips = $this->trips()->where('started_at', '>', $since)->get();

        if ($trips->isEmpty()) {
            return ApiResponder::respondWithNoContent()
                                 ->setStatusCode(304);
        }

        return ApiResponder::respondWithCollection($trips, new TripTransformer)
                             ->setStatusCode(200);
    }

    private function trips()
    {
        return Auth::user()->trips()->with([
            'car' => function ($query) {
                $query->select('id');
            },

            'supervisor' => function ($query) {
                $query->select('id');
            }
        ]);        
    }
}
