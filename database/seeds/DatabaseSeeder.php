<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        factory(User::class)->create(['email' => 'dev@mlb.com', 'is_verified' => 1]);

        factory(Car::class, 3)->create(['user_id' => 1]);

        factory(Supervisor::class, 3)->create(['user_id' => 1]);

        for ($t = 0; $t < 10; $t++) {
	        factory(Trip::class)->create([
	        	'user_id' => 1, 
	        	'car_id' => rand(1, 3), 
	        	'supervisor_id' => rand(1, 3)
	        ]);
        }
    }
}
