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
    public function proveedor(){
        return $this->belongsto('App\Contacto','proveedor_id');
    }
}
