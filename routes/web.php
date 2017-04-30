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

// Home

Route::get('/', function () {
    return view('landing');
});

// Email

Route::get('email/verify/{email}/{token}', 'AuthController@verifyEmail');

// Password

Route::group(['prefix' => 'password'], function () {
    Route::get('reset/{email}/{token}', 'PasswordController@showResetForm');

    Route::post('reset', 'PasswordController@resetPassword');
});

// Contact Us

Route::get('contact-us', 'ContactController@showContactUsForm');

Route::post('contact-us', 'ContactController@sendMessage');

// Legal

Route::group(['prefix' => 'legal'], function() {
	Route::get('privacy-policy', function() {
		return view('legal.privacy');
	});

	Route::get('terms-of-service', function() {
		return view('legal.terms');
	});
});