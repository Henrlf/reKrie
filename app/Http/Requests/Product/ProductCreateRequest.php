<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductCreateRequest extends FormRequest
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
