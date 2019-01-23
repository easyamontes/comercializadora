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

//Rutas para el control de usuarios
Route::post('/api/register','UserController@register');
Route::post('/api/login','UserController@login');
Route::post('/api/show','UserController@verUser')->middleware('islogged');
Route::get('/api/lpersonal','ListaController@empleadosList')->middleware('islogged');

//Rutas para el control de acciones en puestos
Route::resource('/api/puestos','PuestoController');
Route::resource('/api/personal','PersonalController');
Route::resource('/api/oficinas','OficinaController');
Route::resource('/api/articulos','ArticuloController');