<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedido', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->date('fechapedido');
            $table->integer('importe');
            $table->integer('pdestino');
            $table->string('nombre');
            $table->string('tipo');
            $table->string('premio');
            $table->integer('semana');
            $table->string('dia');
            $table->string('año');
            $table->integer('porcentaje');
            $table->integer('ahorro');
            $table->integer('pagomulta');
            $table->string('status');
            $table->date('fechapago');
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
        //
        Schema::dropIfExists('pedido');
    }
}