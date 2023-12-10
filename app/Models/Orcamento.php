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

        return self::getDescriptions($models);
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

            return self::getDescriptions([$model])[0];
        }

        return null;
    }

    public static function getDescriptions($models)
    {
        foreach ($models as $model)
        {
            $material = Db::table('material')
                ->where('id', '=', $model->idMaterial)
                ->first();

            $usuario = Db::table('users')
                ->where('id', '=', $model->idUsuario)
                ->first();

            $model->situacaoDescription = self::getSituacaoLabel($model->situacao);
            $model->materialDescription = $material->nome;
            $model->usuarioDescription = $usuario->name;
        }

        return $models;
    }

    public static function getSituacaoLabel($situacao)
    {
        switch ($situacao)
        {
            case 1:
                return 'Em análise';
            case 2:
                return 'Em produção';
            case 3:
                return 'Pronto para envio';
            case 4:
                return 'Em trânsito';
            case 5:
                return 'Entrege';
            case 6:
                return 'Rejeitado';
            case 7:
                return 'Cancelado';
        }

        return null;
    }
}
