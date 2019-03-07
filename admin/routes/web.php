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
    return \Hyn\Tenancy\Facades\TenancyFacade::website();
});


Route::get('/all', function() {
    return \App\TenantModels\Task::get();
});

Route::get('/create/{task}', function ($task) {
    return \App\TenantModels\Task::create(['body' => $task]);
});

