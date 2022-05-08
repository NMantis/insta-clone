<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\PostLike;
use App\Models\CommentLike;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            UserSeeder::class,
            // PostSeeder::class,
            // CommentSeeder::class,
            // PostLikeSeeder::class,
            // CommentLikeSeeder::class
        ]);

        User::factory()
            ->count(40)
            ->has(
                Post::factory()
                    ->count(3)
                    ->hasComments(1, fn () => ['user_id' => User::all()->random()->id])
                    ->hasPostLikes(3, fn () => ['user_id' => User::all()->random()->id])
            )
            ->create();

    }

    // lila24@example.com
}
