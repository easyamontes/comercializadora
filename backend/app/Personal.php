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
    //relacion con puestos
    public function puesto(){
        return $this->belongsto('App\Personal','puesto_id');
    }
    
    public function usuario(){
        return $this->belongsto('App\User','id','personal_id');
    }

    public function hijos(){
        return $this->hasMany('App\Personal', 'personal_id', 'id');
    }

    public function familia(){
        return $this->hijos()->with('familia');
    }

}
