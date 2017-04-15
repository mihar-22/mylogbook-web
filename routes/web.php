<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('email/verify/{email}/{token}', 'AuthController@verifyEmail');

Route::group(['prefix' => 'password'], function () {
    Route::get('reset/{email}/{token}', 'PasswordController@showResetForm');

    Route::post('reset', 'PasswordController@resetPassword');
});

Route::group(['prefix' => 'legal'], function() {
	Route::get('privacy-policy', function() {
		return view('legal.privacy');
	});

	Route::get('terms-of-service', function() {
		return view('legal.terms');
	});
});