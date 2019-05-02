<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Almacen;

class AlmacenController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request){
        $user = $json = $request->input('userid',null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) as totalExistencia, AVG(precio) AS costo')
                        ->where('userp_id',$user)
                        ->groupBy('articulo_id','proveedor_id')
                        ->get()->load('proveedor');
        $data = array(
            'existencia' => $almacen,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data,200);
    }

    public function store (Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        $user = $json = $request->input('userid',null);
        $cleanid = array();
        foreach ($params_array as $item) {
            array_push($cleanid,$item['id']);
            $idrequi = $item['requisicion_id'];
            $idpedi = $item ['pedido_id'];
            $tipos = $item ['tipo'];
            if ($item['id'] < 1 ){
                $almacen = new Almacen();
                $almacen->user_id = $user;
                $almacen->requisicion_id = $item['requisicion_id'];
                $almacen->proveedor_id = $item['proveedor_id'];
                $almacen->articulo_id = $item['articulo_id'];
                $almacen->pedido_id = $item ['pedido_id'];
                $almacen->folio = $item ['folio'];
                $almacen->tipo = $item ['tipo'];
                if( $idpedi > 0 and $tipos == 'ENTRADA'){ 
                    $almacen->userp_id = $user; 
                     }else 
                     {
                    $almacen->userp_id = $item['userp_id'];
                     }
                $almacen->codigo = $item['codigo'];
                $almacen->articulo = $item['articulo'];
                $almacen->marca = $item['marca'];
                $almacen->modelo = $item['modelo'];
                $almacen->cantidad = $item['cantidad'];
                $almacen->precio = $item['precio'];
                $almacen->existencia = $item['existencia'];
                $almacen->total = $item['total'];
                $almacen->save();
                array_push($cleanid,$almacen['id']);
            }else {
                $almacen = Almacen::where('id',$item['id'])->update($item);
            }
      
        if ( $idpedi > 0 ){
            $almacen = Almacen::where('pedido_id','=',$idpedi);
        }else{  $almacen = Almacen::where('requisicion_id','=',$idrequi)->whereNotIn('id', $cleanid)->delete();
        }
          }
      
        $data = array(
            'almacen' => $almacen,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data,200);
    }


    public function ventas(Request $request){
        $user = $json = $request->input('userid',null);
        $almacen = Almacen::where('tipo','=','SALIDA')->get()->load('user');
        return response()->json(array(
         'almacen' => $almacen,
         'status' => 'success'
        ),200);
     }
}
