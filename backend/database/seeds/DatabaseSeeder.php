<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Creando el Usuario
        DB::table('users')->insert([
            'name' => 'Admin',
            'name' => 'root',
            'role' => 'ROLE_ADMIN',
            'email' => 'Admin@easyload.mx',
            'password' => hash('sha256','EasyLoad_1121'),
        ]);
    }
}
