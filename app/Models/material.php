<?php

namespace App\Models;

class Material extends \App\Models\BaseModel
{
    protected $table = 'material';

    // ATRIBUTOS PADROES
    protected $attributes = [];

    // DECLARA AS VARIAVEIS
    protected $fillable = [
        'nome',
        'descricao',
        'situacao'
    ];

    // DECLARA O TIPO DAS VARIAVEIS
    protected $casts = [
        'nome' => 'string',
        'descricao' => 'text',
        'situacao' => 'boolean'
    ];

    public function produtos()
    {
        return $this->hasMany(\App\Models\Produto::class, 'idMaterial', 'id');
    }
}
