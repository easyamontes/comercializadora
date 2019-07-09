<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
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

      /*======================================================================
         FUNCION PARA TRAER TODOS LOS FONDOS DE AHORRRO
    ====================================================================== */
    public function listastatus(Request $request)
    {
     
        $json = $request->input('json',null);
        $params = json_decode ($json);
        $per = $json = $request->input('per', null);
        $socio = $params->socio;     
        $inicio = $params->inicio;
        $dateinicio = str_replace('/','-',$inicio);
        $dateinicio = date('Y-m-d',strtotime($dateinicio));
        $final = $params->final;
        $datefinal = str_replace('/','-',$final);
        $datefinal = date('Y-m-d',strtotime($datefinal));
        if($socio == "" and $inicio != '' and $final != ''){
            $pedido = Pedido::select('*')
            ->where('user_id','=',$socio)
            ->where( 'fechapedido','>=',$dateinicio)->where('fechapedido','<=',$datefinal)
            ->where('tipo', '=', 'ENTRADA')
            ->where('status', '=','SIN PAGAR')
            ->orderby('nombre')
            ->orderby('fechapedido')
            ->get();
        }else if 

        ( $socio != "" and $inicio == "" and $final == "")
        {
            $ahorro = Ahorro::selectRaw('*')
            ->where('status','=',$socio)
            ->get();
        }else if
        ($socio != "" and $inicio != "" and $final != "")
        {
            $ahorro = Ahorro::select('*')
            ->where('status','=',$socio)
            ->where( 'fechapedido','>=',$dateinicio)
            ->where('fechapedido','<=',$datefinal)
            ->get()->load('user');
        }
        return response()->json(array(
            'statusahorro' => $ahorro,
            'status' => 'success'
        ), 200);
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