<?php

namespace App\Models;

class Endereco extends BaseModel
{
    protected $table = 'endereco';

    // DECLARA AS VARIAVEIS
    protected $fillable = [
        'idUsuario',
        'endereco',
        'numero',
        'complemento',
        'uf',
        'cidade',
        'bairro',
        'cep',
        'situacao'
    ];

    // DECLARA O TIPO DAS VARIAVEIS
    protected $casts = [
        'idUsuario' => 'integer',
        'endereco' => 'string',
        'numero' => 'integer',
        'complemento' => 'string',
        'uf' => 'string',
        'cidade' => 'string',
        'bairro' => 'string',
        'cep' => 'string',
        'situacao' => 'boolean'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id', 'idUsuario');
    }
}
