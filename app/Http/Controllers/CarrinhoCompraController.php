<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarrinhoCompra\CarrinhoCompraRequest;
use Illuminate\Support\Facades\Auth;

class CarrinhoCompraController
{
    public function create(CarrinhoCompraRequest $request, $idProduto)
    {
        $idUsuario = Auth::id();

        /** @var \App\Models\CarrinhoCompra $carrinho */
        $carrinho = \App\Models\CarrinhoCompra::query()
            ->where('idUsuario', '=', $idUsuario)
            ->where('idProduto', '=', $idProduto)
            ->first();

        if ($carrinho)
        {
            $carrinho->setAttribute('quantidade', ($carrinho->getAttribute('quantidade') + $request->get('quantidade')));
            $carrinho->save();
        }
        else
        {
            $mappedData = [
                'idUsuario' => $idUsuario,
                'idProduto' => $idProduto,
                'quantidade' => $request->get('quantidade'),
            ];

            \App\Models\CarrinhoCompra::create($mappedData);
        }

        return response()->json();
    }

    public function delete(CarrinhoCompraRequest $request, $idCarrinho)
    {
        \App\Models\CarrinhoCompra::query()
            ->where('id', '=', $idCarrinho)
            ->delete();

        return response()->json();
    }
}
