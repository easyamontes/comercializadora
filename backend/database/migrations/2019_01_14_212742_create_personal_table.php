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
            $table->string('noext')->nullable();
            $table->string('colonia');
            $table->string('estado');
            $table->string('ciudad');
            $table->string('cp');
            $table->string('descripcion');
            $table->string('status');
            $table->string('oficina');
            $table->string('nacimiento')->nullable();
            $table->string('telefono')->nullable();
            $table->timestamps();
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
