<?php

namespace App\Http\Controllers;

use App\Http\Requests\Orcamento\OrcamentoRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

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

        \App\Models\Orcamento::create($mappedData);

        return Redirect::route('orcamento.listagem');
    }

    public function avancar(Request $request, $idOrcamento)
    {
        $orcamento = \App\Models\Orcamento::findOneById($idOrcamento);
        $orcamento->situacao++;
        $orcamento->save();

        return response()->json();
    }

    public function rejeitar(Request $request, $idOrcamento)
    {
        $orcamento = \App\Models\Orcamento::findOneById($idOrcamento);
        $orcamento->situacao = 6;
        $orcamento->save();

        return response()->json();
    }

    public function toDb($value)
    {
        $value = str_replace('.', '', $value);

        return str_replace(',', '.', $value);
    }
}
