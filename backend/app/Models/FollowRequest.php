<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowRequest extends Model
{
    use HasFactory;


    /**
     * Status pending.
     *
     * @var string
     */
    public const PENDING = 'pending';

    /**
     * Status accepted.
     *
     * @var string
     */
    public const ACCEPTED = 'accepted';

    /**
     * Status desclined.
     *
     * @var string
     */
    public const DECLINED = 'declined';

    /**
     * All friendships statuses.
     *
     * @var array
     */
    public const ALL_STATUSES = [
        self::PENDING,
        self::ACCEPTED,
        self::DECLINED
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sender_id',
        'recipient_id',
        'status'
    ];


    public function sender()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function recipient()
    {
        return $this->belongsTo('App\Models\User');
    }
}
