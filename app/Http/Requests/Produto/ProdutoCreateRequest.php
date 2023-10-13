<?php

namespace App\Http\Requests\Produto;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoCreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'description' => ['string', 'max:255'],
            'value' => ['string', 'max:255'],
            'stock_quantity' => ['string', 'max:255']
        ];
    }
}
