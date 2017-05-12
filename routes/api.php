<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {

	// Auth

	Route::group(['prefix' => 'auth'], function () {
		Route::post('register', 'AuthController@register');

		Route::post('login', 'AuthController@login');

		Route::get('logout', 'AuthController@logout');

		Route::get('check', 'AuthController@check');

        Route::post('verify', 'AuthController@verify');

		Route::post('forgot', 'PasswordController@sendResetLink');

        Route::post('reset', 'PasswordController@resetPassword');
	});

    // Contact
    Route::post('contact', 'ContactController@sendMessage');

	// Cars

	Route::resource('cars', 'CarController', ['except' => [
		'create', 'edit', 'show'
	]]);

	Route::get('cars/{since}', 'CarController@transactions');

	// Supervisors

	Route::resource('supervisors', 'SupervisorController', ['except' => [
		'create', 'edit', 'show'
	]]);

	Route::get('supervisors/{since}', 'SupervisorController@transactions');

	// Trips

	Route::resource('trips', 'TripController', ['only' => [
		'index', 'store'
	]]);

	Route::get('trips/{since}', 'TripController@transactions');
});
