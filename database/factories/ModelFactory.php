<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
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
        'name' => $faker->firstName,
        'email' => $faker->unique()->safeEmail,
        'password' => 'secret',
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
        'name' => $faker->company,
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
            'micro'
        ])
    ];
});

$factory->define(Supervisor::class, function (Generator $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'gender' => $faker->randomElement(['M', 'F']),
        'avatar' => $faker->randomNumber(1)
    ];
});

$factory->define(Trip::class, function (Generator $faker) {
    return [
        'start' => $faker->dateTime,
        'end' => $faker->dateTime,
        'odometer' => $faker->numberBetween(10000, 180000),
        'distance' => $faker->randomFloat(2, 5, 30),

        // Light
        'day' => $faker->boolean,
        'afternoon' => $faker->boolean,
        'night' => $faker->boolean,

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