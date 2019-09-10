<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConceptoahorroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conceptoahorro', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('nombre')->nullable();
            $table->string('concepto')->nullable();
            $table->integer('personal_id')->nullable();
            $table->date('fechadia')->nullable();
            $table->decimal('montoventa',10,2)->nullable();
            $table->decimal('ahorrodia',10,2)->nullable();
            $table->string('status')->nullable()->default('SIN PAGAR');
            $table->string('tipo')->nullable()->default('I');
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
        Schema::dropIfExists('conceptoahorro');
    }
}