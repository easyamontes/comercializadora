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
//Llamadas a las listas
Route::get('/api/lpersonal','ListaController@empleadosList')->middleware('islogged');
Route::get('/api/lpuesto','ListaController@puestosList')->middleware('islogged');
Route::get('/api/lproved','ListaController@proveedoresList')->middleware('islogged');
Route::get('/api/lartic','ListaController@artiucloList')->middleware('islogged');
Route::get('/api/lartic','ListaController@artiucloList')->middleware('islogged');
Route::get('/api/listapremio','ListaController@premio')->middleware('islogged');
Route::get('/api/here','PersonalController@getHerencia')->middleware('islogged');
Route::get('/api/lisventa','AlmacenController@ventas')->middleware('islogged');
Route::get('/api/liscambaceo','PedidoController@ventacambaceo')->middleware('islogged');
Route::post('/api/lispremio','PedidoController@premio')->middleware('islogged');
Route::post('/api/lispieza','AlmacenController@pieza')->middleware('islogged');
Route::get('/api/listaoficinas','ListaController@listaoficina')->middleware('islogged');
Route::put('/api/recive/{id}','RequisicionControler@recive')->middleware('islogged');
Route::post('/api/equipo','PersonalController@getEquipo')->middleware('islogged');
Route::put('/api/act/{id}','AlmacenController@actualizar')->middleware('islogged');
Route::get('/api/repo/{id}','AlmacenController@diario')->middleware('islogged');
Route::post('/api/cxc','RequisicionControler@cxc')->middleware('islogged');


//Rutas para el control de acciones en puestos
Route::resource('/api/puestos','PuestoController');
Route::resource('/api/personal','PersonalController');
Route::resource('/api/oficinas','OficinaController');
Route::resource('/api/articulos','ArticuloController');
Route::resource('/api/bancos','BancoController');
Route::resource('/api/proveedores','ProveedorController');
Route::resource('/api/contactos','ContactoController');
Route::resource('/api/premios','PremioController');
Route::resource('/api/requisicion','RequisicionControler');
Route::resource('/api/almaitem','AlmacenController');
Route::resource('/api/ventas','PedidoController');