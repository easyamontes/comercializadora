<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Premio extends Model
{
    //
    protected $table  = 'premio';
    protected $fillable = ['oficina_id'];

    //relacion con usuario
    public function user(){
        return $this->belongsto('App\User','user_id');
    }
}
