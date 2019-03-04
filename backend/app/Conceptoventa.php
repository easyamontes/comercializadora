<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conceptoventa extends Model
{
    //

    protected $table  = 'conceptoventa';
    protected $fillable = ['articulo_id','proveedor_id','pedido_id'];

    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
