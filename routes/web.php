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
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Loin Controller
Route::post('/attempt-login', [App\Http\Controllers\Auth\LoginController::class, "attemptLogin"]);
Route::get('/reset-otp', function () { return view('auth.reset_otp'); });
Route::post('/reset_otp', [App\Http\Controllers\Auth\LoginController::class, "reset_otp"]);
Route::post('/submit-data', [App\Http\Controllers\Auth\LoginController::class, "submit_reset_otp"]);
//End Login Controller

//Admin Controller
Route::get('/school', [App\Http\Controllers\Admin\SchoolController::class, "index"])->name('school');
Route::get('/school/add', [App\Http\Controllers\Admin\SchoolController::class, 'add'])->name('school.add');
Route::post('/school/submit', [App\Http\Controllers\Admin\SchoolController::class, 'submit'])->name('school.submit');
Route::get('/school/list', [App\Http\Controllers\Admin\SchoolController::class, 'list'])->name('school.list');
Route::post('/school/details', [App\Http\Controllers\Admin\SchoolController::class, 'details'])->name('school.details');
Route::get('/school/edit', [App\Http\Controllers\Admin\SchoolController::class, 'edit'])->name('school.edit');
Route::post('/school/single-data', [App\Http\Controllers\Admin\schoolController::class, 'get_single_data'])->name('school.single-data');
Route::post('/school/change-status', [App\Http\Controllers\Admin\SchoolController::class, 'change_status'])->name('school.change-status');

Route::get('/product', [App\Http\Controllers\Admin\ProductController::class, "index"])->name('product');
Route::get('/product/add', [App\Http\Controllers\Admin\ProductController::class, 'add'])->name('product.add');
Route::post('/product/submit', [App\Http\Controllers\Admin\ProductController::class, 'submit'])->name('product.submit');
Route::get('/product/list', [App\Http\Controllers\Admin\ProductController::class, 'list'])->name('product.list');
Route::post('/product/details', [App\Http\Controllers\Admin\ProductController::class, 'details'])->name('product.details');
Route::get('/product/edit', [App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('product.edit');
Route::post('/product/single-data', [App\Http\Controllers\Admin\ProductController::class, 'get_single_data'])->name('product.single-data');
Route::post('/product/change-status', [App\Http\Controllers\Admin\ProductController::class, 'change_status'])->name('product.change-status');

Route::get('/challenge', [App\Http\Controllers\Admin\ChallengeController::class, "index"])->name('challenge');
Route::get('/challenge/add', [App\Http\Controllers\Admin\ChallengeController::class, "add"])->name('challenge.add');;
Route::post('/challenge/submit', [App\Http\Controllers\Admin\ChallengeController::class, 'submit'])->name('challenge.submit');
Route::get('/challenge/list', [App\Http\Controllers\Admin\ChallengeController::class, 'list'])->name('challenge.list');
Route::post('/challenge/details', [App\Http\Controllers\Admin\ChallengeController::class, 'details'])->name('challenge.details');
Route::get('/challenge/edit', [App\Http\Controllers\Admin\ChallengeController::class, 'edit'])->name('challenge.edit');
Route::post('/challenge/single-data', [App\Http\Controllers\Admin\ChallengeController::class, 'get_single_data'])->name('challenge.single-data');

Route::get('/category', [App\Http\Controllers\Admin\CategoryController::class, "index"])->name('category');
Route::get('/category/add', [App\Http\Controllers\Admin\CategoryController::class, "add"])->name('category.add');;
Route::post('/category/submit', [App\Http\Controllers\Admin\CategoryController::class, 'submit'])->name('category.submit');
Route::get('/category/list', [App\Http\Controllers\Admin\CategoryController::class, 'list'])->name('category.list');
Route::post('/category/details', [App\Http\Controllers\Admin\CategoryController::class, 'details'])->name('category.details');
Route::get('/category/edit', [App\Http\Controllers\Admin\CategoryController::class, 'edit'])->name('category.edit');
Route::post('/category/single-data', [App\Http\Controllers\Admin\CategoryController::class, 'get_single_data'])->name('category.single-data');
Route::post('/category/change-status', [App\Http\Controllers\Admin\CategoryController::class, 'change_status'])->name('category.change-status');

//End Admin Controller
