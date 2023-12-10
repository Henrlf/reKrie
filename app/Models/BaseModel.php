<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class BaseModel extends Model
{
    protected $primaryKey = 'id';

    public static function findAll()
    {
        $class = "\\" . get_called_class();

        return $class::query()->get();
    }

    public static function findAllActive()
    {
        $class = "\\" . get_called_class();
        $model = new $class;

        $query = $class::query();

        if (in_array('situacao', $model->fillable))
        {
            $query->where('situacao', '=', true);
        }

        return $query->get();
    }

    public static function findOneById($id)
    {
        $class = get_called_class();

        if (property_exists($class, 'table'))
        {
            $model = new $class;

            return $model::query()
                ->where('id', '=', $id)
                ->first();
        }

        return null;
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

    public function save(array $options = [])
    {
        $this->unsetDescription();

        return parent::save($options);
    }

    public function unsetDescription()
    {
        foreach ($this->getAttributes() as $attribute => $value)
        {
            if (str_contains($attribute, 'Description'))
            {
                unset($this->$attribute);
            }
        }
    }
}
