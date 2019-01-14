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
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('puesto_id');
            $table->char('nombre',255);
            $table->char('apellidop',255);
            $table->char('apellidom',255);
            $table->char('email',255);
            $table->char('calle',255);
            $table->char('noint',255);
            $table->char('noext',255);
            $table->char('colonia',255);
            $table->char('estado',255);
            $table->char('ciudad',255);
            $table->char('cp',255);
            $table->string('descripcion');
            $table->char('status',255);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('puesto_id')->references('id')->on('puesto');
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
