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
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('personal_id');
            $table->char('nombre',255);
            $table->char('encargado',255);
            $table->string('descripcion');
            $table->char('calle',255);
            $table->char('noint',255);
            $table->char('noext',255);
            $table->char('colonia',255);
            $table->char('estado',255);
            $table->char('ciudad',255);
            $table->char('cp',255);
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
