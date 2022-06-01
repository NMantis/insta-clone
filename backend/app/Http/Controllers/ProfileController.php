<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;

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

        $followers = $user->followers
            ->each(fn ($follower) => $follower->append('followed_by_auth'));

        // $data = DB::table('follow_requests')
        //     ->whereIn('sender_id', $followers->pluck('id'))
        //     ->where('recipient_id', $user->id)
        //     ->get();


        return response()->json(['data' => $followers]);
    }

    public function following()
    {
        $user = User::findOrFail(auth()->id());


        return response()->json(['data' => $user->following]);
    }
}
