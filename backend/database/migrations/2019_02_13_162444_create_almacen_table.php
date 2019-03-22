<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        //
        Schema::create('almacen', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('requisicion_id')->nullable();
            $table->unsignedInteger('proveedor_id')->nullable();
            $table->unsignedInteger('articulo_id')->nullable();
            $table->string('codigo');
            $table->string('articulo');
            $table->string('marca');
            $table->string('modelo');
            $table->integer('cantidad');
            $table->integer('costo')->nullable();
            $table->integer('precio');
            $table->integer('existencia')->nullable();
            $table->integer('total');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        //
        Schema::dropIfExists('almacen');
    }
}//End Class
