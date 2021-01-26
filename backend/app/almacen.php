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

    public function personal(){
        return $this->belongsto('App\Personal','userp_id');
    }

    public function requisicion(){
        return $this->belongsto('App\Requisicion','requisicion_id');
    }

    public function proveedor(){
        return $this->belongsto('App\Proveedor','proveedor_id');
    }

    public function articulo(){
        return $this->belongsTo('App\Articulo','articulo_id');
    }

}
