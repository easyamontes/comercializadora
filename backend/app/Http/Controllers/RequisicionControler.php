<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Requisicion;
use App\Almacen;

class RequisicionControler extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request){
        $user = $json = $request->input('userid',null);
        $per = $json = $request->input('per',null);
        $requisicion = Requisicion::where('pdestino_id','=',$per)
                                    ->where('status','=','NUEVO')
                                    ->get()
                                    ->load('porigen')
                                    ->load('proveedor');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success',
            'code' => 200
        ),200);
    }

    public function store( Request $request ){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $requisicion = new Requisicion();
        $fecha = substr($params->fecha,0,10);
        $ffactura = substr($params->ffactura,0,10);
        //Creando folio
        $folio = Requisicion::where('user_id','=',$user)->where('tipo','=',$params->tipo)->max('folio') + 1;

        $requisicion->user_id = $user;
        $requisicion->porigen_id = $params->porigen_id;
        $requisicion->pdestino_id = $params->pdestino_id;
        $requisicion->proveedor_id = $params->proveedor_id;
        $requisicion->folio = $folio;
        $requisicion->tipo = $params->tipo;
        $requisicion->status = $params->status;
        $requisicion->importe = $params->importe;
        $requisicion->fecha = $fecha;
        $requisicion->factura = $params->factura;
        $requisicion->ffactura =  $ffactura;
        $requisicion->divisa = 'MXN';
        //Creando registro en la base de datos
        $requisicion->save();

        $data = array(
            'requisicion' => $requisicion,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    //Aceptando 
    public function update( $id, Request $request ){

        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $per = $json = $request->input('per',null);
        $requisicion = new Requisicion();
        unset($params_array['proveedor']);
        unset($params_array['porigen']);
        $requisicion = Requisicion::where('id',$id)->update($params_array);
        //Cargando la existencia
        DB::update('UPDATE almacen SET existencia = cantidad WHERE requisicion_id ='. $id);
        $data = array(
            'requisicion' => $requisicion,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    public function recive ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $requisicion = Requisicion::with('articulos')->where('id',$id)->first();
        $requisicion->status = "RECIBIDO";
        $requisicion->save();
        $almacen = $requisicion->articulos()->get();
        //Duplicando requisicion
        $newRequi = $requisicion->replicate();
        $newRequi->tipo  = "COMPRA";
        $newRequi->folio = Requisicion::where('user_id','=',$user)->where('tipo','=',$newRequi->tipo)->max('folio') + 1;
        $newRequi->save();
        //Duplicando conceptos
        foreach ($almacen as $item) {
            $articulo = Almacen::where('id',$item->id)->first();
            $newArticulo = $articulo->replicate();
            $newArticulo->userp_id = $user;
            $newArticulo->existencia = $newArticulo->existencia *-1;
            $newArticulo->save();
        }
        $data = array(
            'requisicion' => $newRequi,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    function reciveNew ($id, Request $request){
        $json = $request->input('json',null);
        $user = $json = $request->input('userid',null);
        $exis = Almacen::where('id',$user)->get();
    }

} //End class