<?php

namespace App\Providers;

use App\Http\ApiResponder;
use Illuminate\Support\ServiceProvider;
use Laravel\Dusk\DuskServiceProvider;

class AppServiceProvider extends ServiceProvider
{
	public function boot()
	{
        //
	}

    public function register()
    {
        $this->app->bind('api.response', ApiResponder::class);

        if ($this->app->environment('local', 'testing')) {
            $this->app->register(DuskServiceProvider::class);
        }
    }
}
