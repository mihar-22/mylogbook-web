<?php

namespace App\Providers;

use App\Models\Trip;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class ValidationServiceProvider extends ServiceProvider
{
	public function boot()
	{
        $this->addAlphaSpaceRule();
        $this->addAlphaNumSpaceRule();
        $this->addLatitudeRule();
        $this->addLongitudeRule();
        $this->addWeatherRule();
        $this->addTrafficRule();
        $this->addRoadsRule();
        $this->addLightRule();
	}

    private function addAlphaSpaceRule()
    {
        Validator::extend('alpha_space', function ($attribute, $value) {
            if (! is_string($value)) { return false; }

            return preg_match('/^[\pL\s]+$/u', $value);
        });
    }

    private function addAlphaNumSpaceRule()
    {
        Validator::extend('alpha_num_space', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            return preg_match('/^[\pL\pM\pN\s]+$/u', $value) > 0;
        });
    }

    private function addLatitudeRule()
    {
        Validator::extend('latitude', function($attribute, $value) {
            return preg_match('/^(-)?(\d){1,2}(\.)(\d{5,8})$/', $value) > 0;
        });
    }

    private function addLongitudeRule()
    {
        Validator::extend('longitude', function($attribute, $value) {
            return preg_match('/^(-)?(\d{1,3})(\.)(\d{5,8})$/', $value) > 0;
        }); 
    }

    private function addWeatherRule()
    {
        Validator::extend('weather', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$weatherConditions)) { return false; }
            }

            return true;
        });
    }

    private function addTrafficRule()
    {
        Validator::extend('traffic', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$trafficConditions)) { return false; }
            }

            return true;
        });
    }

    private function addRoadsRule()
    {
        Validator::extend('roads', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$roadConditions)) { return false; }
            }

            return true;
        });
    }

    private function addLightRule()
    {
        Validator::extend('light', function($attribute, $value) {
            if (! is_string($value)) { return false; }

            foreach (explode(',', $value) as $value) {
                if (! in_array($value, Trip::$lightConditions)) { return false; }
            }

            return true;
        });
    }
}
