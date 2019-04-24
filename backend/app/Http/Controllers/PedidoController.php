<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Pedido;

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
       //asignando informacion al objeto
       $pedido->user_id = $user;
       $pedido->id = $params->id;
       $pedido->fechapedido = $fecha;
       $pedido->importe = $params->importe;
       $pedido->pdestino = $params->pdestino;
       $pedido->nombre = $params->nombre;
       $pedido->tipo = $params->tipo;
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

}

?>