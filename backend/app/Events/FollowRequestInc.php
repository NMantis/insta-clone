<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\FollowRequest;

class FollowRequestInc
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

  
    public FollowRequest $followRequest;
    public User $sender;
    public User $recipient;


    public function __construct(FollowRequest $followRequest, User $sender, User $recipient)
    {
        $this->followRequest = $followRequest;
        $this->sender = $sender;
        $this->recipient = $recipient;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('notifications.' . $this->recipient->id);
    }
}
