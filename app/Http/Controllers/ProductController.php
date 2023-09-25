<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductCreateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    public function create(ProductCreateRequest $request): RedirectResponse
    {
        Log::info('ProductCreateRequest: {request}', ['request' => $request->getContent()]);

        //Salvar no banco

        return Redirect::route('dashboard');
    }
}
