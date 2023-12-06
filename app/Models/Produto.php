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
        'idMaterial' => 'integer',
        'nome' => 'string',
        'descricao' => 'string',
        'imagem' => 'string',
        'largura' => 'double',
        'altura' => 'double',
        'comprimento' => 'double',
        'peso' => 'double',
        'saldoEstoque' => 'integer',
        'valor' => 'float',
        'situacao' => 'boolean'
    ];

    public function material()
    {
        return $this->belongsTo(Material::class, 'id', 'idMaterial');
    }

    public function carrinhoCompras()
    {
        return $this->hasMany(CarrinhoCompra::class, 'idProduto', 'id');
    }
    public static function findOneByCodigo($codigo)
    {
        return self::where('id', $codigo)->first();
    }
}
