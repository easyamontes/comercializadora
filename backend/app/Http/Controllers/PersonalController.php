<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Personal;

class PersonalController extends Controller
{
    //llamando al middelware
    public function __construct()
    {
        $this->middleware('islogged');
    }
    /** Funcion para regresar un listado de empleados */
    public function index(Request $request){
        $personal = Personal::all()->load('user');
        return response()->json(array(
            'personal' => $personal,
            'status' => 'success'
        ),200);
    }

    /**Funcion para Guardar en el registro */
    public function store( Request $request ){
        //recogiendo variables que vienen del Call post
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        $user = $json = $request->input('userid',null);
        $personal = new Personal();
         
        //asignando informacion al objeto puesto
        $personal->nombre = $params->nombre;
        $personal->apellidop = $params->apellidop;
        $personal->apellidom = $params->apellidom;
        $personal->user_id = $user;
        $personal->noint = $params->noint;
        $personal->noext = $params->noext;
        $personal->colonia = $params->colonia;
        $personal->estado = $params->estado;
        $personal->ciudad = $params->ciudad;
        $personal->cp = $params->cp;
        $personal->status = $params->status;
        //metiendo a la base de datos
        $personal->save();
        $data = array(
            'personal' => $personal,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    public function update ($id, Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true); 
        $personal = new Personal();

        //limienado array
        unset($params_array['id']);
        unset($params_array['user_id']);
        unset($params_array['created_at']);
        unset($params_array['user']);
    
        //Actualizando el registro
        $personal = Personal::where('id',$id)->update($params_array);
        $data = array(
            'personal' => $params,
            'code' => 200,
            'status' => 'success'
        );
        return response()->json($data,200);
    }

    public function destroy($id, Request $request){
        $personal = Personal::find($id);
        $personal->delete();
        $data = array(
            'personal' => $personal,
            'status' => 'success',
            'code' => 200
        );
    }

    public function show($id, Request $request){
        $personal = Personal::find($id);
        if(is_object($personal)){
            $personal = Puesto::find($id)->load('user');
            return response()->json(array(
                'personal' => $personal,
                'status' => 'success'
            ),200);
        }else{
            return response()->json(array(
                'message' => 'No se encuentra el registro',
                'status' => 'error'
            ),400);
        }
    }

}//End Class