<?php

namespace Database\Factories;

use App\Models\PostLike;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostLikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PostLike::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'post_id' => Post::factory(),
            'created_at' => now()
        ];
    }


    /**
     * Configure the model factory.
     *
     * @return $this
     */
    // public function configure()
    // {
    //     return $this->afterCreating(function (PostLike $like) {

    //         $posts = Post::all();

    //         foreach ($posts as $post) {
    //             $likedBy = PostLike::where('post_id', $post->id)->pluck('user_id');

    //             $users = User::whereNotIn('id', $likedBy)
    //                 ->inRandomOrder()
    //                 ->get()
    //                 ->pluck('id');

    //             $like->update(['user_id' => $users->random()]);
    //         }
    //     });
    // }
}
