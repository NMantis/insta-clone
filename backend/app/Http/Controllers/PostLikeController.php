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

        // check if like exists;
        $like = PostLike::where([
            'post_id' => $request->post,
            'user_id' => auth()->id()
        ]);

        abort_unless($like, 'Already liked', 400);
        
        $post->postLikes()
            ->create([
                'user_id' => auth()->id()
            ]);

        return response()->json([
            "message" => "Success",
            "data" => $post
        ]);
    }

    public function destroy(Request $request)
    {
        PostLike::where([
            'post_id' => $request->post,
            'user_id' => auth()->id()
        ])->delete();

        return response()->json(['message' => 'ok']);
    }
}
