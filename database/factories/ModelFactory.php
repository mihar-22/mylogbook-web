<?php

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
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => 'secret'
    ];
});
