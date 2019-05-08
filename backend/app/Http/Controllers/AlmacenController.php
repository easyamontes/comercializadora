<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Almacen;

class AlmacenController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request)
    {
        $user = $json = $request->input('userid', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) as totalExistencia, AVG(precio) AS costo')
            ->where('userp_id', $user)
            ->groupBy('articulo_id', 'proveedor_id')
            ->get()->load('proveedor');
        $data = array(
            'existencia' => $almacen,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid', null);
        $cleanid = array();

        foreach ($params_array as $item) {
            array_push($cleanid, $item['id']);
            $idrequi = $item['requisicion_id'];
            $idpedi = $item['pedido_id'];
            if ($item['id'] < 1) {
                $ida = $this->saveRecod($item,$user,$item['userp_id']);
                array_push($cleanid, $ida);
            } else {
                $almacen = Almacen::where('id', $item['id'])->update($item);
            }
            if ($idpedi > 0) {
                $almacen = Almacen::where('pedido_id', '=', $idpedi);
            } else {
                $almacen = Almacen::where('requisicion_id', '=', $idrequi)->whereNotIn('id', $cleanid)->delete();
            }
        }
        $data = array(
            'almacen' => $almacen,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data, 200);
    }

    public function ventas(Request $request)
    {
        $user = $json = $request->input('userid', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) AS totalExistencia ')
            ->where('tipo', '=', 'SALIDA')
            ->where('userp_id', '=', $user)
            ->groupBy('articulo_id', 'pedido_id')
            ->get()->load('user');
        return response()->json(array(
            'almacen' => $almacen,
            'status' => 'success'
        ), 200);
    }

    /** Nueva funcion para la creacion de las entradas de almacen */
    function saveRecod($item, $user, $userp)
    {
        $almacen = new Almacen();
        $almacen->user_id = $user;
        $almacen->requisicion_id = $item['requisicion_id'];
        $almacen->proveedor_id = $item['proveedor_id'];
        $almacen->articulo_id = $item['articulo_id'];
        $almacen->pedido_id = $item['pedido_id'];
        $almacen->folio = $item['folio'];
        $almacen->tipo = $item['tipo'];
        $almacen->userp_id = $userp;
        $almacen->codigo = $item['codigo'];
        $almacen->articulo = $item['articulo'];
        $almacen->marca = $item['marca'];
        $almacen->modelo = $item['modelo'];
        $almacen->cantidad = $item['cantidad'];
        $almacen->precio = $item['precio'];
        $almacen->existencia = $item['existencia'];
        $almacen->total = $item['total'];
        $almacen->save();
        return $almacen->id;
    }
}
