<?php

namespace Database\Seeders;

use App\Models\Modul;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $moduls = [
            [
                'modul' => 'Mòdul professional 5: entorns de desenvolupament',
                'durada' => 66,
                'hores_de_lliure_disposicio' => 0,
                'equivalencia_en_credits_ECTS' => 6,
                'unitats_formatives' => 3,
                'completades' => 2
            ],
            [
                'modul' => 'Mòdul professional 6: desenvolupament web en entorn client',
                'durada' => 165,
                'hores_de_lliure_disposicio' => 33,
                'equivalencia_en_credits_ECTS' => 9,
                'unitats_formatives' => 4,
                'completades' => 4
            ],
            [
                'modul' => 'Mòdul professional 7: desenvolupament web en entorn servidor',
                'durada' => 165,
                'hores_de_lliure_disposicio' => 33,
                'equivalencia_en_credits_ECTS' => 12,
                'unitats_formatives' => 4,
                'completades' => 3
            ]
        ];

        foreach ($moduls as $modul) {
            Modul::create($modul);
        }
    }
}
