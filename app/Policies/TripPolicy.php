<?php

namespace App\Policies;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TripPolicy
{
    use HandlesAuthorization;

    public function create(User $user, Car $car, Supervisor $supervisor)
    {
		return $user->can('update', $car) && $user->can('update', $supervisor);
    }
}
