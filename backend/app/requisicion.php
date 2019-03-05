<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Requisicion extends Model
{
    //
    protected $table ='requisicion';
    
    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function articulos(){
        return $this->hasMany('App\Almacen','requisicion_id');
    }


    public function porigen(){
        return $this->hasOne('App\perosnal','porigen_id');
    }

    public function pdestino(){
        return $this->hasOne('App\perosnal','pdestino_id');
    }

}//END CLASS 