<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use stdClass;

class CarrinhoCompra extends BaseModel
{
    const UPDATED_AT = null;
    const CREATED_AT = null;

    protected $table = 'carrinhocompra';

    // DECLARA AS VARIAVEIS
    protected $fillable = [
        'idUsuario',
        'idProduto',
        'quantidade'
    ];

    protected $casts = [
        'idUsuario' => 'integer',
        'isProduto' => 'integer',
        'quantidade' => 'integer'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id', 'idUsuario');
    }

    public function produto()
    {
        return $this->belongsTo(Produto::class, 'id', 'idProduto');
    }

    public static function getCarrinhos()
    {
        if (Auth::check())
        {
            return self::query()
                ->where('idUsuario', '=', Auth::id())
                ->get();
        }

        return NULL;
    }

    public static function getProdutosCarrinho()
    {
        $carrinhos = self::getCarrinhos();

        $produtosCarrinho = [];

        if ($carrinhos)
        {
            foreach ($carrinhos as $carrinho)
            {
                $idProduto = $carrinho->getAttribute('idProduto');

                $produto = \App\Models\Produto::findOneById($idProduto);
                $material = \App\Models\Material::findOneById($produto->getAttribute('idMaterial'));

                $prod = new stdClass();
                $prod->quantidade = $carrinho->getAttribute('quantidade');
                $prod->idCarrinho = $carrinho->getAttribute('id');
                $prod->idProduto = $idProduto;
                $prod->produtoNome = $produto->getAttribute('nome');
                $prod->produtoDescricao = $produto->getAttribute('descricao');
                $prod->produtoPreco = $produto->getAttribute('valor');
                $prod->produtoLargura = $produto->getAttribute('largura');
                $prod->produtoAltura = $produto->getAttribute('altura');
                $prod->produtoComprimento = $produto->getAttribute('comprimento');
                $prod->produtoPeso = $produto->getAttribute('peso');
                $prod->produtoImg = $produto->getAttribute('imagem');
                $prod->produtoMaterial = $material->getAttribute('nome');

                $produtosCarrinho[] = $prod;
            }
        }

        return $produtosCarrinho;
    }
}
