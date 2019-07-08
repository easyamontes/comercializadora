<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AhorroController extends Controller
{
    public function __construct()
    {
        $this->middleware('islogged');
    }
}