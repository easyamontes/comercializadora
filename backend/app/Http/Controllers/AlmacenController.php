<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Almacen;
use App\Pedido;

class AlmacenController extends Controller
{
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
        $per = $json = $request->input('per', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) as totalExistencia, AVG(precio) AS costo')
            ->where('userp_id',$per)
            //->groupBy('articulo_id', 'proveedor_id')
            ->groupBy('articulo_id')
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
        $per = $json = $request->input('per', null);  
        foreach ($params_array as $item) {
            $tipo = $item['tipo'];
            if( $tipo != "COMPRA" && $tipo != "ENTRADA"){
                $item = $this->surteRecord($item,$user,$per);
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
        Funcion para Actualizar los registros del almacen
    ==============================================================================*/
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
            'code'=> 200,
            'status' => 'success'
        ), 200);
    }
 
    /*==============================================================================
        lista para dar hojas de salida
    ==============================================================================*/

    public function ventas(Request $request)
    {
        $per = $json = $request->input('per', null);
        $almacen = Almacen::selectRaw(' * ,SUM(existencia) AS totalExistencia ')
            ->whereIn('tipo', ['COMPRA','ENTRADA'])
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
        $almacen->devolucion = $item['devolucion'];
        $almacen->existencia = $item['existencia'];
        $almacen->total = $item['total'];
        $almacen->pendiente = $item['pendiente'];
        $almacen->save();
        return $almacen;
    }

    /*==============================================================================
        Funcion para surtir una Existencia 
    ==============================================================================*/
    function surteRecord($item, $user,$per)
    {
        $qrty = Almacen::where('articulo_id', '=', $item['articulo_id'])
            ->where('userp_id', '=', $per)
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


    /*======================================================================
        REPORTE POR PIEZAS VENDIDAD POR EL SOCIO COMERCIAL
    ====================================================================== */
    
    public function pieza(Request $request)
    {
        
        $json = $request->input('json',null);
        $params = json_decode ($json);
        $per = $json = $request->input('per', null);
        $socio = $params->socio;
        $pieza = Almacen::selectRaw('articulo,modelo, SUM(venta) AS venta, SUM(total) AS total, AVG(PRECIO) AS precio')
            ->where('user_id','=',$per)->where('userp_id','=',$socio)->where('tipo','=', 'SALIDA')
            ->groupby( 'userp_id','articulo_id')
            ->get()->load('user');
        return response()->json(array(
            'piezaall' => $pieza,
            'status' => 'success'
        ), 200);
    } 

    /*======================================================================
         FUNCION PARA ACTUALIZAR EL CAMPO VENTA
    ====================================================================== */
    
    public function actualizar (Request $request, $id){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $tot = 0;
         foreach ($params_array as $item){
            $actualizar = new Almacen();
            $ca = $item['devolucion'];
            $devolucion = $item['existencia']- $item ['devolucion'];
            $precio = $devolucion * $item['precio'];
            $tot = $tot + $precio;
            if($ca < 1 ){
                $actualizar = Almacen::where('id', $item['id'])->update(['venta'=> $item['cantidad'] ]);
            }else{
                $actualizar = Almacen::where('id', $item['id'])->update(['venta'=>$devolucion,'total'=>$precio]);
            }
         }
        $aho = $tot * 0.05;
        Pedido::where('id','=',$id)->update(['importe' =>  $tot, 'ahorro' =>  $aho]);
        return response()->json(array(
            'actua' => $actualizar,
            'status' => 'success'
        ),200);
    }


    /*======================================================================
         FUNCION PARA CREAR EL REPORTE DE DIARIO
    ====================================================================== */
     public function diario(Request $request,$id){
        $existe = DB::select('select id, proveedor_id, articulo_id, articulo, sum(existencia) as existencia, sum(total) as total from almacen where userp_id = ? and existencia > 0 GROUP BY proveedor_id, articulo_id',[$id]);
        $compra = DB::select('select al.id, al.proveedor_id, al.articulo_id, al.articulo, al.modelo, sum(al.total) as total from almacen al INNER JOIN requisicion rq where rq.pdestino_id = ? and rq.tipo = ? GROUP BY proveedor_id, articulo_id',[$id,'COMPRA']);
        $venta =  DB::select('select al.id, al.proveedor_id, al.articulo_id, al.articulo, al.modelo, sum(al.total) as total from almacen al INNER JOIN requisicion rq where rq.pdestino_id = ? and rq.tipo = ? GROUP BY proveedor_id, articulo_id',[$id,'VENTA']);
        return response()->json(
            array(
            'existencia' => $existe,
            'compra' => $compra,
            'venta'  => $venta
        ),200);
     }
    }//End Class 