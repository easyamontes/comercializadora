<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Banco extends Model
{
    //
    protected $table  = 'banco';

    //relacion con usuario
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
