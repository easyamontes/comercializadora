<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Personal;

class PersonalController extends Controller
{
    //llamando al middelware
    public function __construct()
    {
        $this->middleware('islogged');
    }
    /** Funcion para regresar un listado de empleados */
    public function index(Request $request){
        $personal = Personal::all()->load('user');
        return response()->json(array(
            'puestos' => $personal,
            'status' => 'success'
        ),200);
    }

    /**Funcion para Guardar en el registro */
    public function store( Request $request ){
        //recogiendo variables que vienen del Call post
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $personal = new Puesto();
         
        //asignando informacion al objeto puesto
        $personal->nombre = $params->nombre;
        $personal->apellidop = $params->apellidop;
        $personal->apellidom = $params->apellidom;
        $personal->user_id = $user;
        $personal->noint = $params->noint;
        $personal->noext = $params->noext;
        $personal->colonia = $params->colonia;
        $personal->estado = $params->estado;
        $personal->ciudad = $params->ciudad;
        $personal->cp = $params->cp;
        $personal->status = $params->status;
        //metiendo a la base de datos
        $personal->save();
        $data = array(
            'puesto' => $personal,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }
}
