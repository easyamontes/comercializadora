<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use App\Personal;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function puesto(){
        return $this->belongsto('App\Personal','puesto_id');
    }

    public function persona(){
        return $this->belongsto('App\User','personal_id');
    }
    
}//End class
