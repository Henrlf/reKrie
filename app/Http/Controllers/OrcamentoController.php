<?php

namespace App\Http\Controllers;

use App\Http\Requests\Orcamento\OrcamentoRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class OrcamentoController extends Controller
{
    public function create(OrcamentoRequest $request): RedirectResponse
    {
        $mappedData = [
            'idUsuario' => Auth::id(),
            'idMaterial' => $request->input('idMaterial'),
            'descricao' => $request->input('descricao'),
            'valor' => $this->toDb($request->input('valor')),
            'largura' => $this->toDb($request->input('largura')),
            'altura' => $this->toDb($request->input('altura')),
            'comprimento' => $this->toDb($request->input('comprimento')),
            'peso' => $this->toDb($request->input('peso')),
            'situacao' => 1
        ];

        debug($request->input('idMaterial'));

        \App\Models\Orcamento::create($mappedData);

        return Redirect::route('orcamento.listagem');
    }

    public function update(OrcamentoRequest $request): RedirectResponse
    {
//        \App\Models\Produto::query()
//            ->where('id', '=', $request->input('id'))
//            ->update([
//                'idMaterial' => $request->input('idMaterial'),
//                'nome' => $request->input('nome'),
//                'descricao' => $request->input('descricao'),
//                'imagem' => $request->input('imagem'),
//                'largura' => $request->input('largura'),
//                'altura' => $request->input('altura'),
//                'comprimento' => $request->input('comprimento'),
//                'peso' => $request->input('peso'),
//                'saldoEstoque' => 0,
//                'valor' => $request->input('valor'),
//                'situacao' => $request->input('situacao')
//            ]);

        return Redirect::route("orcamento.listagem");
    }

    public function toDb($value)
    {
        $value = str_replace('.', '', $value);

        return str_replace(',', '.', $value);
    }
}
