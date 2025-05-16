<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

         $defaultCategories = [
            [
                'name' => 'Genel',
                'color' => '#3b82f6', // mavi
                'slug' =>'genel',
                'icon' => 'folder',
                'description' => 'Genel kategoriler',
                'is_default' => true,
                'position' => 1
            ],
            [
                'name' => 'Kişisel',
                'color' => '#10b981',
                'slug' =>'kisisel', // yeşil
                'icon' => 'user',
                'description' => 'Kişisel görevler',
                'is_default' => true,
                'position' => 2
            ],
            [
                'name' => 'İş',
                'color' => '#f59e0b', // turuncu
                'icon' => 'briefcase',
                'slug' =>'is',
                'description' => 'İşle ilgili görevler',
                'is_default' => true,
                'position' => 3
            ],
            [
                'name' => 'Alışveriş',
                'color' => '#8b5cf6', // mor
                'icon' => 'shopping-cart',
                'slug' =>'alisveris',
                'description' => 'Alışveriş listeleri',
                'is_default' => true,
                'position' => 4
            ],
        ];

        Category::insert($defaultCategories);

    }
}
