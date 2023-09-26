<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductCreateRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
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
            'imagem' => 'https://w7.pngwing.com/pngs/592/699/png-transparent-coffee-tables-rustic-furniture-log-furniture-table-furniture-drawer-coffee-tables.png',
            'largura' => 40.0,
            'altura' => 120.00,
            'comprimento' => 45.0,
            'peso' => 3.5,
            'saldoEstoque' => $request->input('stock_quantity'),
            'valor' => $request->input('value'),
            'situacao' => true
        ];
     
        $product = Product::create($mappedData);
        $product->findAll();
        return Redirect::route('dashboard');
    }

    public static function findAll() {
        return DB::table('produto')->get()->toArray();
    }
}
