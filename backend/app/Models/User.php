<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'follow_requests', 'sender_id', 'recipient_id')
            ->wherePivot('status', '=', FollowRequest::ACCEPTED);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follow_requests', 'recipient_id', 'sender_id')
            ->wherePivot('status', '=', FollowRequest::ACCEPTED);
    }

    public function getFollowedByAuthAttribute()
    {
        return  $this->following()->where('recipient_id', auth()->id())->exists();
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
