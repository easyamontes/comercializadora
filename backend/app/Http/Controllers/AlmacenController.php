<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Almacen;

class AlmacenController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    /*==============================================================================
        Crea un listado de existencias
    ==============================================================================*/
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
    /*==============================================================================
        Crea los Nuevos registros
    ==============================================================================*/
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid', null);    
        foreach ($params_array as $item) {
            $tipo = $item['tipo'];
            if( $tipo != "COMPRA"){
                $item = $this->surteRecord($item,$user);
            }
            $almacen = $this->saveRecod($item, $user);
        }

        $data = array(
            'almacen' => $almacen,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data, 200);
    }
    /*==============================================================================
        lista para dar hojas de salida
    ==============================================================================*/

    public function ventas(Request $request)
    {
        $per = $json = $request->input('per', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) AS totalExistencia ')
            ->where('tipo', 'in', 'COMPRA','ENTRADA')
            ->where('userp_id', '=', $per)
            ->groupBy('articulo_id')
            ->get()->load('user');
        return response()->json(array(
            'almacen' => $almacen,
            'status' => 'success'
        ), 200);
    }

    /*==============================================================================
        lista que llega al cambaceador
    ==============================================================================*/
    public function ventacambaceo(Request $request)
    {
        $per = $json = $request->input('per', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) AS totalExistencia ')
            ->where('userp_id', '=', $per)
            ->where('tipo', '=', 'SALIDA')
            ->groupBy('articulo_id', 'pedido_id')
            ->get()->load('user');
        return response()->json(array(
            'almacen' => $almacen,
            'status' => 'success'
        ), 200);
    }

    /*==============================================================================
        Nueva funcion para la creacion de las entradas de almacen
    ==============================================================================*/

    function saveRecod($item, $user)
    {
        $almacen = new Almacen();
        $almacen->user_id = $user;
        $almacen->id_almacen = $item['id_almacen'];
        $almacen->requisicion_id = $item['requisicion_id'];
        $almacen->proveedor_id = $item['proveedor_id'];
        $almacen->articulo_id = $item['articulo_id'];
        $almacen->pedido_id = $item['pedido_id'];
        $almacen->folio = $item['folio'];
        $almacen->tipo = $item['tipo'];
        $almacen->userp_id = $item['userp_id'];
        $almacen->codigo = $item['codigo'];
        $almacen->articulo = $item['articulo'];
        $almacen->marca = $item['marca'];
        $almacen->modelo = $item['modelo'];
        $almacen->recepcion = $item['recepcion'];
        $almacen->cantidad = $item['cantidad'];
        $almacen->precio = $item['precio'];
        $almacen->existencia = $item['existencia'];
        $almacen->total = $item['total'];
        $almacen->save();
        return $almacen;
    }

    /*==============================================================================
        Funcion para surtir una Existencia 
    ==============================================================================*/
    function surteRecord($item, $user)
    {
        $qrty = Almacen::where('articulo_id', '=', $item['articulo_id'])
            ->where('userp_id', '=', $user)
            ->get();
        $exist = json_decode($qrty, true);
        $dif = 0;
        foreach ($exist as $existe) {
            if ($existe['existencia'] >= $item['recepcion']) {
                $dif =  $existe['existencia'] - $item['recepcion'];
                $existe['existencia'] = $dif;
                $upalma = new Almacen();
                $upalma = Almacen::where('id', $existe['id'])->update($existe);
                $item['id_almacen'] = $existe['id'];
                $item['existencia'] = $item['cantidad'];
                return $item;
                break;
            } else {
                $dif =  $existe['existencia'] - $item['recepcion'];
                if ($dif >= 0) {
                    $existe['existencia'] = $dif;
                    $item['id_almacen'] = $existe['id'];
                    $item['recepcion'] = $dif - $item['recepcion'];
                    $upalma = new Almacen();
                    $upalma = Almacen::where('id', $existe['id'])->update($existe);
                    saveRecod($item, $user);
                }
            }
        }
    }


    function update(Request $request){
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid', null);
        foreach ($params_array as $item) {
            unset($item['totalExistencia']);
            unset($item['user']);
            $upalma = new Almacen();
            $upalma = Almacen::where('id', $item['id'])->update($item);
        }
        return response()->json(array(
            'almacen' => $upalma,
            'status' => 'success'
        ), 200);
    }

}//End Class 
