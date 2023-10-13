<?php

namespace App\Http\Requests\Material;

use Illuminate\Foundation\Http\FormRequest;

class Material extends FormRequest
{
    public function rules(): array
    {
        return [
            'nome' => ['string', 'max:255'],
            'descricao' => ['string', 'max:1000']
        ];
    }
}
