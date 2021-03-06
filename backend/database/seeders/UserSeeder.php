<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
                'name' => 'name',
                'email' => 'user1@gmail.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now()
            ],
            [
                'name' => 'name2',
                'email' => 'user2@gmail.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now()
            ],
        ]);
    }
}
