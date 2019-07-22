<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ahorro;

class AhorroController extends Controller
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
        $re = Ahorro::select('id')->where('status','=','SIN PAGAR')
        ->where('personal_id','=',$user)->count();
         if($re > 1){
             $data = array(
            'error' => 'EL GERENTE CUENTA CON UNA FONDO DE AHORRO SIN PAGAR',
            'code' => 500,
            'status' => 'success'
             );
             return response()->json($data,200);
         }
        $ahorro = new Ahorro();
        $ahorro->personal_id = $user;
        $ahorro->nombre = $params->nombre;
        $ahorro->limiteahorro = $params->limiteahorro;
        $ahorro->fechapago  = $params->fechapago;
        $ahorro->montopagado = $params->montopagado;
        $ahorro->status = $params->status;
        $ahorro->save();
        $data = array(
            'ahorro' => $ahorro,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    
     public function show ($id,Request $request){
        $json = $request->input('json',null);
        $params = json_decode ($json);
        $user = $request->input('userid', null);
        $per = $json = $request->input('per', null);
        $concep = Ahorro::find($id)->load('conceptoahorro');
        $data = array ('ahorro' => $concep,
        'status' => 'success');
        return response()->json($data,200);
     }
}