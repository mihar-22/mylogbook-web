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

Route::get('email/verify/{email}/{token}', 'AuthController@verifyEmail');

Route::get('password/reset/{email}/{token}', 'PasswordController@showResetForm');

Route::get('contact-us', 'ContactController@showContactUsForm');

// Legal

Route::group(['prefix' => 'legal'], function() {
	Route::get('privacy-policy', function() {
		return view('legal.privacy');
	});

	Route::get('terms-of-service', function() {
		return view('legal.terms');
	});
});
