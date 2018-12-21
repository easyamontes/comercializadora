<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Puesto extends Model
{
    //
    protected $table  = 'puesto';

    //relacion con usuario
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
