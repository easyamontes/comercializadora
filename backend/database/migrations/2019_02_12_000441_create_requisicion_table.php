<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequisicionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        //
        Schema::create('requisicion', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('idalmacen')->nullable();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('porigen_id')->nullable();
            $table->unsignedInteger('pdestino_id')->nullable();
            $table->unsignedInteger('proveedor_id')->nullable();
            $table->integer('folio');
            $table->string('tipo');
            $table->string('status');
            $table->decimal('importe',10,2);
            $table->decimal('xpagar',10,2);
            $table->date('fecha');
            $table->string('factura');
            $table->date('ffactura');
            $table->string('divisa');
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
        Schema::dropIfExists('requisicion');
    }
}
