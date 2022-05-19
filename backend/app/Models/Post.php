<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['liked_by_auth_user'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function postLikes()
    {
        return $this->hasMany('App\Models\PostLike');
    }

    public function getLikedByAuthUserAttribute()
    {
        return $this->postLikes()->Where('user_id', auth()->user()->id)->exists();
    }

    public function scopeFull($builder)
    {
        return $builder
            ->with([
                'user',
                'postLikes',
                'comments'
            ]);
    }
}
