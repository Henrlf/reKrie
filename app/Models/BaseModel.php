<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BaseModel extends Model
{
    protected $primaryKey = 'id';

    public function findAll()
    {
        return DB::table($this->table)->get();
    }
}
