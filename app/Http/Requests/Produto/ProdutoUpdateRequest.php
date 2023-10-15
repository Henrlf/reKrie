<?php

namespace App\Http\Requests\Produto;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nome' => ['string', 'max:255'],
            'descricao' => ['string', 'max:255'],
            'imagem' => ['string', 'max:255'],
            'largura' => ['string', 'max:255'],
            'altura' => ['string', 'max:255'],
            'comprimento' => ['string', 'max:255'],
            'peso' => ['string', 'max:255'],
            'valor' => ['string', 'max:255']
        ];
    }
}
