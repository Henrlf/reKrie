<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
