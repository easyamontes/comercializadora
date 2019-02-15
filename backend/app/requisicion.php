<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class requisicion extends Model
{
    //
    protected $table ='requisicion';
    
    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function porigen(){
        return $this->hasOne('App\perosnal','porigen_id');
    }

    public function pdestino(){
        return $this->hasOne('App\perosnal','pdestino_id');
    }

}//END CLASS 