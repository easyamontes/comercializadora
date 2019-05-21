<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('puesto_id');
            $table->unsignedInteger('personal_id')->nullable();
            $table->string('nombre');
            $table->string('apellidop');
            $table->string('apellidom');
            $table->string('email');
            $table->string('calle');
            $table->string('noint');
            $table->string('noext');
            $table->string('colonia');
            $table->string('estado');
            $table->string('ciudad');
            $table->string('cp');
            $table->string('descripcion');
            $table->string('status');
            $table->string('oficina');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('puesto_id')->references('id')->on('puesto');
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
        Schema::dropIfExists('personal');
    }
}
