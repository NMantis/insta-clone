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

// POSTS
Route::get('/posts', [PostController::class, 'index'])->middleware('auth:api');
Route::get('/posts/{id}', [PostController::class, 'show'])->middleware('auth:api');
Route::get('/posts/profile', [PostController::class, 'profile'])->middleware('auth:api');
Route::post('/posts', [PostController::class, 'store'])->middleware('auth:api');
Route::post('/posts/{post}/like', [PostLikeController::class, 'store'])->middleware('auth:api');
Route::delete('/posts/{post}/unlike', [PostLikeController::class, 'destroy'])->middleware('auth:api');
Route::put('/posts/{id}', [PostController::class, 'update'])->middleware('auth:api');
Route::delete('/posts/{id}', [PostController::class, 'destroy'])->middleware('auth:api');

// COMMENTS
Route::get('/posts/{post_id}/comments', [CommentController::class, 'index'])->middleware('auth:api');
Route::post('/posts/{post_id}/comments', [CommentController::class, 'store'])->middleware('auth:api');
Route::put('/posts/{post_id}/comments/{comment_id}', [CommentController::class, 'update'])->middleware('auth:api');
Route::delete('/posts/{post_id}/comments/{comment_id}', [CommentController::class, 'destroy'])->middleware('auth:api');

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// FOLLOW REQUESTS 
Route::get('/follow-requests/pending', [FollowRequestController::class, 'index'])->middleware('auth:api');
Route::post('/follow-requests/{user}', [FollowRequestController::class, 'store'])->middleware('auth:api');
Route::put('/follow-requests/{follow_request}', [FollowRequestController::class, 'update'])->middleware('auth:api');
// Route::delete('/follow-requests/{follow_request}', [FollowRequestController::class, 'destroy'])->middleware('auth:api');

// FRIENDSHIPS
// Route::put('/user/reccomendations', [FollowRequestController::class, 'reject'])->middleware('auth:api');


// PROFILE
Route::get('/profile/{user:username}', ProfileController::class)->middleware('auth:api');

// CURRENT USER
Route::get('/current', CurrentUserController::class)->middleware('auth:api');
