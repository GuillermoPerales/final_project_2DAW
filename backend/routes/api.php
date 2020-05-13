<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::group([
        'middleware' => 'auth:api'
      ], function() {
          Route::get('logout', 'Auth\AuthController@logout');
          Route::get('user', 'Auth\AuthController@user');
      });   
});

Route::get('resellers/{reseller}', 'User\UserController@resellers');
Route::resource('users', 'User\UserController',['except'=>['create','edit']]);
Route::resource('users.permissions', 'User\UserPermissionController',['only'=>['index','update','destroy']]);
Route::resource('users.licenses', 'User\UserLicenseController',['except'=>['show','create','edit']]);
Route::resource('users.roles', 'User\UserRoleController',['only'=>['index','update']]);

Route::resource('licenses', 'License\LicenseController',['only'=>['index','show']]);

Route::resource('permissions', 'Permission\PermissionController',['except'=>['create','edit']]);

Route::resource('products', 'Product\ProductController',['only'=>['index','show']]);
Route::resource('products.licenses', 'Product\ProductLicenseController',['only'=>['index']]);

Route::resource('roles', 'Role\RoleController',['only'=>['index','show']]);
Route::resource('roles.permissions', 'Role\RolePermissionController',['only'=>['index']]);
