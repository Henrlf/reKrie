<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Redirect the user to the GitHub authentication page.
     */
    public function redirectToGitHub()
    {
        return socialite::driver('github')->redirect();
    }
    public function handleGitHubCallback()
{
    $providerUser = socialite::driver('github')->user();

    // Verifique se o usuário já existe em seu banco de dados com base em seu email.
    $user = User::firstOrCreate(['email' => $providerUser->getEmail()], [
        'name' => $providerUser->getName() ?? $providerUser->getNickname(),
        'provider_id' => $providerUser->getId(),
        'provider' => 'github'
    ]);

    Auth::login($user); // Faça login no usuário

    return redirect(RouteServiceProvider::HOME);
}
public function redirectToGoogle()
    {
        return socialite::driver('google')->redirect();
    }
    public function handleGoogleCallback()
{
    $providerUser = socialite::driver('google')->user();

    // Verifique se o usuário já existe em seu banco de dados com base em seu email.
    $user = User::firstOrCreate(['email' => $providerUser->getEmail()], [
        'name' => $providerUser->getName() ?? $providerUser->getNickname(),
        'provider_id' => $providerUser->getId(),
        'provider' => 'google'
    ]);

    Auth::login($user); // Faça login no usuário

    return redirect(RouteServiceProvider::HOME);
}

public function redirectToFacebook()
    {
        return socialite::driver('facebook')->redirect();
    }
    public function handleFacebookCallback()
{
    $providerUser = socialite::driver('facebook')->user();

    // Verifique se o usuário já existe em seu banco de dados com base em seu email.
    $user = User::firstOrCreate(['email' => $providerUser->getEmail()], [
        'name' => $providerUser->getName() ?? $providerUser->getNickname(),
        'provider_id' => $providerUser->getId(),
        'provider' => 'facebook'
    ]);

    Auth::login($user); // Faça login no usuário

    return redirect(RouteServiceProvider::HOME);
}



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
