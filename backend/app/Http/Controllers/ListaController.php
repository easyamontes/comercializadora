<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Personal;
use App\Helpers\JwtAuth;

class ListaController extends Controller
{
    //Regresando Lista de Empleados
    public function empleadosList( Request $request ){
        $personal = DB::table('personal')->select('id',DB::raw("CONCAT(nombre,' ',apellidop,' ',apellidom) as nombre"))->get();
        $data = array(
            'personall' => $personal,
            'code' => 200,
            'status' => 'success'
        );
        return $data;
    }
}
