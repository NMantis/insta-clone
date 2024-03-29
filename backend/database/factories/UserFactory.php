<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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

        return [
            'name' => $this->faker->name,
            'username' => $this->faker->unique()->userName,
            'email' =>  $this->faker->unique()->safeEmail,
            'password' => 'password',
            'image' => $this->faker->imageUrl(360, 360, 'animals', true, 'cats'),
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

            $user->following()->syncWithoutDetaching($userIds);


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
