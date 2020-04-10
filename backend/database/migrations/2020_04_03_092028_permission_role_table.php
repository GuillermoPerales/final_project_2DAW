<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PermissionRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permission_role', function (Blueprint $table) {
         /*  $table->integer('permission_id')->unsigned();
          $table->integer('role_id')-unsigned(); */
          $table->foreignId('permission_id')->constrained();
          $table->foreignId('role_id')->constrained();
          /* $table->foreign('permission_id')->references('id')->on('permissions');
          $table->foreign('role_id')->references('id')->on('roles'); */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permission_role');
    }
}
