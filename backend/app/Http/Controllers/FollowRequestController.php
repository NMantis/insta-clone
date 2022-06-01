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
        $requests = FollowRequest::where([
            'recipient_id' => auth()->id(),
            'status' => FollowRequest::PENDING
        ])
            ->with([
                'sender',
                'recipient'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFollowRequestRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFollowRequestRequest $request)
    {
        $userId = $request->recipient_id;

        $duplicate = FollowRequest::firstWhere('recipient_id', $userId);

        abort_unless($duplicate, 'Already Exists!', 400);


        // check if profile is private. If not change status

        FollowRequest::create([
            'recipient_id' => $userId,
            'sender_id' => auth()->id()
        ]);

        // trigger event 

        return response()->json(['message' => 'Ok']);
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
        // $isValid = in_array(FollowRequest::ALL_STATUSES, $request->status);

        // abort_unless($isValid, 'Invalid Status', 400);


        $followRequest->update([
            'status' => $request->status
        ]);


        // trigger event 

        return response()->json(['message' => 'Ok']);
    }


    public function destroy(FollowRequest $followRequest)
    {
        $followRequest->delete();

        return response()->json(['message' => 'ok']);
    }
}
