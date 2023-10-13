<?php

namespace App\Models;

class Produto extends BaseModel
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
        'descricao' => 'string',
        'imagem' => 'string',
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
        return $this->belongsTo(Material::class, 'id', 'idMaterial');
    }
}
