<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Articulo;

class ArticuloController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    /**Funcion para regresar un listado de productos */
    public function index(Request $request){
        $articulo = Articulo::All()->load('user');
        return response()->json(array(
            'articulo' => $articulo,
            'status' => 'success'
        ),200);
    }

    /**Funcion para Guardar Articulos */
    public function store( Request $request ){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $articulo = new Articulo();
        //asignando informacion al objeto puesto
        $articulo->user_id = $user;
        $articulo->nombre = $params->nombre;
        $articulo->marca = $params->marca;
        $articulo->modelo = $params->modelo;
        $articulo->codigo = $params->codigo;
        $articulo->descripcion = $params->descripcion;
        $articulo->status = $params->status;
        $articulo->save();
        $data = array(
            'articulo' => $articulo,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    /** Updateando registro */
    public function update ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $articulo = new Articulo();

        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);

        $articulo = Articulo::where('id',$id)->update($params_array);
        $data = array(
            'articulo' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    /**Eliminar Registro */
    public function destroy($id, Request $request){
        $articulo = Articulo::find($id);
        $articulo->delete();
        $data = array(
            'articulo' => $articulo,
            'status' => 'success',
            'code' => 200
        );
    }

    /**Mostrar un registro */
    public function show($id, Request $request){
        $articulo = Articulo::find($id);
        if(is_object($articulo)){
            $articulo = Articulo::find($id)->load('user');
            return response()->json(array(
                'articulo' => $articulo,
                'status' => 'success'
            ),200);
        }else{
            return response()->json(array(
                'message' => 'No se encuentra el registro',
                'status' => 'error'
            ),400);
        }
    }
    

}//EndClass
