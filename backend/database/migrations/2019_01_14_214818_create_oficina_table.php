<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOficinaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oficina', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('personal_id');
            $table->string('nombre');
            $table->string('encargado');
            $table->string('descripcion');
            $table->string('calle');
            $table->string('noint');
            $table->string('noext');
            $table->string('colonia');
            $table->string('estado');
            $table->string('ciudad');
            $table->string('cp');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('personal_id')->references('id')->on('personal');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oficina');
    }
}
