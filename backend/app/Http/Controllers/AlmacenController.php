<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Almacen;

class AlmacenController extends Controller
{
    //
    public function index(Request $request){
        $user = $json = $request->input('userid',null);
        $requisicion= DB::table('almacen');
        return response()->json(array(
            'requisicion' => $requisicion,
            'status' => 'success'
        ),200);
    }
}
