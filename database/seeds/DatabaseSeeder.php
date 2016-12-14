<?php

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $user = factory(User::class)->create(['email' => 'dev@mlb.com', 'is_verified' => 1]);

        factory(Car::class, 3)->create(['user_id' => $user->id]);
    }
}
