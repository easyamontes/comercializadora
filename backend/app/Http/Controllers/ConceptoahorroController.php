<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Conceptoahorro;
use App\Ahorro;
use App\Pedido;


class ConceptoahorroController extends Controller
{
    public function __construct()
    {
        $this->middleware('islogged');
    }

      /*======================================================================
         FUNCION PARA ESCRIBIR REGISTRO EN LA TABLA
    ====================================================================== */

    public function store( Request $request ){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $concepto = new Conceptoahorro();
        $concepto->personal_id = $params->user_id;
        $concepto->nombre = $params->user->name;
        $concepto->fechadia = $params->fechapedido;
        $concepto->montoventa = $params->importe;
        $concepto->ahorrodia = $params->ahorro;
        $concepto->concepto = 'AHORRO';
        $concepto->save();
        Pedido::where('id','=',$params_array['id'])
        ->where('fechapedido','=',$params->fechapedido)->update(['status' => 'APLICADO']);
        $data = array(
            'concepto' => $concepto,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }
       /*======================================================================
         FUNCION PARA PAGAR MULTAS EN AHORRO
    ====================================================================== */

    public function pagarmulta (Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $concepto = new Conceptoahorro();
        $concepto->personal_id = $params->user_id;
        $concepto->nombre = $params->user->name;
        $concepto->fechadia = $params->fechapedido;
        $concepto->montoventa = $params->importe;
        $concepto->ahorrodia = $params->pagomulta * -1;
        $concepto->tipo = 'S';
        $concepto->concepto = 'MULTA';
        $concepto->status = 'PAGADO';
        $concepto->save();
        $data = array(
            'multa' => $concepto,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

      /*======================================================================
         FUNCION PARA TRAER TODOS LOS FONDOS DE AHORRRO
    ====================================================================== */
    public function listastatus(Request $request)
    {
     
        $json = $request->input('json',null);
        $params = json_decode ($json);
        $per = $json = $request->input('per', null);
        $socio = $params->socio;
        $tipo = $params->final;  
            $ahorro = Conceptoahorro::select('*')
            ->where('personal_id','=',$socio)
            ->where('status', '=',$tipo)
            ->get();
        $total = Conceptoahorro::selectRaw('SUM(ahorrodia) AS ahorrodia')
        ->where('personal_id','=',$socio)
        ->get();
        return response()->json(array(
            'statusahorro' => $ahorro,
            'total' => $total,
            'status' => 'success'
        ), 200);
    }

    public function pagar (Request $request)
    {
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $fe = substr($params->fechapedido,0,10);
        $ahorro = new Conceptoahorro();
        $ahorro->personal_id = $params->personal_id;
        $ahorro->fechadia = $fe;
        $ahorro->nombre = $params->no;
        $ahorro->montoventa = $params->ahorrodia;
        $ahorro->ahorrodia = $params->ahorrodia;
        $ahorro->tipo = $params->tipo;
        $ahorro->status = $params->status;
        $ahorro->concepto = $params->concepto;
        $ahorro->save();
        $total = Conceptoahorro::selectRaw('SUM(ahorrodia) AS ahorrodia')
        ->where('personal_id','=',$params->personal_id)
        ->get();
        $data = array(
            'total' => $total,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    
}
