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

    public function puestosList( Request $request ){
        $personal = DB::table('puesto')->select('id','puesto')->get();
        $data = array(
            'puestol' => $personal,
            'code' => 200,
            'status' => 'success'
        );
        return $data;
    }

    public function proveedoresList( Request $request ){
        $proveedores = DB::table('proveedor')->select('id','nombre')->get();
        $data = array(
            'proveedorll' => $proveedores,
            'code' => 200,
            'status' => 'success'
        );
        return $data;
    }

    public function listaoficina (Request $request){
        $oficinas =DB::table('oficina')->select('nombre')->get();
        $data = array(
            'oficinall' => $oficinas,
            'code' => 200,
            'status' => 'success'
        );
        return $data;
    }
    
    public function artiucloList( Request $request ){
        $articulos = DB::table('articulo')->get();
        $data = array(
            'articulos' =>  $articulos,
            'code' => 200,
            'status' => 'success'
        );
        return $data;
    } 

}
