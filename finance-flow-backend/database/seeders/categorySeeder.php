<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'user_id' => 1,
                'name' => 'Salário',
                'type' => 'income',
                'icon' => 'fa-solid fa-money-bill-wave'
            ],
            [
                'user_id' => 1,
                'name' => 'Alimentação',
                'type' => 'expense',
                'icon' => 'fa-solid fa-utensils'
            ],
            [
                'user_id' => 1,
                'name' => 'Transporte',
                'type' => 'expense',
                'icon' => 'fa-solid fa-car'
            ],
            [
                'user_id' => 1,
                'name' => 'Lazer',
                'type' => 'expense',
                'icon' => 'fa-solid fa-film'
            ],
        ]);
    }
}
