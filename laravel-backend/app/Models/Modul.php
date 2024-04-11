<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modul extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'modul',
        'durada',
        'hores_de_lliure_disposicio',
        'equivalencia_en_credits_ECTS',
        'unitats_formatives',
        'completades',
    ];
}