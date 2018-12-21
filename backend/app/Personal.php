<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    //
    protected $table  = 'personal';

    //relacion con usuario
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
