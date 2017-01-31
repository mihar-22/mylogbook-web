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
	Route::group(['prefix' => 'auth'], function () {
		Route::post('register', 'AuthController@register');
		
		Route::post('login', 'AuthController@login');
		
		Route::get('logout', 'AuthController@logout');

		Route::post('forgot', 'PasswordController@sendResetLink');
	});

	Route::resource('cars', 'CarController', ['except' => [
		'create', 'edit', 'show'
	]]);

	Route::resource('supervisors', 'SupervisorController', ['except' => [
		'create', 'edit', 'show'
	]]);

	Route::resource('trips', 'TripController', ['only' => [
		'index', 'store'
	]]);
});
