<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Proveedor;

class ProveedorController extends Controller
{
    //llamando al middelware de login
    public function __construct()
    {
        $this->middleware('islogged');
    }

    //llama un listado de proveedores desde la base de datos
    public function index(Request $request){
        $proveedor = Proveedor::all()->load('user');
        $nop = $proveedor->count();
        return response()->json(array(
            'proveedores' => $proveedor,
            'status' => 'success'
        ),200);
    }
    
    //Guardando registro en la base de datos
    public function store( Request $request ){
        //recogiendo variables que vienen del Call post
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $proveedor = new Proveedor();
        //validando datos de la peticion
        $validate = \Validator::make($params_array,[
            "razon_social" => 'required|unique:proveedor',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(),400);
        }
        
        //asignando informacion al objeto proveedor
        $proveedor->user_id = $user;
        $proveedor->nombre = $params->nombre;
        $proveedor->razon_social = $params->razon_social;
        $proveedor->calle = $params->calle;
        $proveedor->noint = $params->noint;
        $proveedor->noext = $params->noext;
        $proveedor->colonia = $params->colonia;
        $proveedor->estado = $params->estado;
        $proveedor->ciudad = $params->ciudad;
        $proveedor->cp = $params->cp;
        $proveedor->status = $params->status;

        //metiendo a la base de datos
        $proveedor->save();
        $data = array(
            'proveedor' => $proveedor,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    public function update ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true); 
        $proveedor = new Proveedor();

        //validando datos de la peticion
        $validate = \Validator::make($params_array,[
            "razon_social" => 'required|unique:proveedor,id,'.$params->id,
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(),400);
        }
        //elimienado array
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);
        unset($params_array['contactos']);
    
        //Actualizando el registro
        $proveedor = Proveedor::where('id',$id)->update($params_array);
        $data = array(
            'proveedor' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    public function destroy($id, Request $request){
        $proveedor = Proveedor::find($id);
        $proveedor->delete();
        $data = array(
            'proveedor' => $proveedor,
            'status' => 'success',
            'code' => 200
        );
    }

    public function show($id, Request $request){
        $proveedor = Proveedor::find($id);
        if(is_object($proveedor)){
            $proveedor = Proveedor::find($id)->load('user');
            return response()->json(array(
                'proveedor' => $proveedor,
                'status' => 'success'
            ),200);
        }else{
            return response()->json(array(
                'message' => 'No se encuentra el registro',
                'status' => 'error'
            ),400);
        }
    }

}