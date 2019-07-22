<?php

namespace App\Http\Controllers;

use App\PagoProveedor;
use Illuminate\Http\Request;

class PagoProveedorController extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    /* =====================================================
       lista de Facturas de prooveedor sin pagar
     ======================================================*/
    public function index(Request $request)
    {
        $user = $json = $request->input('userid', null);
        $facturas = PagoProveedor::where([
            ['status', '=', 'SIN PAGAR'],
            ['user_id', '=', $user]
        ])
            ->get()
            ->load('proveedor');
        $data = array(
            "code" => 200,
            "facturas" => $facturas,
            'status' => 'succes'
        );

        return response()->json($data, 200);
    }

    /* =====================================================
       lista de Facturas de prooveedor sin pagar
     ======================================================*/
    public function pagado(Request $request)
    {
        $user = $json = $request->input('userid', null);
        $facturas = PagoProveedor::where([
            ['status', '=', 'PAGADO'],
            ['user_id', '=', $user]
        ])
            ->get()
            ->load('proveedor');

        $data = array(
            "code" => 200,
            "facturas" => $facturas,
            'status' => 'succes'
        );
        return response()->json($data, 200);
    }

    /* =====================================================
       Guarda la nueva factura y la retorna para su uso
     ======================================================*/
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        $user = $request->input('userid', null);
        $per = $request->input('per', null);
        $pago = new PagoProveedor();
        $pago->user_id = $user;
        $pago->personal_id = $per;
        $pago->proveedor_id = $params_array['proveedor_id'];
        $pago->factura = $params_array['factura'];
        $pago->fecha = $params_array['fecha'];
        $pago->concepto = $params_array['concepto'];
        $pago->importe = $params_array['importe'];
        $pago->iva = $params_array['iva'];
        $pago->total = $params_array['total'];
        $pago->save();
        $pago->load('proveedor');
        $data = array(
            'factura' => $pago,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    public function update($id, Request $request)
    {
        $factura = PagoProveedor::find($id);
        $factura->status = "PAGADO";
        $factura->save();
        $data = array(
            "code" => 200,
            "message" => 'La factura se ha pagado con éxito',
            'status' => 'succes'
        );
        return response()->json($data, 200);
    }

    public function destroy($id, Request $request){
        $factura = PagoProveedor::find($id);
        $factura->delete();
        $data = array(
            "code" => 200,
            "message" => 'La factura se elimino',
            'status' => 'succes'
        );
        return response()->json($data, 200);
    }
}
