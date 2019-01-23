<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Oficina;

class OficinaController extends Controller
{
    public function __construct()
    {
        $this->middleware('islogged');
    }

   //lista de oficinas en el sistema
    public function index(Request $request){
        $oficina = Oficina::all()->load('user');
        return response()->json(array(
            'oficinas' => $oficina,
            'status' => 'success'
        ),200);
     }

     //guardar oficina en la base de datos
    public function store (Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        $user = $json = $request->input('userid',null);
        $oficina = new Oficina();
        //asignando informacion al objeto puesto
        $oficina->user_id = $user;
        $oficina->personal_id = 1;
        $oficina->nombre = $params->nombre;
        $oficina->encargado = $params->encargado;
        $oficina->descripcion = $params->descripcion;
        $oficina->calle = $params->calle;
        $oficina->noint = $params->noint;
        $oficina->noext = $params->noext;
        $oficina->colonia = $params->colonia;
        $oficina->estado = $params->estado;
        $oficina->ciudad = $params->ciudad;
        $oficina->cp = $params->cp;
        $oficina->nombre = $params->nombre;

        //validar datos
        $validate = \Validator::make($params_array,
        [
        "nombre" => 'required|unique:oficina'
        ]);
        if ($validate->fails()) {
        return response()->json($validate->errors(),400);
        }
        //ingreso a la base de datos

        $oficina->save();
        $data = array(
            'oficina' => $oficina,
            'code' => 200,
            'status' =>'success'
        );
        return response()->json($data,200);
    }

    public function update($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        $oficina = new Oficina();
        //validar peticion
        $validate = \Validator::make($params_array,
        [
        "nombre"=> 'required|unique:oficina,id,'.$params->id,
        ]);

        if ($validate->fails())
        {
        return response()->json($validate->errors(),400);
        }
        //eliminando Array
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);

        //Actualizando el registro
        $oficina = Oficina::where('id',$id)->update($params_array);
        $data = array
        (
          'oficina' =>$params,
          'code' => 200,
          'status' => 'success'
        );
          return response()->json($data,200);
       }

       public function destroy($id, Request $request){
           $oficina = Oficina::find($id);
           $oficina->delete();
           $data = array(
               'oficina' => $oficina,
               'status' => 'success',
               'code' => 200
           );
       }


       public function show($id,Request $request)
       {
          $oficina = Oficina::find($id);
          if (is_object($oficina))
          {
            $oficina = Oficina::find($id)->load('user');
            return response()->json(array(
              'oficina'=> $oficina,
              'status' =>'success'
            ),200);
          }else{ return response()->json(array(
            'message' => 'No se encuentra el registro',
            'status' => 'error'
        ),400);
               }
      }
}//End Class
