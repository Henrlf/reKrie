<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        'idUsuario' => 'int',
        'endereco' => 'string',
        'numero' => 'int',
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

    public static function findAllFromUser()
    {
        if (Auth::check()) {
            $userId = Auth::id();
            return DB::table('endereco')->where('idUsuario', '=', $userId)->get();
        }

        return null;
    }
}
