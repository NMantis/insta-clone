<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Post $post)
    {

        $post->postLikes()
            ->create([
                'user_id' => auth()->user()->id
            ]);

        return response()->json([
            "message" => "Success",
            "data" => $post
        ]);
    }

    public function destroy(Request $request)
    {
        $postLike = PostLike::where([
            ['post_id', $request->post],
            ['user_id', auth()->user()->id]
        ]);

        $postLike->delete();

        return response()->json(['message' => 'ok']);
    }
}
