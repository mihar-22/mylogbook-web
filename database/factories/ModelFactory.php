<?php

use App\Models\Car;
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
        'regno' => $faker->bothify('???###'),
        'year' => $faker->date('Y'),
        'make' => $faker->company,
        'model' => $faker->word,
        'type' => $faker->word,
        'trans' => $faker->randomElement(['A', 'M']),
        'odo' => $faker->numberBetween(10000, 180000)
    ];
});
