<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Requisicion;

class RequisicionControler extends Controller
{
    //
    public function index(Request $request){
        $requisicion = Requisicion::All()->load('user');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success'
        ),200);
    }
}