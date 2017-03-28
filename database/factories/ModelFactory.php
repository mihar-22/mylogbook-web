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
        'birthday' => Carbon::parse('15 years ago')->toDateString(),
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
        'name' => $faker->word.' '.$faker->word,
        'registration' => $faker->bothify('???###'),
        'type' => $faker->randomElement(Car::$types)
    ];
});

$factory->define(Supervisor::class, function (Generator $faker) {
    return [
        'name' => $faker->firstName.' '.$faker->lastName,
        'gender' => $faker->randomElement(['M', 'F']),
        'is_accredited' => $faker->boolean($chanceOfGettingTrue = 30)
    ];
});

$factory->define(Trip::class, function (Generator $faker) {
    return [
        'started_at' => Carbon::now()->toDateTimeString(),
        'ended_at' => Carbon::now()->addHours(1)->toDateTimeString(),
        'odometer' => $faker->numberBetween(10000, 180000),
        'distance' => $faker->randomFloat(2, 5000, 15000),

        'weather' =>  implode(',', $faker->randomElements(Trip::$weatherConditions, $count = 2)),
        'traffic' =>  implode(',', $faker->randomElements(Trip::$trafficConditions, $count = 2)),
        'roads' =>  implode(',', $faker->randomElements(Trip::$roadConditions, $count = 2)),
        'light' =>  implode(',', $faker->randomElements(Trip::$lightConditions, $count = 2)),

        'start_latitude' => $faker->randomFloat(8, -37, -38),
        'start_longitude' => $faker->randomFloat(8, 144, 145),
        'end_latitude' => $faker->randomFloat(8, 38, 39),
        'end_longitude' => $faker->randomFloat(8, 144, 145),

        'start_location' => 'Dandenong',
        'end_location' => 'Narre Warren',
        'timezone' => 'Australia/Melbourne'
    ];
});