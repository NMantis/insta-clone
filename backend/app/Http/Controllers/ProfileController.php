<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class ProfileController extends Controller
{
    public function __invoke(Request $request)
    {

        $user = User::find($request->user);

        $posts = Post::where('user_id', $user)->count();

        $followers = $user
            ->followers()
            ->count();

        $following = $user
            ->following()
            ->count();

        return response()->json([
            'user' => User::find($request->user),
            'posts' => $posts,
            'followers' => $followers,
            'following' => $following
        ]);

    }
}
