<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Pedido;
use App\Almacen;

class PedidoController extends Controller
{

    public function __construct()
    {
        $this->middleware('islogged');
    }

    /* =====================================================
       lista de pedidos con status salida
     ======================================================*/ 
    public function index(Request $request){
        $user = $request->input('userid', null);
        $pedido = Pedido::where('tipo','=','SALIDA')
                        ->where('user_id','=',$user)
                        ->get()->load('user');
        return response()->json(array(
        'pedidos' => $pedido,
        'status' => 'success'
       ),200);
    }

    /* =====================================================
       CREAR PEDIDOS (REGISTRO)
     ======================================================*/ 
    public function store ( Request $request)
    {
       $json = $request->input('json',null);
       $params = json_decode($json);
       $params_array = json_decode($json,true);
       $user = $json = $request->input('per',null);
       $exist = Pedido::where('pdestino','=',$params->pdestino)
                      ->where('tipo','=','SALIDA')->count();
       if ($exist > 0) {
        $data = array(
            'error' => 'Este promotor ya cuenta con una hoja de pedido activa',
            'code' => 500,
            'status' =>'error'
       );
       return response()->json($data,200);
       }
       $pedido = new Pedido();
       //sacar el numero de samana
       $fecha = substr($params->fechapedido,0,10);
       $dia = substr($fecha,8,2);
       $mes = substr($fecha,5,2);
       $anio = substr($fecha,0,4);
       $semana = date('W',  mktime(0,0,0,$mes,$dia,$anio));
       //PONER EL NOMBRE DEL DIA 
       $texto = $this->getdia($fecha);
      //asignando informacion al objeto
       $pedido->user_id = $user;
       $pedido->id = $params->id;
       $pedido->fechapedido = $fecha;
       $pedido->importe = $params->importe;
       $pedido->pdestino = $params->pdestino;
       $pedido->nombre = $params->nombre;
       $pedido->tipo = $params->tipo;
       $pedido->semana = $semana;
       $pedido->año = $anio;
       $pedido->dia = $texto;
       $pedido->save();
       $data = array(
            'pedido' => $pedido,
            'code' => 200,
            'status' =>'success'
       );
       return response()->json($data,200);
    }
    
    public function destroy($id, Request $request){
        $conceptoventa = Pedido::find($id);
        $conceptoventa->delete();
        $data = array(
            'pedido' => $conceptoventa,
            'status' => 'success',
            'code' => 200
        );
    }
     /* =====================================================
       funcion para mostrar un solo registro
     ======================================================*/ 

    public function show ($id,Request $request)
    {
        $pedido = Pedido::find($id);
        if (is_object($pedido)){
            $pedido = Pedido::find($id)
            ->load('articulos');
            return response()->json(array(
                'pedido' => $pedido,
                'status' =>'success'
            ),200);

        }else{
            return response()->json(array(
                'message' =>'no se encuentra registro',
                'status' => 'error'
            ),400);
        }//emd else
    }//end mostrar un solo registro

     /* =====================================================
       funcion para actualizar registro
     ======================================================*/ 

    public function update ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $pedido = new Pedido();
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);
        unset($params_array['articulos']);
        $pedido = Pedido::where('id',$id)->update($params_array);
        $data = array(
            'pedido' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }


    public function ventacambaceo(Request $request)
    {   
        $per = $json = $request->input('per', null);
        $idp = Pedido::select('id')
        ->where('tipo','=','SALIDA')
        ->where('pdestino', '=', $per)
        ->get()->load('articulos');
        return response()->json(array(
            'almacen' => $idp,
            'status' => 'success'
        ), 200);
    }

    /*======================================================================
       LISTA DE REPORTE DE PREMIO VENDIDO POR EL SOCIO 
    ====================================================================== */
    public function premio(Request $request)
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
            ->where('user_id','=',$per)
            ->where( 'fechapedido','>=',$dateinicio)->where('fechapedido','<=',$datefinal)
            ->where('tipo', '=', 'ENTRADA')
            ->orderby('nombre')
            ->orderby('fechapedido')
            ->get();
        }else if 
        ( $socio != "" and $inicio == "" and $final == "")
        {
            $pedido = Pedido::select('*')
            ->where('user_id','=',$per)
            ->where( 'pdestino','=',$socio)
            ->where('tipo', '=', 'ENTRADA')
            ->orderby('fechapedido')
            ->get();
        }else if
        ($socio != "" and $inicio != "" and $final != "")
        {
            $pedido = Pedido::select('*')
            ->where('user_id','=',$per)
            ->where( 'pdestino','=',$socio)
            ->where( 'fechapedido','>=',$dateinicio)
            ->where('fechapedido','<=',$datefinal)
            ->where('tipo', '=', 'ENTRADA')
            ->orderby('nombre','fechapedido')
            ->get();
        }
        return response()->json(array(
            'pedidoall' => $pedido,
            'status' => 'success'
        ), 200);
    }

        /*======================================================================
       LISTA PARA SELECCIONAR LOS PEDIDOS PARA LA CAJA DE AHORRO
    ====================================================================== */
    public function listaahorro(Request $request)
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
            $pedido = Pedido::selectRaw('*,SUM(importe) AS importe , SUM(ahorro) AS ahorro')
            ->where('user_id','=',$socio)
            ->where('tipo', '=', 'ENTRADA')
            ->where('status', '=','SIN PAGAR')
            ->groupBy('user_id')
            ->groupBy('fechapedido')
            ->orderby('fechapedido')
            ->get();
        }else if
        ($socio != "" and $inicio != "" and $final != "")
        {
            $pedido = Pedido::select('*')
            ->where('user_id','=',$socio)
            ->where( 'fechapedido','>=',$dateinicio)
            ->where('fechapedido','<=',$datefinal)
            ->where('tipo', '=', 'ENTRADA')
            ->where('status', '=','SIN PAGAR')
            ->orderby('nombre','fechapedido')
            ->get()->load('user');
        }
        return response()->json(array(
            'ahorroall' => $pedido,
            'status' => 'success'
        ), 200);
    }


    /*======================================================================
         FUNCION DE DIA DE LA SEMANA
    ====================================================================== */
    function getdia ($fecha){
        $fechas = date("N",strtotime($fecha));//pasamos a timestamp
        switch ($fechas){
            case "1":
            $texto = "LUNES";
            break;  
            case "2":
            $texto = "MARTES";
            break;
            case "3":
            $texto = "MIERCOLES";
            break;
            case "4":
            $texto = "JUEVES";
            break;
            case "5":
            $texto = "VIERNES";
            break;
            case "6":
            $texto = "SABADO";
            break;
            case "7":
            $texto = "DOMINGO";
            break;
            }
          return $texto;
    }
    

}

?>

