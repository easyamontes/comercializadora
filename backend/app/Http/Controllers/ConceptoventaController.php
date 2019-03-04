<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Conceptoventa;

class ConceptoventaController extends Controller
{
    public function __construct()
    {
      $this->middleware('islogged');
    }

    public function store (Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        $user = $json = $request->input('userid',null);
        $cleanid = array();
        foreach ($params_array as $item) {
            array_push($cleanid,$item['id']);
            $idpedido = $item['pedido_id'];
            if ($item['id'] < 1) {
                $conceptoventa = new Conceptoventa();
                $conceptoventa->user_id = $user;
                $conceptoventa->pedido_id = $item['pedido_id'];
                $conceptoventa->codigo = $item['codigo '];
                $conceptoventa->marca = $item['marca'];
                $conceptoventa->save();
                array_push($cleanid,$conceptoventa['id']);
            }else {
                $conceptoventa = Conceptoventa::where('id',$item['id'])->update($item);
            }
        }
        $conceptoventa = Conceptoventa::where('pedido_id','=',$idpedido)->whereNotIn('id', $cleanid)->delete();
        $data = array(
            'contacto' => $conceptoventa,
            'code' => 200,
            'satus' => 'success'
        );
        return response()->json($data,200);
    }

}

?>