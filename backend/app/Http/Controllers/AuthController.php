<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());

        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->getCredentials();

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        if (! $user) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

}



// $user = User::where([
//     'username' => $credentials['username'],
//     'email' => $credentials['email']
// ])->first();

// $authenticated = Hash::check($credentials['password'], $user->password ?? '');

// abort_unless($authenticated, 401, 'unauthorized');

