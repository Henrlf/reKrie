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
        Schema::table('users', function (Blueprint $table)
        {
            $table->foreignId('idGrupo')->after('id')->constrained('grupo')->cascadeOnUpdate();
            $table->string('cpf', 11)->after('name');
            $table->string('telefone', 20)->nullable()->after('cpf');
            $table->tinyInteger('situacao')->default(1)->after('remember_token');
        });

        Schema::table('pedido', function (Blueprint $table)
        {
            $table->dropConstrainedForeignId('idUsuario');
        });

        Schema::table('endereco', function (Blueprint $table)
        {
            $table->dropConstrainedForeignId('idUsuario');
        });

        Schema::table('orcamento', function (Blueprint $table)
        {
            $table->dropConstrainedForeignId('idUsuario');
        });

        Schema::table('pedido', function (Blueprint $table)
        {
            $table->foreignId('idUsuario')->after('id')->constrained('users')->cascadeOnUpdate();
        });

        Schema::table('endereco', function (Blueprint $table)
        {
            $table->foreignId('idUsuario')->after('id')->constrained('users')->cascadeOnUpdate();
        });

        Schema::table('orcamento', function (Blueprint $table)
        {
            $table->foreignId('idUsuario')->after('id')->constrained('users')->cascadeOnUpdate();
        });

        Schema::drop('usuario');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
