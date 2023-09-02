<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class T2002 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idGrupo')
                ->constrained('grupo')
                ->cascadeOnUpdate();

            $table->string('nome', 255);
            $table->string('email', 255);
            $table->string('senha', 255);
            $table->string('cpf', 11);
            $table->string('telefone', 20)->nullable();
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('endereco', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idUsuario')
                ->constrained('usuario')
                ->cascadeOnUpdate();

            $table->string('endereco', 255);
            $table->integer('numero');
            $table->string('complemento', 255)->nullable();
            $table->string('uf', 2);
            $table->string('cidade', 255);
            $table->string('bairro', 255);
            $table->string('cep', 9);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('material', function (Blueprint $table)
        {
            $table->id();
            $table->string('nome', 255);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('orcamento', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idUsuario')
                ->constrained('usuario')
                ->cascadeOnUpdate();

            $table->text('descricao');
            $table->decimal('valor', 10)->default(0);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('orcamentoProduto', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idOrcamento')
                ->constrained('orcamento')
                ->cascadeOnUpdate();

            $table->foreignId('idMaterial')
                ->constrained('material')
                ->cascadeOnUpdate();

            $table->decimal('largura', 10)->default(0);
            $table->decimal('altura', 10)->default(0);
            $table->decimal('comprimento', 10)->default(0);
            $table->decimal('peso', 10)->nullable();
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

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

        Schema::create('pedido', function (Blueprint $table)
        {
            $table->id();

            $table->foreignId('idUsuario')
                ->constrained('usuario')
                ->cascadeOnUpdate();

            $table->foreignId('idEndereco')
                ->constrained('endereco')
                ->cascadeOnUpdate();

            $table->foreignId('idOrcamento')
                ->nullable()
                ->constrained('orcamento')
                ->cascadeOnUpdate();

            $table->decimal('valorFrete', 10)->default(0);
            $table->decimal('valorTotal', 10)->default(0);
            $table->integer('formaPagamento')->default(1);
            $table->string('localizacaoAtual', 255);
            $table->integer('dataEntregaPrevista')->default(0);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('pedidoItem', function (Blueprint $table)
        {
            $table->foreignId('idPedido')
                ->constrained('pedido')
                ->cascadeOnUpdate();

            $table->foreignId('idProduto')
                ->constrained('produto')
                ->cascadeOnUpdate();

            $table->integer('quantidade')->default(1);
            $table->decimal('valorUnitario')->default(0);
            $table->tinyInteger('situacao')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('grupoPermissao', function (Blueprint $table)
        {
            $table->foreignId('idGrupo')
                ->constrained('grupo')
                ->cascadeOnUpdate();

            $table->tinyInteger('permissao');
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
    }
}
