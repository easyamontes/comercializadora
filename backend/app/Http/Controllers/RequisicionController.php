<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Requisicion;

class RequisicionController extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    /* =====================================================
       Muestra la lista de requisiciones guardadas
     ======================================================*/

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

    /* =====================================================
       Guardando Nuevos Registros
     ======================================================*/

    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $user = $json = $request->input('userid', null);
        $requisicion = new Requisicion();
        $fecha = substr($params->fecha, 0, 10);
        $ffactura = substr($params->ffactura, 0, 10);
        $folio = Requisicion::where('user_id', '=', $user)->where('tipo', '=', $params->tipo)->max('folio') + 1;
        $requisicion->user_id = $user;
        $requisicion->porigen_id = $params->porigen_id;
        $requisicion->pdestino_id = $params->pdestino_id;
        $requisicion->proveedor_id = $params->proveedor_id;
        $requisicion->folio = $folio;
        $requisicion->tipo = $params->tipo;
        $requisicion->status = $params->status;
        $requisicion->importe = $params->importe;
        $requisicion->xpagar = $params->importe;
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

    /* =====================================================
       Editando Registros
     ======================================================*/

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

    /* =====================================================
       Editando Registros
     ======================================================*/

    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $requisicion = new Requisicion();
        unset($params_array['proveedor']);
        unset($params_array['porigen']);
        unset($params_array['articulos']);
        $params_array['xpagar'] = $params_array['importe'];
        $requisicion = Requisicion::where('id', $id)->update($params_array);
        $data = array(
            'requisicion' => $requisicion,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }
    /* =====================================================
       lista de requisiciones sin pagar
     ======================================================*/
    public function cxc(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $inicio = $params_array['inicio'];
        $query = Requisicion::query();
        $query->where('pdestino_id', '=', $params_array['socio'])
            ->where('statuspago', '=', 'PENDIENTE')
            ->when($inicio, function ($q) use ($params_array) {
                return $q->whereBetween('fecha', [$params_array['inicio'], $params_array['final']]);
            });
        $requisicion = $query->get()
            ->load('articulos')
            ->load('proveedor')
            ->load('porigen');

        $data = array(
            'requisicion' => $requisicion,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

     public function listapendiente (Request $request)
     {
        $per = $json = $request->input('per', null);
        $requisicion = Requisicion::where('porigen_id', '=', $per)
            ->where('status', '=', 'NUEVO')
            ->get()
            ->load('pdestino');
        return response()->json(array(
            'pendiente' => $requisicion,
            'status' => 'success',
            'code' => 200
        ), 200);
     }
    
} //End class
