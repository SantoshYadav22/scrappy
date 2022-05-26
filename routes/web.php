<?php

use Illuminate\Support\Facades\Route;

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
    return view('auth.login');
});

Auth::routes();

Route::post('/attempt-login', [App\Http\Controllers\Auth\LoginController::class, "attemptLogin"]);

Route::get('/reset-otp', function () {
    return view('auth.reset_otp');
});
Route::post('/reset_otp', [App\Http\Controllers\Auth\LoginController::class, "reset_otp"]);
Route::post('/submit-data', [App\Http\Controllers\Auth\LoginController::class, "submit_reset_otp"]);



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
