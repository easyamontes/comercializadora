<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('proveedor', function (Blueprint $table){
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('nombre');
            $table->string('razonSocial');
            $table->string('calle');
            $table->string('noint');
            $table->string('noext');
            $table->string('colonia');
            $table->string('estado');
            $table->string('ciudad');
            $table->string('cp');
            $table->string('telefono');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('proveedor');
    }
}
