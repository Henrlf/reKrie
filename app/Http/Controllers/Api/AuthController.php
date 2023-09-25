<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(\App\Http\Requests\Login $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials))
        {
            return response([
                'message' => 'Email ou senha estão incorretos!'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function cadastroUsuario(\App\Http\Requests\CadastroUsuario $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = \App\Models\User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'cpf' => $data['cpf'],
            'telefone' => isset($data['telefone']) ? $data['telefone'] : "",
            'idGrupo' => $data['idGrupo'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
    }
}
