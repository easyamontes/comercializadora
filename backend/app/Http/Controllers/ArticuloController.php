<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Articulo;

class ArticuloController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('islogged');
    }

    public function index(Request $request){
        $articulo = Articulo::All()->load('user');
        return response()->json(array(
            'articulos' => $articulo,
            'status' => 'success'
        ),200);
    }

}//EndClass
