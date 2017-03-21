<?php

namespace App\Providers;

use App\Http\ApiResponder;
use App\Models\Trip;
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
            if (! is_string($value)) { return false; }

			return preg_match('/^[\pL\s]+$/u', $value);
    	});

        Validator::extend('alpha_num_space', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            return preg_match('/^[\pL\pM\pN\s]+$/u', $value) > 0;
        });

        Validator::extend('latitude', function($attribute, $value) {
            return preg_match('/^(-)?(\d){1,2}(\.)(\d{5,8})$/', $value) > 0;
        });

        Validator::extend('longitude', function($attribute, $value) {
            return preg_match('/^(-)?(\d{1,3})(\.)(\d{5,8})$/', $value) > 0;
        });

        Validator::extend('weather', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$weatherConditions)) { return false; }
            }

            return true;
        });

        Validator::extend('traffic', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$trafficConditions)) { return false; }
            }

            return true;
        });

        Validator::extend('roads', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$roadConditions)) { return false; }
            }

            return true;

        });
    }
}
