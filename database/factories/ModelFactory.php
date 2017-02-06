<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Carbon\Carbon;
use Faker\Generator;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/**
 * Eloquent mutator on User Model hashes password.
 */
$factory->define(User::class, function (Generator $faker) {	
    return [
        'name' => "{$faker->firstName} {$faker->lastName}",
        'email' => $faker->unique()->safeEmail,
        'password' => 'secret',
        'api_token' => 'secretToken',
        'is_verified' => 1
    ];
});

$factory->state(User::class, 'not verified', function ($faker) {
    return [
        'is_verified' => 0
    ];
});

$factory->define(Car::class, function (Generator $faker) {
    return [
        'make' => $faker->word,
        'model' => $faker->word,
        'registration' => $faker->bothify('???###'),
        'type' => $faker->randomElement([
            'sedan',
            'wagon',
            'suv',
            '4wd',
            'hatchback',
            'coupe',
            'convertible',
            'sports',
            'ute',
            'micro',
            'van'
        ])
    ];
});

$factory->define(Supervisor::class, function (Generator $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'license' => $faker->bothify('###??####'),
        'gender' => $faker->randomElement(['male', 'female'])
    ];
});

$factory->define(Trip::class, function (Generator $faker) {
    return [
        'started_at' => Carbon::now()->toDateTimeString(),
        'ended_at' => Carbon::now()->addHours(1)->toDateTimeString(),
        'odometer' => $faker->numberBetween(10000, 180000),
        'distance' => $faker->randomFloat(2, 3, 30),
        
        // Weather
        'clear' => $faker->boolean,
        'rain' => $faker->boolean,
        'thunder'=> $faker->boolean,

        // Traffic
        'light'=> $faker->boolean,
        'moderate'=> $faker->boolean,
        'heavy'=> $faker->boolean,

        // Roads
        'local_street'=> $faker->boolean,
        'main_road'=> $faker->boolean,
        'inner_city'=> $faker->boolean,
        'freeway'=> $faker->boolean,
        'rural_highway'=> $faker->boolean,
        'gravel' => $faker->boolean
    ];
});