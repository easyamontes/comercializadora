<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OverController extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    /*======================================================================
         FUNCION PARA CREAR LA CONSULTA DE OVERS
    ====================================================================== */
    public function setreporte(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $lvl1= join(",", $params_array['level1']);
        $lvl2= join(",", $params_array['level2']);
        $lvl3= join(",", $params_array['level3']);

        if(count($params_array['level1']) > 0){
            $level1 =  DB::select(
                '
                select al.articulo_id, al.articulo, ar.level1 as over, sum(al.venta) as piezas 
                from  almacen al
                INNER JOIN pedido pd ON al.pedido_id = pd.id 
                INNER JOIN articulo ar ON al.articulo_id = ar.id 
                where pd.user_id IN (' .$lvl1. ') and pd.tipo = ? and pd.fechapedido BETWEEN ? and ?
                GROUP BY al.articulo_id',
                ['ENTRADA', $params_array['inicio'], $params_array['final']]
            );
        }else {
            $level1 = null;
        }

        if (count($params_array['level2']) > 0) {
            $level2 =  DB::select(
                '
                select al.articulo_id, al.articulo, ar.level2 as over, sum(al.venta) as piezas 
                from almacen al 
                INNER JOIN pedido pd ON al.pedido_id = pd.id 
                INNER JOIN articulo ar ON al.articulo_id = ar.id 
                where pd.user_id IN (' .$lvl2. ') and pd.tipo = ? and pd.fechapedido BETWEEN ? and ?
                GROUP BY al.proveedor_id, al.articulo_id',
                ['ENTRADA', $params_array['inicio'], $params_array['final']]
            );
        }else {
            $level2 = null;
        }

       if(count($params_array['level3']) > 0){
        $level3 =  DB::select(
            '
            select al.articulo_id, al.articulo, ar.level3 as over, sum(al.venta) as piezas 
            from almacen al 
            INNER JOIN pedido pd ON al.pedido_id = pd.id 
            INNER JOIN articulo ar ON al.articulo_id = ar.id 
            where pd.user_id IN (' . $lvl3 . ') and pd.tipo = ? and pd.fechapedido BETWEEN ? and ?
            GROUP BY al.proveedor_id, al.articulo_id',
            ['ENTRADA', $params_array['inicio'], $params_array['final']]
        );
       }else {
            $level3 = null;
       }
        

        $data = array(
            'code' => 200,
            'level1' => $level1,
            'level2' => $level2,
            'level3' => $level3,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    /*======================================================================
        FUNCION PARA CREAR LA CONSULTA PARA EL ESTADO DE RESULTADOS
    ====================================================================== */
    public function setEstadoResultados(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $per = $json = $request->input('per', null);

        $report =  DB::select(
            '
            select al.articulo, sum(al.venta) as cantidad, al.costo, al.precio, (sum(al.venta) * al.costo) as vtotal, (sum(al.venta) * al.precio) as ctotal, ((sum(al.venta) *al.precio) - (sum(al.venta) * al.costo)) as utilidad
            from  almacen al
            INNER JOIN pedido pd ON al.pedido_id = pd.id 
            where pd.user_id = ? and pd.tipo = ? and pd.fechapedido BETWEEN ? and ?
            GROUP BY al.articulo_id , al.costo, al.precio',
            [$params_array['socio'],'ENTRADA',$params_array['inicio'],$params_array['final']]
        );
        $gastos = DB::select('
            select sum(total) as total
            from pagoproveedor
            where personal_id = ?
        ',[$params_array['socio']]);

        $data = array(
            'code' => 200,
            'report' => $report,
            'gasto' => $gastos,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }
}
