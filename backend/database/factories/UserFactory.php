<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // return [
        //     'name' => $this->faker->name,
        //     'email' => $this->faker->unique()->safeEmail,
        //     'email_verified_at' => now(),
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //     'remember_token' => Str::random(10),
        // ];

        return [
            'name' => $this->faker->name,
            'email' =>  $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'email_verified_at' => now()
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (User $user) {

            $userIds = User::whereNot('id', $user->id)
                ->inRandomOrder()
                ->limit(30)
                ->get()
                ->pluck('id');

            $user->following()->attach($userIds);


            // $users = User::all();

            // $randomIds = $users->random(rand(5, 40))->id;

            // foreach ($randomIds as $id) {
            //     if ($id != $user->id)
            //         $user->following()->attach($users->random(rand(5, 40))->id);
            // }

            // $user->save();
        });
    }
}

            // for ($i = 0; $i < rand(5, 40); $i++) {
            //     // $random = $users->random()->id;

            //     if ($random != $user->id)
            //         $user->following()->attach($users->random()->id);
            // }
