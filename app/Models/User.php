<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'provider',
        'provider_id',
        'cpf',
        'email',
        'telefone',
        'password',
        'situacao',
        'admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function enderecos()
    {
        return $this->hasMany(Endereco::class, 'idUsuario', 'id');
    }

    public function carrinhoCompras()
    {
        return $this->hasMany(CarrinhoCompra::class, 'idUsuario', 'id');
    }

    public function orcamento()
    {
        return $this->hasMany(Orcamento::class, 'idUsuario', 'id');
    }
}
