<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                'Validation Error'
            ],422);
        }

        $comment = Comment::create([
            'text' => $request->text,
            'post_id' => $request->post_id
        ]);

        return response()->json([
            "message" => "Comment successfully created."
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'text' => 'required|string'
        ]);

        $comment = Comment::findOrFail($request->id)->first();

        $comment->update([
            'text' => $request->text
        ]);

        return ['message' => 'ok'];

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $comment = Comment::where([
            ['post_id', '=', $request->id],
            ['id', '=', $request->id]
        ])->firstOrFail();

        $comment->delete();

        return response()->json(['message' => 'ok']);
    }
}
