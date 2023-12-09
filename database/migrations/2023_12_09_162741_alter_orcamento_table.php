<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orcamento', function (Blueprint $table)
        {
            $table->foreignId('idMaterial')->constrained('material')->cascadeOnUpdate();
            $table->decimal('largura', 10)->default(0);
            $table->decimal('altura', 10)->default(0);
            $table->decimal('comprimento', 10)->default(0);
            $table->decimal('peso', 10)->nullable();
        });

        Schema::drop('orcamentoProduto');
    }

    public function down(): void {}
};
