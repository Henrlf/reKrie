<?php

namespace App\Models;

class Material extends BaseModel
{
    protected $table = 'material';

    // ATRIBUTOS PADROES
//    protected $attributes = [];

    // DECLARA AS VARIAVEIS
    protected $fillable = [
        'nome',
        'descricao',
        'situacao'
    ];

    // DECLARA O TIPO DAS VARIAVEIS
    protected $casts = [
        'nome' => 'string',
        'descricao' => 'string',
        'situacao' => 'boolean'
    ];

    public function produtos()
    {
        return $this->hasMany(Produto::class, 'idMaterial', 'id');
    }
}
