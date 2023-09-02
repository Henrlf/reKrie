<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class T2001 extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('grupo', function (Blueprint $table)
        {
            $table->id();
            $table->string('nome', 255);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate();
        });
    }

    /**
     * @return void
     */
    public function down() {}

}
