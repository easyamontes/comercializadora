<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deposito extends Model
{
    protected $table  = 'deposito';

    public function user(){
        return $this->belongsto('App\User','user_id');
    }

    public function banco(){
        return $this->belongsTo('App\Banco','banco_id');
    }

    public function requisicion(){
        return $this->belongsTo('App\Requisicion','requisicion_id');
    }
}