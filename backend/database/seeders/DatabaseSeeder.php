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
            UserSeeder::class
        ]);

        User::factory()
            ->has(
                Post::factory()
                    ->count(2)
                    ->has(
                        Comment::factory()
                                ->count(2)
                                ->has(CommentLike::factory())
                        )
                    ->has(PostLike::factory())
                )
            ->count(5)
            ->create();
    }

    // lila24@example.com
}
