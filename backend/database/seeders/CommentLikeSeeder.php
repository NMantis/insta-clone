<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CommentLike;
class CommentLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        return  CommentLike::insert([
            [
                'user_id' => '1',
                'comment_id' => '1'
            ],
            [
                'user_id' => '1',
                'comment_id' => '2'
            ],
            [
                'user_id' => '1',
                'comment_id' => '3'
            ],
            [
                'user_id' => '1',
                'comment_id' => '4'
            ],
            [
                'user_id' => '2',
                'comment_id' => '1'
            ]
        ]);
    }
}
