<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ApiResponder extends Facade
{
    protected static function getFacadeAccessor() {
        return 'api.response';
    }
}