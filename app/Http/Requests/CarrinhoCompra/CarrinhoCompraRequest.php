<?php

namespace App\Http\Requests\CarrinhoCompra;

use Illuminate\Foundation\Http\FormRequest;

class CarrinhoCompraRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'idUsuario' => ['int'],
            'idProduto' => ['int'],
            'quantidade' => ['int']
        ];
    }
}
