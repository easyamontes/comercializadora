<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Deposito;
use App\Requisicion;
use Illuminate\Support\Facades\DB;

class DepositoController extends Controller
{
    public function __construct()
    {
        $this->middleware('islogged');
    }


    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $user = $request->input('userid', null);
        $deposito = new Deposito();
        $deposito->user_id = $user;
        $deposito->banco_id = $params->banco_id;
        $deposito->requisicion_id = $params->requisicion_id;
        $deposito->importe = $params->importe;
        $deposito->transferencia = $params->transferencia;
        $deposito->comentarios = $params->comentarios;
        $deposito->ftransferencia = $params->ftransferencia;
        $deposito->fventa = $params->fventa;
        $deposito->save();
        $deposito->load('requisicion');
        $xpagar = $deposito->requisicion->xpagar - $deposito->importe;
        Requisicion::where('id','=',$deposito->requisicion_id)
            ->update(['xpagar'=>$xpagar]);
        $data = array(
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $depositos = Deposito::where('requisicion_id', '=', $id)->get()
            ->load('banco');
        $data = array(
            'depositos' => $depositos,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $deposito = Deposito::find($id);
        if (is_object($deposito)) {
            $deposito->importe = $params->importe;
            $deposito->status = 'APROBADO';
            $deposito->save();
            $this->updateRequisicion($deposito->requisicion_id);
            $data = array(
                'message' => 'registro modificado correctamente',
                'code' => 200,
                'status' => 'success'
            );
        } else {
            $data = array(
                'message' => 'No se encontro el registro',
                'code' => 400,
                'status' => 'Error'
            );
        }

        return response()->json($data, 200);
    }


    public function destroy($id)
    {
        $deposito = Deposito::find($id);
        $idRequi = $deposito->requisicion_id;
        if (is_object($deposito)) {
            $deposito->delete();
            $this->updateRequisicion($idRequi);
            $deposito = Deposito::where('requisicion_id', '=', $idRequi)->get()
                ->load('banco');
            $data = array(
                'depositos' => $deposito,
                'message' => 'registro eliminado correctamente',
                'code' => 200,
                'status' => 'success'
            );
        } else {
            $data = array(
                'message' => 'No se encontro el registro',
                'code' => 400,
                'status' => 'Error'
            );
        }
        return response()->json($data, 200);
    }

    public function updateRequisicion($requiD){
        $simporte = DB::table('deposito') 
                ->where([['requisicion_id','=',$requiD],['status','=','APROBADO']])
                ->sum('importe');
        $val = Requisicion::find($requiD);
        $xpagar = $val->importe - $simporte;
        if( $xpagar === 0.00 ){
            Requisicion::where('id','=',$requiD)
            ->update(['xpagar'=>$xpagar , 'statuspago'=>'PAGADO']);
        }else{
            Requisicion::where('id','=',$requiD)
            ->update(['xpagar'=>$xpagar]);
        }
    }
}
