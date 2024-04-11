<script setup lang="ts">
import type { Modul } from '@/models/modul';
import { useModuleStore } from '@/stores/module';
import { ref } from 'vue';

// importem el store dels mòduls
const moduleStore = useModuleStore();

// carreguem tots els mòduls al carregar la pagina
moduleStore.fetchModuls();

// declarem el modul seleccionat amb el model de Modul
let selectedModule = ref<Modul | null>(null);

// funció per agafar el mòdul seleccionat
const handleClick = (index: number) => {
    selectedModule.value = moduleStore.moduls[index];
};

//  funció per afegir +1 a la unitat completada
const addUnitCompleted = (module: Modul) => {
    module.completades++;

    try {
        // cridem a la funció per actualitzar el mòdul
        moduleStore.updateModul(module);
    } catch (error) {
        console.error('Error al actualitzar el mòdul:', error);
    }
};
</script>

<template>
    <div class="container m-auto p-5">
        <ul class="shadow-xl rounded-xl p-9 justify-center bg-slate-300 mt-6">
            <!-- bucle per mostrar les dades dels moduls -->
            <li v-for="(module, index) in moduleStore.moduls" :key="module.modul" :class="module.completades == module.unitats_formatives ? 'greenModul' : 'redModul'">
                <div class="flex justify-between gap-4 items-center">
                    <span :class="selectedModule == module ? 'higlightModul' : ''">{{ module.modul }}</span>
                    <button v-if="selectedModule != module" @click="handleClick(index)" :id="`detail-${index}`" class="dark:text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 ml-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Details</button>
                </div>
                <div class="mt-4" v-if="selectedModule == module">
                    <p class="higlightModul">Durada del mòdul: {{ module.durada }}</p>
                    <p class="higlightModul">Hores de lliure disposició: {{ module.hores_de_lliure_disposicio }}</p>
                    <p class="higlightModul">Equivalència en crèdits: {{ module.equivalencia_en_credits_ECTS }}</p>
                    <p class="higlightModul">Unitats Formatives Totals: {{ module.unitats_formatives }}</p>
                    <p class="higlightModul">
                        Unitats Formatives Completades: {{ module.completades }}
                        <button type="button" v-if="module.completades < module.unitats_formatives" @click="addUnitCompleted(module)" class="dark:text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 ml-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1v8m-4-4h8" />
                            </svg>
                        </button>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.greenModul {
    color: green;
}

.redModul {
    color: red;
}

.higlightModul {
    font-weight: bolder;
    text-shadow: 2px 2px whitesmoke;
}
</style>
