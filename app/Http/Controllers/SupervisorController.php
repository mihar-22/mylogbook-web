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
        $supervisor = $request->only(
            'first_name', 'last_name', 'gender', 'avatar'
        );

        Auth::user()->supervisors()->create($supervisor);

        return ApiResponder::respondWithMessage('supervisor created')
                             ->setStatusCode(201);
    }

    public function update(UpdateSupervisor $request, $id)
    {
        $update = $request->only('first_name', 'last_name', 'gender', 'avatar');

        $supervisor = Auth::user()->supervisors()->find($id);

        $supervisor->update(array_filter($update));

        return ApiResponder::respondWithMessage('supervisor updated')
                             ->setStatusCode(200);
    }

    public function destroy(DeleteSupervisor $request, $id)
    {
        $supervisor = Auth::user()->supervisors()->find($id);

        $supervisor->delete();

        return ApiResponder::respondWithMessage('supervisor deleted')
                             ->setStatusCode(200);
    }
}
