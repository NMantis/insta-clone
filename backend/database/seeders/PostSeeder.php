<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::insert([
            [
                'user_id' => '1',
                'title' => 'this is title',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ],
            [
                'user_id' => '1',
                'title' => 'post 2',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ],
            [
                'user_id' => '1',
                'title' => 'post 3',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ],
            [
                'user_id' => '1',
                'title' => 'post 4',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ],
            [
                'user_id' => '1',
                'title' => 'post 5',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ],
            [
                'user_id' => '1',
                'title' => 'post 6',
                'description' => 'this is description',
                'image' => '/storage/1603643656.png'
            ]
        ]);
    }
}
