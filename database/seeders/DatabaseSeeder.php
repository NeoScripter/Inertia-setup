<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        $adminUser = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
        ]);

        $adminUser->roles()->attach($adminRole);

        $userUser = User::factory()->create([
            'name' => 'user',
            'email' => 'user@gmail.com',
        ]);

        $userUser->roles()->attach($userRole);
    }
}
