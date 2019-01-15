<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    //
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
