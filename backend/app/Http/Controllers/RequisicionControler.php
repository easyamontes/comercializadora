<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Requisicion;

class RequisicionControler extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request){
        $requisicion = Requisicion::All()->load('user')->load('articulos');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success'
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
        $requisicion->porigen_id = 0;
        $requisicion->pdestino_id = 0;
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
}