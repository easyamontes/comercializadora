<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Puesto;

class PuestoController extends Controller
{
    //llamando al middelware de login
    public function __construct()
    {
        $this->middleware('islogged');
    }

    //creando el listado de los puestos existentes
    public function index(Request $request)
    {
        $puesto = Puesto::all()->load('user');
        $nop = $puesto->count();
        return response()->json(array(
            'code' => 200,
            'puestos' => $puesto,
            'status' => 'success'
        ), 200);
    }

    //Guardando puestos en la base de datos
    public function store(Request $request)
    {
        //recogiendo variables que vienen del Call post
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid', null);
        $puesto = new Puesto();
        //validando datos de la peticion
        $validate = \Validator::make($params_array, [
            'puesto' => 'required|min:4',
            "descripcion" => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        //asignando informacion al objeto puesto
        $puesto->puesto = $params->puesto;
        $puesto->user_id = $user;
        $puesto->nivel = $params->nivel;
        $puesto->descripcion = $params->descripcion;
        //metiendo a la base de datos
        $puesto->save();
        $data = array(
            'puesto' => $puesto,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $puesto = new Puesto();

        //validando datos de la peticion
        $validate = \Validator::make($params_array, [
            'puesto' => 'required|min:4',
            "nivel" => 'required|unique:puesto,id,' . $params->id,
            "descripcion" => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }
        //limienado array
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);

        //Actualizando el registro
        $puesto = Puesto::where('id', $id)->update($params_array);
        $data = array(
            'puesto' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data, 200);
    }

    public function destroy($id, Request $request)
    {
        $puesto = Puesto::find($id);
        $puesto->delete();
        $data = array(
            'puesto' => $puesto,
            'status' => 'success',
            'code' => 200
        );
    }

    public function show($id, Request $request)
    {
        $puesto = Puesto::find($id);
        if (is_object($puesto)) {
            $puesto = Puesto::find($id)->load('user');
            return response()->json(array(
                'puesto' => $puesto,
                'status' => 'success'
            ), 200);
        } else {
            return response()->json(array(
                'message' => 'No se encuentra el registro',
                'status' => 'error'
            ), 400);
        }
    }
}//End Class
