<?php

namespace App\Models;

class Produto extends \App\Models\BaseModel
{
    protected $table = 'produto';

    // DECLARA AS VARIAVEIS
    protected $fillable = [
        'idMaterial',
        'nome',
        'descricao',
        'imagem',
        'largura',
        'altura',
        'comprimento',
        'peso',
        'saldoEstoque',
        'valor',
        'situacao'
    ];

    // DECLARA O TIPO DAS VARIAVEIS
    protected $casts = [
        'idMaterial' => 'int',
        'nome' => 'string',
        'descricao' => 'text',
        'imagem' => 'text',
        'largura' => 'decimal',
        'altura' => 'decimal',
        'comprimento' => 'decimal',
        'peso' => 'decimal',
        'saldoEstoque' => 'int',
        'valor' => 'decimal',
        'situacao' => 'boolean'
    ];

    public function material()
    {
        return $this->belongsTo(\App\Models\Material::class, 'id', 'idMaterial');
    }
}
