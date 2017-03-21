<?php

namespace App\Providers;

use App\Database\MySqlConnection;
use App\Database\SQLiteConnection;
use Illuminate\Support\ServiceProvider;

class DatabaseServiceProvider extends ServiceProvider
{
    
    public function register()
    {
        $this->app->bind('db.connection.mysql', MySqlConnection::class);
        
        $this->app->bind('db.connection.sqlite', SQLiteConnection::class);
    }
}