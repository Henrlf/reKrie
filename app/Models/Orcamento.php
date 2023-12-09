<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Orcamento extends BaseModel
{
    protected $table = 'orcamento';

    protected $fillable = [
        'idUsuario',
        'idMaterial',
        'descricao',
        'valor',
        'largura',
        'altura',
        'comprimento',
        'peso',
        'situacao',
    ];

    protected $casts = [
        'idUsuario' => 'integer',
        'idMaterial' => 'integer',
        'descricao' => 'string',
        'valor' => 'float',
        'largura' => 'float',
        'altura' => 'float',
        'comprimento' => 'float',
        'peso' => 'float',
        'situacao' => 'int'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id', 'idUsuario');
    }

    public function material()
    {
        return $this->belongsTo(Material::class, 'id', 'idMaterial');
    }

    public static function findAll()
    {
        $models = parent::findAll();

        foreach ($models as $model)
        {
            $material = Db::table('material')
                ->where('id', '=', $model->idMaterial)
                ->first();

            $model->situacaoDescription = self::getSituacaoLabel($model->situacao);
            $model->materialDescription = $material->nome;
        }

        return $models;
    }

    public static function findAllFromUser()
    {
        $class = get_called_class();

        if (Auth::check() && property_exists($class, 'table'))
        {
            return self::findAll()->where('idUsuario', '=', Auth::id());
        }

        return null;
    }

    public static function findOneById($id)
    {
        $class = get_called_class();

        if (property_exists($class, 'table'))
        {
            $model = new $class;

            $model = $model::query()
                ->where('id', '=', $id)
                ->first();

            $material = Db::table('material')
                ->where('id', '=', $model->idMaterial)
                ->first();

            $model->situacaoDescription = self::getSituacaoLabel($model->situacao);
            $model->materialDescription = $material->nome;

            return $model;
        }

        return null;
    }

    public static function getSituacaoLabel($situacao)
    {
        switch ($situacao)
        {
            case 0:
                return 'Cancelado';
            case 1:
                return 'Aberto';
            case 2:
                return 'Em trânsito';
            case 3:
                return 'Entrege';
        }

        return null;
    }
}
