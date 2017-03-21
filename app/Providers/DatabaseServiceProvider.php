<?php

namespace App\Providers;

use App\Database\MySqlConnection;
use Illuminate\Support\ServiceProvider;

class DatabaseServiceProvider extends ServiceProvider
{
    
    public function register()
    {
        $this->app->bind('db.connection.mysql', MySqlConnection::class);
    }

}