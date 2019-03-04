<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConceptoventaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conceptoventa', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('pedido_id');
            $table->unsignedInteger('proveedor_id');
            $table->unsignedInteger('articulo_id');
            $table->string('codigo');
            $table->string('articulo');
            $table->string('marca');
            $table->string('modelo');
            $table->integer('cantidad');
            $table->integer('precio');
            $table->integer('precioventa');
            $table->integer('impuesto');
            $table->integer('total');
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
        Schema::dropIfExists('conceptoventa');
    }
}
