<?php

namespace App\Providers;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Policies\CarPolicy;
use App\Policies\SupervisorPolicy;
use App\Policies\TripPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Car::class => CarPolicy::class,
        Supervisor::class => SupervisorPolicy::class,
        Trip::class => TripPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
