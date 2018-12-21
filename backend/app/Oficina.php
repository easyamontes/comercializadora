<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    //
    protected $table  = 'oficina';

    //relacion con usuario
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
