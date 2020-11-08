<?php

namespace Database\Seeders;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::insert([
            [
                'text' => 'comment 1',
                'user_id' => '2',
                'post_id' =>'1'
            ],
            [
                'text' => 'comment 1',
                'user_id' => '2',
                'post_id' =>'1'
            ],
            [
                'text' => 'comment 1',
                'user_id' => '2',
                'post_id' =>'2'
            ],
            [
                'text' => 'comment 1',
                'user_id' => '2',
                'post_id' =>'2'
            ],
            [
                'text' => 'comment 1',
                'user_id' => '2',
                'post_id' =>'3'
            ]
        ]);
    }
}
