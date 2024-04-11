<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreModulRequest;
use App\Http\Requests\UpdateModulRequest;
use App\Models\Modul;

class ModulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moduls = Modul::all();
        return $moduls;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModulRequest $request)
    {
        $request->validate([
            'id' => 'required|unique:moduls,id|integer',
            'modul' => 'required|max:255',
            'durada' => 'required|integer',
            'hores_de_lliure_disposicio' => 'required|integer',
            'equivalencia_en_credits_ECTS' => 'required|integer',
            'unitats_formatives' => 'required|integer',
            'completades' => 'required|integer',
        ]);

        $modulCreated = Modul::create($request->all());
        $modulCreated->save();
        return response()->json($modulCreated, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modul $modul)
    {
        return $modul;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModulRequest $request, Modul $modul)
    {
        $request->validate([
            'completades' => 'required|integer',
        ]);


        $modul->update($request->all());
        return response()->json($modul, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modul $modul)
    {
        $modul->delete();
        return response()->json(null, 204);
    }
}
