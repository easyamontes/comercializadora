<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class almacen extends Model
{
    //
    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function requisicion(){
        return $this->belongsto('App\requisicion','requisicion_id');
    }

}
