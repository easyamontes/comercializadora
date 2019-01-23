<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Banco;

class BancoController extends Controller
{
  public function __construct()
     {
       $this->middeleware('islogged');  
     }

     //lista de bancos en el sistema
     public function index (Request $request)
     {  //= Banco (nombre del http que se creo para banco)
        $banco = Banco::all()->load('user');
        return response()->json(array(
            'bancos' => $banco,
            'status' => 'success'
        ),200);
     }//end function index

     //function para poder guadar los datos en la base
     public function store(Request $request)
     {
         $json = $request->input('json',null);
         $params = json_decode($json);
         $params_array = json_decode($json,true);
         $user = $json = $request->input('userid',null);
         $banco = new Banco();
         //asignando informacion al objeto
         $banco->user_id = $user;
         $banco->nombre = $params->nombre;
         $banco->alias = $params->alias;
         $banco->moneda = $params->moneda;
         $banco->cuentabancaria = $params->cuentabancaria;
         $banco->cuentaclabe = $params->cuentaclabe;
         $banco->swift = $params->swift;
         $banco->sucursal = $params->sucursal;
         $banco->numerosucursal = $params->numerosucursal;
         $banco->domicilio = $params->domicilio;
         $banco->ciudad = $params->ciudad;
         $banco->pais = $params->pais;
         $banco->save();
         $data = array(
              'banco' => $banco,
              'code' => 200,
              'status' =>'success'
         );
         return response()->json($data,200);
     } //end funcion store guardar datos en la base

     //update registro banco
       public function update ($id, Request $request)
     {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $banco = new Banco ();

        unset ($params_array ['id']);
        unset ($params_array['user_id']);
        unset ($params_array['created_at']);
        unset ($params_array['user']);
        
        $banco = Banco::where('id',$id)->update($params_array);
        $data = array(
            'banco' =>$params,
            'code' => 200,
            'status' => 'success'
        );

        return response()->json($data,200);
     }//end function update registro

     //eliminar registro
       public function destroy($id, Request $request)
       {
           $banco = Banco::dind($id);
           $banco -> delete();
           $data = array (
               'banco' => $banco,
               'status' => 'success',
               'code' => 200
            );
       } //end eliminar registro

    //mostrar un solo registro
    public function show ($id,Request $request)
    {
        $banco = Banco::find($id);
        if (is_object($banco)){
            $banco = Banco::find($id)->load('user');
            return response()->json(array(
                'banco' => $banco,
                'status' =>'success'
            ),200);

        }else{
            return response()->json(array(
                'message' =>'no se encuentra registro',
                'status' => 'error'
            ),400);
        }//emd else
    }//end mostrar un solo registro

}//end class controller banco