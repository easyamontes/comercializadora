<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Conceptoahorro;


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
        $user = $json = $request->input('userid',null);
        $concepto = new Conceptoahorro();
        $concepto->personal_id = $user;
        $concepto->nombre = $params->nombre;
        $concepto->fechadia = $params->fechapedido;
        $concepto->montoventa = $params->importe;
        $concepto->ahorrodia = $params->ahorro;
        $concepto->save();
        $data = array(
            'concepto' => $concepto,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }
}