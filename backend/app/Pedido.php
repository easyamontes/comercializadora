<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{    
     //
    protected $table  = 'pedido';
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}