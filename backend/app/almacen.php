<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    //

    protected $table  = 'almacen';

    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function requisicion(){
        return $this->belongsto('App\requisicion','requisicion_id');
    }

    public function proveedor(){
        return $this->belongsto('App\proveedor','proveedor_id');
    }

}
