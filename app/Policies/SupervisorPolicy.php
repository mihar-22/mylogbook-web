<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Supervisor;
use Illuminate\Auth\Access\HandlesAuthorization;

class SupervisorPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Supervisor $supervisor)
    {
        return $user->id == $supervisor->user_id;
    }

    public function delete(User $user, Supervisor $supervisor)
    {
        return $user->id == $supervisor->user_id;
    }
}
