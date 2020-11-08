<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PostLike;
class PostLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PostLike::insert([
            [
                'post_id' => '1',
                'user_id' => '2'
            ],
            [
                'post_id' => '2',
                'user_id' => '2'
            ],
            [
                'post_id' => '3',
                'user_id' => '2'
            ],
            [
                'post_id' => '4',
                'user_id' => '2'
            ]
        ]);
    }
}
