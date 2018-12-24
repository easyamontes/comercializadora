<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//importando soporte para base de datos
use Illuminate\Support\Facades\DB;
use App\User;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    /**funcion para registrar usuarios  */
    public function register( Request $request ){
        //recogiendo variables que vienen del Call post
        $json = $request->input('json',null);
        // codificando variable en objeto PHP
        $params = json_decode($json);
        // Desglosando el desmadre
        $email = (!is_null($json) && isset($params->email)) ? $params->email : null; 
        $name = (!is_null($json) && isset($params->name)) ? $params->name : null;
        $surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
        $role = 'ROLE_USER';
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;

        //comprobando existencia de datos basicos
        if(!is_null($email) && !is_null($password) && !is_null($name)){
            // Creando usuario
            $user = new User();
            $user->email = $email;
            $user->name = $name;
            $user->surname = $surname;
            $user->role = $role;
            // Sifrando/ocultado contraseña
            $pwd = hash('sha256',$password);
            $user->password = $pwd;

            //comprobando exisencia en la bace de datos
            $isset_user = User::where('email','=',$email)->count();
        

            if($isset_user == 0 ){
                //Guardando usuario en la base de datos
                $user->save();
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario registrado correctamnete'
                );
            }else{
                //ya existe el usuario
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El usuario ya existe'
                );
            }


        }else{
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'usiario no creado'
            );
        }

        return response()->json($data,200);

    }

    //Logieando Usuarios
    public function login( Request $request ){
        $jwtAuth = new JwtAuth();

        //recibiendo los datos del post
        $json = $request->input('json',null);
        $params = json_decode($json);
      

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;
        //cifrando la contraseña
        $pwd = hash('sha256',$password);
        //Verificando existencia de los datos traidos desde post
        if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false')){
            $signup = $jwtAuth->signup($email,$pwd);
        }elseif($getToken != null){
            $signup = $jwtAuth->signup($email,$pwd,$getToken);
        }else{
            $signup = array(
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'MANDAR LOS DATOS POR POST'
                        );
        }
        return response()->json($signup,200);

    }

    //comprobando valides del tokken
    public function logged(Request $request){
        $data = array(
            'message' => 'Wllcome Back',
            'code' => 200,
            'status' => 'logged'
        );
        return response()->json($data,200);
    }
}// END CLASS