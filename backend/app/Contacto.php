<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    //

    protected $table  = 'contacto';
    protected $fillable = ['personal_id','proveedor_id'];

    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
