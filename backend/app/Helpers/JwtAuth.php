<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth{

    public $key;

    //crea una llave unica para el token
    public function __construct(){
        $this->key = 'Esta-es-mi-clave-secreta-5413543543543';
    }

    //generando el token a partir de la llamada 
    public function signup($email, $password, $getToken=null){
        $user = User::where(
                            array(
                                'email' => $email,
                                'password' => $password
                            ))->first();

        //comprobando el usuario en la base de datos
        $signup = false;
        if(is_object($user)){
            $signup = true;
        }
        if($signup){
            
            //Generando el token y debolverlo
            $token = array(
                'status' => 'success',
                'sub' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'iat' => time(),
                'exp' => time() + (1 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token,$this->key,'HS256');
            $decode = JWT::decode($jwt, $this->key, array('HS256'));
            
            if(is_null($getToken)){
                return $jwt;
            }else{
                return $decode;
            }


        }else{
            //devolver el error

            return array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El Login ah fallado'
                );
        }

    }

    //verifica la valides y identidad del token enviado
    public function checkToken($jwt, $getIdentity = false){
        $auth = false;
        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
        }catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        } catch (\SignatureInvalidException $e) {
            $auth = false;
        }

        if( isset($decoded) && is_object($decoded) && isset($decoded->email)){
            $auth = true;
        }else{
            $auth = false;
        }

        if($getIdentity){
            return $decoded;
        }
        return $auth;
    }

}
