<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Supervisor\DeleteSupervisor;
use App\Http\Requests\Supervisor\StoreSupervisor;
use App\Http\Requests\Supervisor\UpdateSupervisor;
use App\Transformers\SupervisorTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupervisorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $supervisors = Auth::user()->supervisors;

        return ApiResponder::respondWithCollection($supervisors, new SupervisorTransformer)
                             ->setStatusCode(200);
    }

    public function store(StoreSupervisor $request)
    {
        $supervisor = Auth::user()->supervisors()->create($request->all());

        return ApiResponder::respondWithData('supervisor created', ['id' => $supervisor->id])
                             ->setStatusCode(201);
    }

    public function update(UpdateSupervisor $request, $id)
    {
        $supervisor = Auth::user()->supervisors()->find($id);

        $supervisor->update(array_filter($request->all()));

        return ApiResponder::respondWithMessage('supervisor updated')
                             ->setStatusCode(200);
    }

    public function destroy(DeleteSupervisor $request, $id)
    {
        $supervisor = Auth::user()->supervisors()->find($id);

        if ($supervisor->trips()->count() > 0) { $supervisor->delete(); }
        else { $supervisor->forceDelete(); }

        return ApiResponder::respondWithMessage('supervisor deleted')
                             ->setStatusCode(200);
    }
}
