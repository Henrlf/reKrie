<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\CarrinhoCompraController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ProfileController;
use App\Models\Endereco;
use App\Models\Material;
use App\Models\Produto;
use App\Models\CarrinhoCompra;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Dashboard ------------------------------------------------------------------------------------------------------------

Route::get('/', function () {
    return Inertia::render('Dashboard', ['produtos' => Produto::findAllActive()]);
})->name('dashboard');

Route::post('/', function () {
    $name = request()->get('searchDescription');
    return Inertia::render('Dashboard', ['produtos' => ProdutoController::findAllByName($name)]);
})->name('dashboard.search');

//Usuario --------------------------------------------------------------------------------------------------------------

Route::middleware('auth')->group(function () {
    Route::get('/usuario/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/usuario/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/usuario/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Material ------------------------------------------------------------------------------------------------------------------------------

Route::get('/material', function () {
    return Inertia::render('Material/Listagem', ['materiais' => Material::findAll()]);
})->middleware(['auth', 'verified'])->name('material.listagem');

Route::get('/material/adicionar', function () {
    return Inertia::render('Material/Adicionar');
})->middleware(['auth', 'verified'])->name('material.adicionar');

Route::get('/material/editar/{id}', function () {
    $id = request()->route()->parameter('id');
    return Inertia::render('Material/Editar', ['material' => Material::findOneById($id)]);
})->middleware(['auth', 'verified'])->name('material.editar');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/material', [MaterialController::class, 'create'])->name('material.create');
    Route::put('/material', [MaterialController::class, 'update'])->name('material.update');
});

//Produtos ------------------------------------------------------------------------------------------------------------------------------

Route::get('/produto/detalhes/{codigo}', function ($codigo) {
    $produto = Produto::findOneByCodigo($codigo); 
    if ($produto) {
        return Inertia::render('ProdutoDetalhes', ['produto' => $produto]);
    } else {
        abort(404, 'Product not found');
    }
})->middleware(['auth', 'verified'])->name('produto.detalhes');

Route::get('/register-product', function () {
    return Inertia::render('Produto/RegisterProduct');
})->middleware(['auth', 'verified'])->name('produto.register');

Route::get('/produto', function () {
    return Inertia::render('Produto/Listagem', ['produtos' => Produto::findAll()]);
})->middleware(['auth', 'verified'])->name('produto.listagem');

Route::get('/produto/editar/{id}', function () {
    $id = request()->route()->parameter('id');
    return Inertia::render('Produto/Editar', ['produto' => Produto::findOneById($id), 'materiais' => Material::findAll()]);
})->middleware(['auth', 'verified'])->name('produto.editar');

Route::get('/produto/adicionar', function () {
    return Inertia::render('Produto/Adicionar', ['materiais' => Material::findAll()]);
})->middleware(['auth', 'verified'])->name('produto.adicionar');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/produtos', [ProdutoController::class, 'create'])->name('produtos.create');
    Route::delete('/produtos', [ProdutoController::class, 'delete'])->name('produtos.delete');
    Route::put('/produtos', [ProdutoController::class, 'update'])->name('produtos.update');
});

//Endereço ------------------------------------------------------------------------------------------------------------------------------

Route::get('/usuario/endereco', function () {
    return Inertia::render('Endereco/Listagem', ['enderecos' => Endereco::findAllFromUser()]);
})->middleware(['auth', 'verified'])->name('endereco.listagem');

Route::get('/usuario/endereco/adicionar', function () {
    return Inertia::render('Endereco/Adicionar');
})->middleware(['auth', 'verified'])->name('endereco.adicionar');

Route::get('/usuario/endereco/editar/{id}', function () {
    $id = request()->route()->parameter('id');
    return Inertia::render('Endereco/Editar', ['endereco' => Endereco::findOneById($id)]);
})->middleware(['auth', 'verified'])->name('endereco.editar');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/enderecos', [EnderecoController::class, 'create'])->name('endereco.create');
    Route::delete('/enderecos', [EnderecoController::class, 'delete'])->name('endereco.delete');
    Route::put('/enderecos', [EnderecoController::class, 'update'])->name('endereco.update');
});

//Carrinho de Compras ------------------------------------------------------------------------------------------------------------------------------

Route::get('/usuario/carrinhocompra', function () {
    return Inertia::render('CarrinhoCompra/Listagem', ['produtosCarrinho' => CarrinhoCompra::getProdutosCarrinho()]);
})->middleware(['auth', 'verified'])->name('carrinho.listagem');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/carrinhoCompra/{idProduto}', [CarrinhoCompraController::class, 'create'])->name('carrinhocompra.create');
    Route::delete('/carrinhoCompra/{idCarrinho}', [CarrinhoCompraController::class, 'delete'])->name('carrinhocompra.delete');
});

// Auth ----------------------------------------------------------------------------------------------------------------
Route::get('login/github', [AuthenticatedSessionController::class, 'redirectToGitHub'])->name('login.github');
Route::get('login/github/callback', [AuthenticatedSessionController::class, 'handleGitHubCallback']);

Route::get('login/google', [AuthenticatedSessionController::class, 'redirectToGoogle'])->name('login.google');
Route::get('login/google/callback', [AuthenticatedSessionController::class, 'handleGoogleCallback']);

Route::get('login/facebook', [AuthenticatedSessionController::class, 'redirectToFacebook'])->name('login.facebook');
Route::get('login/facebook/callback', [AuthenticatedSessionController::class, 'handleFacebookCallback']);

Route::middleware('auth')->group(function () {
    Route::get('/auth/logout', [AuthenticatedSessionController::class, 'destroy'])->name('auth.logout');
});

//----------------------------------------------------------------------------------------------------------------------

require __DIR__ . '/auth.php';
