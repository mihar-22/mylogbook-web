<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Car\DeleteCar;
use App\Http\Requests\Car\StoreCar;
use App\Http\Requests\Car\UpdateCar;
use App\Transformers\CarTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $cars = $this->cars()->get();

        return ApiResponder::respondWithCollection($cars, new CarTransformer)
                             ->setStatusCode(200);
    }

    public function store(StoreCar $request)
    {
        $car = Auth::user()->cars()->create($request->all());

        return ApiResponder::respondWithData('car created', ['id' => $car->id])
                             ->setStatusCode(201);
    }

    public function update(UpdateCar $request, $id)
    {
        $car = Auth::user()->cars()->find($id);

        $car->update(array_filter($request->all()));

        return ApiResponder::respondWithMessage('car updated')
                             ->setStatusCode(200);
    }

    public function destroy(DeleteCar $request, $id)
    {
        $car = Auth::user()->cars()->find($id);

        $car->delete();
        
        return ApiResponder::respondWithMessage('car deleted')
                             ->setStatusCode(200);
    }

    public function transactions($since)
    {
        $cars = $this->cars()->where('updated_at', '>', $since)->get();

        return ApiResponder::respondWithCollection($cars, new CarTransformer)
                             ->setStatusCode(200);
    }

    private function cars()
    {
        return Auth::user()->cars()->withTrashed();        
    }
}
