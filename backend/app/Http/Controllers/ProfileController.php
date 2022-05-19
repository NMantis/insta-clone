<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

class ProfileController extends Controller
{
    public function show(User $user)
    {

        $posts = $user->posts()->count();

        $followers = $user->followers()->count();

        $following = $user->following()->count();

        return response()->json([
            'user' => $user,
            'posts' => $posts,
            'followers' => $followers,
            'following' => $following
        ]);
    }

    public function followers()
    {
        $user = User::findOrFail(auth()->id());


        return response()->json(['data' => $user->followers]);
    }

    public function following()
    {
        $user = User::findOrFail(auth()->id());


        return response()->json(['data' => $user->following]);
    }
}
