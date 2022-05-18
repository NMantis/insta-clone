<?php

namespace App\Http\Controllers;

use App\Models\FollowRequest;
use App\Http\Requests\StoreFollowRequestRequest;
use App\Http\Requests\UpdateFollowRequestRequest;

class FollowRequestController extends Controller
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
     * @param  \App\Http\Requests\StoreFollowRequestRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFollowRequestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FollowRequest  $followRequest
     * @return \Illuminate\Http\Response
     */
    public function show(FollowRequest $followRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFollowRequestRequest  $request
     * @param  \App\Models\FollowRequest  $followRequest
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFollowRequestRequest $request, FollowRequest $followRequest)
    {
        //
    }
}
