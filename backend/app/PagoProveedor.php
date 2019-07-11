<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PagoProveedor extends Model
{
    protected $table = 'pagoproveedor';

    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function proveedor(){
        return $this->belongsto('App\Proveedor','proveedor_id');
    }
    
}
