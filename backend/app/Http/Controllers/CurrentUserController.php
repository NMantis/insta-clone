<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CurrentUserController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        return User::find($user)->first();
    }
}
