<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Pedido;
use App\Almacen;

class PedidoController extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }
    /* =====================================================
       lista de pedidos con status salida
     ======================================================*/ 
    public function index(Request $request){
       $pedido = Pedido::where('tipo','=','SALIDA')->get()->load('user');
       return response()->json(array(
        'pedidos' => $pedido,
        'status' => 'success'
       ),200);
    }



    public function store ( Request $request)
    {
       $json = $request->input('json',null);
       $params = json_decode($json);
       $params_array = json_decode($json,true);
       $user = $json = $request->input('userid',null);
       $pedido = new Pedido();
       $fecha = substr($params->fechapedido,0,10); 
       $dia = substr($fecha,8,2);
       $mes = substr($fecha,5,2);
       $anio = substr($fecha,0,4);  
       $semana = date('W',  mktime(0,0,0,$mes,$dia,$anio)); 
       //asignando informacion al objeto
       $sema = date('w');
       $pedido->user_id = $user;
       $pedido->id = $params->id;
       $pedido->fechapedido = $fecha;
       $pedido->importe = $params->importe;
       $pedido->pdestino = $params->pdestino;
       $pedido->nombre = $params->nombre;
       $pedido->tipo = $params->tipo;
       $pedido->semana = $semana;
       $pedido->save();
       $data = array(
            'pedido' => $pedido,
            'code' => 200,
            'status' =>'success'
       );
       return response()->json($data,200);
    }
    public function destroy($id, Request $request){
        $conceptoventa = Pedido::find($id);
        $conceptoventa->delete();
        $data = array(
            'pedido' => $conceptoventa,
            'status' => 'success',
            'code' => 200
        );
    }
     /* =====================================================
       funcion para mostrar un solo registro
     ======================================================*/ 

    public function show ($id,Request $request)
    {
        $pedido = Pedido::find($id);
        if (is_object($pedido)){
            $pedido = Pedido::find($id)->load('user')
            ->load('articulos');
            return response()->json(array(
                'pedido' => $pedido,
                'status' =>'success'
            ),200);

        }else{
            return response()->json(array(
                'message' =>'no se encuentra registro',
                'status' => 'error'
            ),400);
        }//emd else
    }//end mostrar un solo registro

     /* =====================================================
       funcion para actualizar registro
     ======================================================*/ 

    public function update ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $pedido = new Pedido();
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);
        unset($params_array['articulos']);

        $pedido = Pedido::where('id',$id)->update($params_array);
        $data = array(
            'pedido' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }


    public function ventacambaceo(Request $request)
    {
        $per = $json = $request->input('per', null);
        $idp = Pedido::select('id')
        ->where('tipo','=','SALIDA')
        ->where('pdestino','=',$per)
        ->get()->load('articulos');
        return response()->json(array(
            'almacen' => $idp,
            'status' => 'success'
        ), 200);
    }

    public function premio(Request $request)
    {
        $fecha = date('Y-m-d');
        $dia = substr($fecha,8,2);
        $mes = substr($fecha,5,2);
        $anio = substr($fecha,0,4);  
        $semana = date('W',  mktime(0,0,0,$mes,$dia,$anio)); 
        $per = $json = $request->input('per', null);
        $pedido = Pedido::select('*')
            ->where('user_id','=',$per)
            ->where('semana','=',$semana)
            ->orderby('nombre','fechapedido')
            ->get()->load('user');
        return response()->json(array(
            'pedidoall' => $pedido,
            'status' => 'success'
        ), 200);
    }


}

?>

