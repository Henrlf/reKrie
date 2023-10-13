<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function ()
{
    return Inertia::render('Dashboard', ['produtos' => \App\Models\Produto::findAll()]);
})->name('dashboard');

Route::middleware('auth')->group(function ()
{
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Material ------------------------------------------------------------------------------------------------------------------------------

Route::get('/material', function ()
{
    return Inertia::render('Material/Listagem', ['materiais' => \App\Models\Material::findAll()]);
})->middleware(['auth', 'verified'])->name('material.listagem');

Route::get('/material/adicionar', function ()
{
    return Inertia::render('Material/Adicionar');
})->middleware(['auth', 'verified'])->name('material.adicionar');

Route::get('/material/editar/{id}', function ()
{
    $id = request()->route()->parameter('id');
    return Inertia::render('Material/Editar', ['material' => \App\Models\Material::findOneById($id)]);
})->middleware(['auth', 'verified'])->name('material.editar');

Route::middleware(['auth', 'verified'])->group(function ()
{
    Route::post('/material', [\App\Http\Controllers\MaterialController::class, 'create'])->name('material.create');
    Route::put('/material', [\App\Http\Controllers\MaterialController::class, 'update'])->name('material.update');
});

//Produtos ------------------------------------------------------------------------------------------------------------------------------

Route::get('/register-product', function ()
{
    return Inertia::render('Produto/RegisterProduct');
})->middleware(['auth', 'verified'])->name('produto.register');

//Route::get('/produto', function ()
//{
//    return Inertia::render('Produto/Produto');
//})->middleware(['auth', 'verified'])->name('produto.listagem');

Route::middleware(['auth', 'verified'])->group(function ()
{
    Route::post('/produtos', [ProdutoController::class, 'create'])->name('produtos.create');
    Route::delete('/produtos', [ProdutoController::class, 'delete'])->name('produtos.delete');
});

require __DIR__ . '/auth.php';
