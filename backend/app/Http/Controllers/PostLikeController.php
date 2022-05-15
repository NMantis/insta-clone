<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use App\Models\Post;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        PostLike::create([
            'user_id' =>  auth()->user()->id,
            'post_id' => $request->post,
        ]);

        $post = Post::find($request->post)
            ->full()
            ->first();

        return response()->json([
            "message" => "Success",
            "data" => $post
        ]);
    }

    public function destroy(Request $request)
    {
        $postLike = PostLike::where('post_id', $request->post)
            ->where('user_id', auth()->user()->id)
            ->firstOrFail();

        $postLike->delete();

        $post = Post::find($request->post)
            ->full()
            ->first();


        return response()->json([
            'message' => 'ok',
            "data" => $post
        ]);
    }
}
