<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePremioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('premio', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('oficina_id');
            $table->unsignedInteger('user_id');
            $table->string('nombre');
            $table->string('rinicio');
            $table->string('rfinal');
            $table->string('periodo');
            $table->string('descripcion');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign ('oficina_id')->references('id')->on('oficina');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('premio');
    }
}
