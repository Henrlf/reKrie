<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BaseModel extends Model
{
    protected $primaryKey = 'id';

    public static function findAll()
    {
        $class = get_called_class();

        if (property_exists($class, 'table'))
        {
            $model = new $class;

            return DB::table($model->table)->get();
        }

        return null;
    }

    public static function findOneById($id)
    {
        $class = get_called_class();

        if (property_exists($class, 'table'))
        {
            $model = new $class;

            return DB::table($model->table)->where('id', '=', $id)->first();
        }

        return null;
    }
}
