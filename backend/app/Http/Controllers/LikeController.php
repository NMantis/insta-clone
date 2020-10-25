<?php

namespace App\Http\Controllers;

use App\Models\CommentLike;
use App\Models\PostLike;
use Illuminate\Http\Request;

class LikeController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CommentLike  $commentLike
     * @return \Illuminate\Http\Response
     */
    public function show(CommentLike $commentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CommentLike  $commentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CommentLike $commentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CommentLike  $commentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommentLike $commentLike)
    {
        //
    }
}
