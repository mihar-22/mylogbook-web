<?php

namespace App\Providers;

use App\Http\ApiResponder;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
	public function boot()
	{
		//
	}

    public function register()
    {
        $this->app->bind('api.response', ApiResponder::class);
    }
}
