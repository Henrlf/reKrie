<?php

namespace App\Http\Controllers;

use App\Http\Requests\Produto\ProdutoCreateRequest;
use App\Models\Produto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ProdutoController extends Controller
{
    public function create(ProdutoCreateRequest $request): RedirectResponse
    {
        Log::info('ProdutoCreateRequest: {request}', ['request' => $request->getContent()]);

        $mappedData = [
            'idMaterial' => 1,
            'nome' => $request->input('name'),
            'descricao' => $request->input('description'),
            'imagem' => 'https://w7.pngwing.com/pngs/592/699/png-transparent-coffee-tables-rustic-furniture-log-furniture-table-furniture-drawer-coffee-tables.png',
            'largura' => 40.0,
            'altura' => 120.00,
            'comprimento' => 45.0,
            'peso' => 3.5,
            'saldoEstoque' => $request->input('stock_quantity'),
            'valor' => $request->input('value'),
            'situacao' => true
        ];

        Produto::create($mappedData);

        return Redirect::route('dashboard');
    }
}
