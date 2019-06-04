<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Requisicion;
use App\Almacen;

class RequisicionControler extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request)
    {
        $per = $json = $request->input('per', null);
        $requisicion = Requisicion::where('pdestino_id', '=', $per)
            ->where('status', '=', 'NUEVO')
            ->get()
            ->load('articulos')
            ->load('porigen')
            ->load('proveedor');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success',
            'code' => 200
        ), 200);
    }

    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $user = $json = $request->input('userid', null);
        $requisicion = new Requisicion();
        $fecha = substr($params->fecha, 0, 10);
        $ffactura = substr($params->ffactura, 0, 10);
        //Creando folio
        $folio = Requisicion::where('user_id', '=', $user)->where('tipo', '=', $params->tipo)->max('folio') + 1;
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
        return response()->json($data, 200);
    }

    public function show($id, Request $request)
    {
        $requisicion = Requisicion::find($id)->load('articulos')
                                             ->load('porigen')
                                             ->load('proveedor');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success'
        ), 200);
    }

    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $requisicion = new Requisicion();
        unset($params_array['proveedor']);
        unset($params_array['porigen']);
        unset($params_array['articulos']);
        $requisicion = Requisicion::where('id', $id)->update($params_array);
        $data = array(
            'requisicion' => $requisicion,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    
} //End class
