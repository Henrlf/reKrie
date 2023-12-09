<?php

namespace App\Http\Requests\Orcamento;

use Illuminate\Foundation\Http\FormRequest;

class OrcamentoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'idMaterial' => ['int'],
            'descricao' => ['string', 'max:255'],
            'largura' => ['string'],
            'altura' => ['string'],
            'comprimento' => ['string'],
            'peso' => ['string', 'nullable'],
            'situacao' => ['int']
        ];
    }
}
