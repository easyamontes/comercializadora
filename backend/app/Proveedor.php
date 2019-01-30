<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    //

    protected $table  = 'proveedor';

    public function user(){
        return $this->belongsto('App\User','user_id');
    }
    public function contactos(){
        return $this->hasMany('App\Contacto','proveedor_id');
    }
}
