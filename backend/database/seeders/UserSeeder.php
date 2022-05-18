<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
                'name' => 'Nikos',
                'email' => 'user1@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()
            ]
        ]);

    }
}
