<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produto', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idMaterial')
                ->constrained('material')
                ->cascadeOnUpdate();

            $table->string('nome', 255);
            $table->text('descricao');
            $table->text('imagem');
            $table->decimal('largura', 10)->default(0);
            $table->decimal('altura', 10)->default(0);
            $table->decimal('comprimento', 10)->default(0);
            $table->decimal('peso', 10)->nullable();
            $table->integer('saldoEstoque')->default(0);
            $table->decimal('valor', 10)->default(0);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto');
    }
};
