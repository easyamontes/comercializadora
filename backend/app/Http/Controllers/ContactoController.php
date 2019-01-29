<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Contacto;

class ContactoController extends Controller
{
    //
    public function index(Request $request){
        $contacto = Contacto::all()->load('user');
        $nop = $contacto->count();
        return response()->json(array(
            'proveedores' => $contacto,
            'status' => 'success'
        ),200);
    }

    
}
