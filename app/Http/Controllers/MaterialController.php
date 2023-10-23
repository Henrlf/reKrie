<?php

namespace App\Http\Controllers;

use App\Http\Requests\Material\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class MaterialController extends Controller
{
    public function create(Material $request): RedirectResponse
    {
        Log::info('MaterialController: {request}', ['request' => $request->getContent()]);

        $mappedData = [
            'nome' => $request->input('nome'),
            'descricao' => $request->input('descricao'),
            'situacao' => $request->input('situacao'),
        ];

        \App\Models\Material::create($mappedData);

        return Redirect::route('material.listagem');
    }

    public function update(Material $request): RedirectResponse
    {
        $id = $request->input('id');

        \App\Models\Material::query()
            ->where('id', '=', $id)
            ->update(['nome' => $request->input('nome'), 'descricao' => $request->input('descricao'), 'situacao' => $request->input('situacao')]);

        return Redirect::route("material.listagem");
    }
}
