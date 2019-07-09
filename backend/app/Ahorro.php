<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ahorro extends Model
{
    protected $table  = 'ahorro';

    
    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function conceptoahorro(){
        return $this->belongsto('App\Conceptoahorro','id_ahorro');
    }
}
