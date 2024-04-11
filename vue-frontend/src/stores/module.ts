import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/lib/axios';
import { Modul } from '@/models/modul';

// farem servir aquesta store per a exportar les dades dels mòduls
export const useModuleStore = defineStore('module', () => {
    const moduls = ref<Modul[]>([]);
    // nova instància de mòdul amb valors predeterminats
    const newModul = ref(new Modul(0, '', 0, 0, 0, 0, 0));
    const selectedModul = ref<Modul | null>(null);
    // nova instància de mòdul (per actualitzar-lo) amb valors predeterminats
    const updatedModul = ref<Modul>(new Modul(0, '', 0, 0, 0, 0, 0));

    // mètode per agafar el mòdul seleccionat i posar els valors a l'actualitzat
    const selectModul = (modul: Modul) => {
        selectedModul.value = modul;
        updatedModul.value = new Modul(modul.id, modul.modul, modul.durada, modul.hores_de_lliure_disposicio, modul.equivalencia_en_credits_ECTS, modul.unitats_formatives, modul.completades);
    };

    // mètode per agafar tots els mòduls i carregar-los a la vista
    const fetchModuls = async () => {
        try {
            // fem una crida a la api
            const response = await axios.get('/modul');
            if (Array.isArray(response.data)) {
                // en cas que response.data sigui un array, mapegem les dades i les afegim a les dades del mòdul
                moduls.value = response.data.map((modulData: Modul) => new Modul(modulData.id, modulData.modul, modulData.durada, modulData.hores_de_lliure_disposicio, modulData.equivalencia_en_credits_ECTS, modulData.unitats_formatives, modulData.completades));
            } else {
                // si no és un array, mostrem l'error
                console.error('La resposta no és un array:', response.data);
            }
        } catch (error) {
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al obtenir els mòduls:', error);
        }
    };

    // mètode per crear un nou mòdul
    const createModul = async (newModul: Modul) => {
        try {
            // verificar si el mòdul ja existeix
            const existingModule = moduls.value.find((module) => module.id === newModul.id);

            if (existingModule) {
                alert('El mòdul ja existeix. No es pot afegir dues vegades.');
            }
            // fem una crida a la api
            const response = await axios.post('/modul', newModul);

            // creem una nova instància de Modul amb les dades obtenides del formulari
            moduls.value.push(new Modul(response.data.id, response.data.modul, response.data.durada, response.data.hores_de_lliure_disposicio, response.data.equivalencia_en_credits_ECTS, response.data.unitats_formatives, response.data.completades));

            // reestablim les dades per posar el formulari en blanc
            newModul = new Modul(0, '', 0, 0, 0, 0, 0);
        } catch (error) {
            // si no s'ha pogut crear el mòdul, mostrem l'error
            console.error('Error al crear el mòdul:', error);
        }
    };

    // mètode per actualitzar un mòdul
    const updateModul = async (module: Modul) => {
        selectModul(module);
        try {
            // verificar que el mòdul seleccionat no sigui null
            if (selectedModul.value !== null) {
                // creem un objecte amb les dades de les UFs completades
                const updatedData = { completades: updatedModul.value.completades };

                // fem una crida a la api
                const response = await axios.put(`/modul/${selectedModul.value.id}`, updatedData);

                // comprovar que sigui el mòdul seleccionat
                const index = moduls.value.findIndex((modul) => modul.id === selectedModul.value!.id);
                if (index !== -1) {
                    // si es el mòdul seleccionat, enviem les dades
                    moduls.value[index].completades = response.data.completades;
                } else {
                    // en cas que no ho sigui, mostrem l'error
                    console.error("No s'ha trobat el mòdul amb la ID especificada");
                }
            } else {
                // si el valor del mòdul és null, nostrem l'error
                console.error('El mòdul no existeix');
            }
        } catch (error) {
            // en cas que no es pugui actualitzar, mostrem l'error
            console.error('Error al actualitzar el mòdul:', error);
        }
    };

    // obtenir un mòdul a partir del seu identificador.
    const obtenirModul = (id: number) => {
        return moduls.value.find((modul) => modul.id == id) ?? null;
    };

    // retornem totes les funcions i variables per poder-les fer servir des de fora
    return {
        moduls,
        newModul,
        selectedModul,
        updatedModul,
        fetchModuls,
        createModul,
        updateModul,
        selectModul,
        obtenirModul
    };
});
