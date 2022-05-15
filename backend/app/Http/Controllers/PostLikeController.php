<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
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
            'post_id' => $request->post_id,
        ]);

        return response()->json([
            "message" => "Success"
        ]);
    }

    public function destroy(Request $request)
    {
        $postLike = PostLike::where([
            ['post_id', '=', $request->post_id],
            ['user_id', '=', auth()->user()->id]
        ])->firstOrFail();

        $postLike->delete();

        return response()->json(['message' => 'ok']);
    }
}
