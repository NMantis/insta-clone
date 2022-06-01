<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\FollowRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    // POSTS
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::get('/posts/profile', [PostController::class, 'profile']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/posts/{post}/like', [PostLikeController::class, 'store']);
    Route::delete('/posts/{post}/unlike', [PostLikeController::class, 'destroy']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // COMMENTS
    Route::get('/posts/{post_id}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{post_id}/comments', [CommentController::class, 'store']);
    Route::put('/posts/{post_id}/comments/{comment_id}', [CommentController::class, 'update']);
    Route::delete('/posts/{post_id}/comments/{comment_id}', [CommentController::class, 'destroy']);

    // FOLLOW REQUESTS 
    Route::get('/follow-requests/pending', [FollowRequestController::class, 'index']);
    Route::post('/follow-requests/{user}', [FollowRequestController::class, 'store']);
    Route::put('/follow-requests/{follow_request}', [FollowRequestController::class, 'update']);
    Route::delete('/follow-requests/{follow_request}', [FollowRequestController::class, 'destroy']);



    // PROFILE
    Route::get('/profile/followers', [ProfileController::class, 'followers']);
    Route::get('/profile/following', [ProfileController::class, 'following']);
    Route::get('/profile/{user:username}', [ProfileController::class, 'show']);



    // CURRENT USER
    Route::get('/current', CurrentUserController::class);

    // FRIENDSHIPS
    // Route::put('/user/reccomendations', [FollowRequestController::class, 'index']);

});
