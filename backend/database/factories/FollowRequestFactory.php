<?php

namespace Database\Factories;

use App\Models\FollowRequest;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FollowRequest>
 */
class FollowRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'sender_id' => User::factory(),
            'recipient_id' => User::factory(),
            'status' => $this->faker->randomElement(FollowRequest::ALL_STATUSES),
            'created_at' => now()
        ];
    }
}
