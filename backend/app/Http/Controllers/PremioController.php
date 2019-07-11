<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Premio;

class PremioController extends Controller
{
    public function __construct()
    {
        $this->middleware('islogged');
    }
    //lista de premios en el sistema
    public function index(Request $request)
    {  //= premio(nombre del http que se creo para premio)
        $premio = Premio::all()->load('user');
        return response()->json(array(
            'premio' => $premio,
            'status' => 'success'
        ), 200);
    } //end function index

    //function para poder guadar los datos en la base
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid', null);
        $premio = new Premio();
        //asignando informacion al objeto
        $premio->user_id = $user;
        $premio->nombre = $params->nombre;
        $premio->rinicio = $params->rinicio;
        $premio->rfinal = $params->rfinal;
        $premio->periodo = $params->periodo;
        $premio->descripcion = $params->descripcion;
        $premio->save();
        $data = array(
            'premio' => $premio,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    /** Updateando registro */
    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $premio = new Premio();

        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);

        $premio = Premio::where('id', $id)->update($params_array);
        $data = array(
            'premio' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    /**Eliminar Registro */
    public function destroy($id, Request $request)
    {
        $premio = Premio::find($id);
        $premio->delete();
        $data = array(
            'premio' => $premio,
            'status' => 'success',
            'code' => 200
        );
    }

    /**Mostrar un registro */
    public function show($id, Request $request)
    {
        $premio = Premio::find($id);
        if (is_object($premio)) {
            $premio = Premio::find($id)->load('user');
            return response()->json(array(
                'premio' => $premio,
                'status' => 'success'
            ), 200);
        } else {
            return response()->json(array(
                'message' => 'No se encuentra el registro',
                'status' => 'error'
            ), 400);
        }
    }
}//end class
