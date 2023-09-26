<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductCreateRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function create(ProductCreateRequest $request): RedirectResponse
    {
        Log::info('ProductCreateRequest: {request}', ['request' => $request->getContent()]);

        $mappedData = [
            'idMaterial' => 1,
            'nome' => $request->input('name'),
            'descricao' => $request->input('description'),
            'imagem' => 'https://static.vecteezy.com/system/resources/previews/026/552/880/original/wooden-comfortable-chair-isolated-on-transparent-background-ai-generated-png.png',
            'largura' => 40.0,
            'altura' => 120.00,
            'comprimento' => 45.0,
            'peso' => 3.5,
            'saldoEstoque' => $request->input('stock_quantity'),
            'valor' => $request->input('value'),
            'situacao' => true
        ];

        $product = Product::create($mappedData);

        return Redirect::route('dashboard');
    }
}
