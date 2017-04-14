<?php

namespace App\Providers;

use App\Database\MySqlConnection;
use App\Database\SQLiteConnection;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class DatabaseServiceProvider extends ServiceProvider
{
	public function boot()
	{
		Schema::defaultStringLength(191);
	}
    
    public function register()
    {
    	Connection::resolverFor('mysql', function ($connection, $database, $prefix, $config) {
    		return new MySqlConnection($connection, $database, $prefix, $config);
    	});

		Connection::resolverFor('sqlite', function ($connection, $database, $prefix, $config) {
			return new SQLiteConnection($connection, $database, $prefix, $config);
    	});
    }
}