<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Car;
use Illuminate\Auth\Access\HandlesAuthorization;

class CarPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Car $car)
    {
        return $user->id == $car->user_id;
    }

    public function delete(User $user, Car $car)
    {
        return $user->id == $car->user_id;
    }
}
