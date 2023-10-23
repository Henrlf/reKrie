<?php

namespace App\Http\Controllers;

use App\Http\Requests\Endereco\EnderecoCreateRequest;
use App\Http\Requests\Endereco\EnderecoUpdateRequest;
use App\Models\Endereco;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class EnderecoController extends Controller
{
    public function create(EnderecoCreateRequest $request): RedirectResponse
    {
        $mappedData = [
            'idUsuario' => Auth::id(),
            'endereco' => $request->input('endereco'),
            'numero' => $request->input('numero'),
            'complemento' => $request->input('complemento'),
            'uf' => $request->input('uf'),
            'cidade' => $request->input('cidade'),
            'bairro' => $request->input('bairro'),
            'cep' => $request->input('cep'),
            'situacao' => $request->input('situacao')
        ];

        Endereco::create($mappedData);

        return Redirect::route('endereco.listagem');
    }

    public function update(EnderecoUpdateRequest $request): RedirectResponse
    {
        Endereco::query()
            ->where('id', '=', $request->input('id'))
            ->update([
                'endereco' => $request->input('endereco'),
                'numero' => $request->input('numero'),
                'complemento' => $request->input('complemento'),
                'uf' => $request->input('uf'),
                'cidade' => $request->input('cidade'),
                'bairro' => $request->input('bairro'),
                'cep' => $request->input('cep'),
                'situacao' => $request->input('situacao')
            ]);

        return Redirect::route("endereco.listagem");
    }
}
