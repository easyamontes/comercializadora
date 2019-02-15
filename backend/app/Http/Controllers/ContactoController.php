<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Contacto;

class ContactoController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request){
        $contacto = Contacto::all()->load('user');
        $nop = $contacto->count();
        return response()->json(array(
            'contactos' => $contacto,
            'status' => 'success'
        ),200);
    }

    public function store (Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        $user = $json = $request->input('userid',null);
        $cleanid = array();
        foreach ($params_array as $item) {
            array_push($cleanid,$item['id']);
            $idprove = $item['proveedor_id'];
            if ($item['id'] < 1) {
                $contacto = new Contacto();
                $contacto->user_id = $user;
                $contacto->proveedor_id = $item['proveedor_id'];
                $contacto->nombre = $item['nombre'];
                $contacto->numero = $item['numero'];
                $contacto->tipo = $item['tipo'];
                $contacto->save();
                array_push($cleanid,$contacto['id']);
            }else {
                $contacto = Contacto::where('id',$item['id'])->update($item);
            }
        }
        $contacto = Contacto::where('proveedor_id','=',$idprove)->whereNotIn('id', $cleanid)->delete();
        $data = array(
            'contacto' => $contacto,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data,200);
    }
    
}//EndClass