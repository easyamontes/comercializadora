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

    public function index(Request $request){
/** */
    }



    public function store ( Request $request)
    {
       $json = $request->input('json',null);
       $params = json_decode($json);
       $params_array = json_decode($json,true);
       $user = $json = $request->input('userid',null);
       $pedido = new Pedido();
       //asignando informacion al objeto
       $pedido->user_id = $user;
       $pedido->id = $params->id;
       $pedido->fechapedido = $params->fechapedido;
       $pedido->importe= $params->importe;
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

}

?>