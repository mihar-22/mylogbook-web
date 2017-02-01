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
        $trips = Auth::user()->trips()->with([
        'car' => function ($query) {
            $query->select('id');
        }, 
        'supervisor' => function ($query) {
            $query->select('id');
        }])->get();

        return ApiResponder::respondWithCollection($trips, new TripTransformer)
                             ->setStatusCode(200);
    }

    public function store(StoreTrip $request)
    {
        Auth::user()->trips()->create(Trip::flatten($request->all()));

        return ApiResponder::respondWithMessage('trip created')
                             ->setStatusCode(201);
    }
}
