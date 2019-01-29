<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacto', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('personal_id')->nullable();
            $table->unsignedInteger('proveedor_id')->nullable();
            $table->string('nombre');
            $table->string('tipo');
            $table->string('numero');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('personal_id')->references('id')->on('personal');
            $table->foreign('proveedor_id')->references('id')->on('proveedor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacto');
    }
}
