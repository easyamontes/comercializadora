<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conceptoahorro extends Model
{
    protected $table = 'conceptoahorro';
    
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
