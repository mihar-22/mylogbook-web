<?php

namespace App\Providers;

use App\Http\ApiResponder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
	public function boot()
	{
		$this->extendValidator();
	}

    public function register()
    {
        $this->app->bind('api.response', ApiResponder::class);
    }

    private function extendValidator()
    {
    	Validator::extend('alpha_space', function ($attribute, $value) {
			return preg_match('/^[\pL\s]+$/u', $value);
    	});
    }
}
