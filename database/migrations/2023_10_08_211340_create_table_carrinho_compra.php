<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carrinhoCompra', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idUsuario')->constrained('users')->cascadeOnUpdate();
            $table->foreignId('idProduto')->constrained('produto')->cascadeOnUpdate();
            $table->integer('quantidade')->default(1);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carrinhoCompra');
    }
};
