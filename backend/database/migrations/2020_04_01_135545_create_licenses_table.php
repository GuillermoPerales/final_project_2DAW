<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLicensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('licenses', function (Blueprint $table) {
            $table->id('license_key');
            /* $table->integer('user_id')->unsigned();
            $table->integer('product_id')->unsigned(); */
            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->constrained();

            $table->string('name');
            $table->date('activation_date');
            $table->date('expiration_date');
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
        Schema::dropIfExists('licenses');
    }
}
