<?php

namespace App\Http\Controllers;

use App\Http\Requests\Produto\ProdutoCreateRequest;
use App\Http\Requests\Produto\ProdutoUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ProdutoController extends Controller
{
    public function create(ProdutoCreateRequest $request): RedirectResponse
    {
        Log::info('ProdutoCreateRequest: {request}', ['request' => $request->getContent()]);

        $mappedData = [
            'idMaterial' => $request->input('idMaterial'),
            'nome' => $request->input('nome'),
            'descricao' => $request->input('descricao'),
            'imagem' => $request->input('imagem'),
            'largura' => $request->input('largura'),
            'altura' => $request->input('altura'),
            'comprimento' => $request->input('comprimento'),
            'peso' => $request->input('peso'),
            'saldoEstoque' => 0,
            'valor' => $request->input('valor'),
            'situacao' => $request->input('situacao')
        ];

        \App\Models\Produto::create($mappedData);

        return Redirect::route('produto.listagem');
    }

    public function update(ProdutoUpdateRequest $request): RedirectResponse
    {
        Log::info('ProdutoUpdateRequest: {request}', ['request' => $request->getContent()]);

        \App\Models\Produto::query()
            ->where('id', '=', $request->input('id'))
            ->update([
                    'idMaterial' => $request->input('idMaterial'),
                    'nome' => $request->input('nome'),
                    'descricao' => $request->input('descricao'),
                    'imagem' => $request->input('imagem'),
                    'largura' => $request->input('largura'),
                    'altura' => $request->input('altura'),
                    'comprimento' => $request->input('comprimento'),
                    'peso' => $request->input('peso'),
                    'saldoEstoque' => 0,
                    'valor' => $request->input('valor'),
                    'situacao' => $request->input('situacao')
                ]);

        return Redirect::route("produto.listagem");
    }

    public static function findAllByName($name): \Illuminate\Database\Eloquent\Collection|array
    {
        return \App\Models\Produto::query()
            ->where('situacao', '=', true)
            ->where('nome', 'LIKE', "%{$name}%")
            ->get();
    }
}
