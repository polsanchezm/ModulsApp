<script setup lang="ts">
import type { Modul } from '@/models/modul';
import { useModuleStore } from '@/stores/module';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// importem el store dels mòduls
const moduleStore = useModuleStore();

// carreguem tots els mòduls al carregar la pagina
moduleStore.fetchModuls();

// importem el router i el store
const router = useRouter();

// creem un nou mòdul buit
const newModule = ref<Modul>({
    id: 0,
    modul: '',
    durada: 0,
    hores_de_lliure_disposicio: 0,
    equivalencia_en_credits_ECTS: 0,
    unitats_formatives: 0,
    completades: 0
});

const addModule = async () => {
    try {
        // cridem a la funció per crear un mòdul nou
        await moduleStore.createModul(newModule.value);
        // redirigim per mostrar tots els moduls
        router.push('/modules');
    } catch (error) {
        console.error('Error al crear el mòdul:', error);
    }
};

let moduleIdError = ref<Boolean>(false);
let moduleModulError = ref<Boolean>(false);
let moduleDuradaError = ref<Boolean>(false);
let moduleHoresError = ref<Boolean>(false);
let moduleEquivalenciaError = ref<Boolean>(false);
let moduleUnitatsError = ref<Boolean>(false);

let moduleTouched = ref<Boolean>(false);

const validateId = (id: number) => {
    if (typeof id != 'number') return false
    if (id === null) return false
    if (moduleStore.obtenirModul(id) !== null) return false
    if (id <= 0) return false
    return true
}

const validateModul = (modul: string) => {
    return modul === null ? false : true
}

const validateDurada = (durada: number) => {
    if (typeof durada != 'number') return false
    if (durada === null) return false
    if (durada <= 0) return false
    return true
}

const validateHores = (hores: number) => {
    if (typeof hores != 'number') return false
    if (hores === null) return false
    if (hores <= 0) return false
    return true
}

const validateEquivalencia = (equivalencia: number) => {
    if (equivalencia === null) return false
    if (typeof equivalencia != 'number') return false
    if (equivalencia <= 0) return false
    return true
}

const validateUnitats = (unitat: number) => {
    if (unitat === null) return false
    if (typeof unitat != 'number') return false
    if (unitat <= 0) return false
    return true
}

type ValidationType = 'id' | 'modul' | 'durada' | 'hores' | 'equivalencia' | 'unitats';

const handleInput = (value: any, validationType: ValidationType): void => {
    // Marcar el campo como tocado
    moduleTouched.value = true;
    // Ejecutar la función de validación correspondiente y actualizar el estado de error
    switch (validationType) {
        case 'id':
            moduleIdError.value = !validateId(value);
            break;
        case 'modul':
            moduleModulError.value = !validateModul(value);
            break;
        case 'durada':
            moduleDuradaError.value = !validateDurada(value);
            break;
        case 'hores':
            moduleHoresError.value = !validateHores(value);
            break;
        case 'equivalencia':
            moduleEquivalenciaError.value = !validateEquivalencia(value);
            break;
        case 'unitats':
            moduleUnitatsError.value = !validateUnitats(value);
            break;
        default:
            break;
    }
}

const allFieldsValid = () => {
    return validateId(newModule.value.id) &&
        validateModul(newModule.value.modul) &&
        validateDurada(newModule.value.durada) &&
        validateHores(newModule.value.hores_de_lliure_disposicio) &&
        validateEquivalencia(newModule.value.equivalencia_en_credits_ECTS) &&
        validateUnitats(newModule.value.unitats_formatives);
}

</script>

<template>
    <div class="container m-auto p-5">
        <div class="shadow-xl rounded-xl p-9 justify-center bg-slate-300 mt-6">
            <!-- formulari per afegir el mòdul -->
            <form class="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-6" @submit.prevent="addModule">
                <div class="relative z-0 w-full mb-5 group">
                    <input type="number" name="moduleId" id="moduleId"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " v-model="newModule.id" @input="handleInput(newModule.id, 'id')" required />
                    <label for="moduleId"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
                    <span class="text-red-500" v-if="moduleTouched && moduleIdError">
                        La ID introduïda no és vàlida.
                    </span>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" name="moduleName" id="moduleName"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " v-model="newModule.modul" @input="handleInput(newModule.modul, 'modul')"
                        required />
                    <label for="moduleName"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Modul</label>
                    <span class="text-red-500" v-if="moduleTouched && moduleModulError">
                        El mòdul introduït no és vàlid.
                    </span>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="durada" id="durada"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " v-model="newModule.durada" @input="handleInput(newModule.durada, 'durada')"
                            required />
                        <label for="durada"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Durada</label>
                        <span class="text-red-500" v-if="moduleTouched && moduleDuradaError">
                            La durada introduïda no és vàlid.
                        </span>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="lliureDisposicio" id="lliureDisposicio"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " v-model="newModule.hores_de_lliure_disposicio"
                            @input="handleInput(newModule.hores_de_lliure_disposicio, 'hores')" required />
                        <label for="lliureDisposicio"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hores
                            de lliure disposició</label>
                        <span class="text-red-500" v-if="moduleTouched && moduleHoresError">
                            Les hores introduïdes no són vàlides.
                        </span>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="credits_ECTS" id="credits_ECTS"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " v-model="newModule.equivalencia_en_credits_ECTS"
                            @input="handleInput(newModule.equivalencia_en_credits_ECTS, 'equivalencia')" required />
                        <label for="credits_ECTS"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Equivalència
                            en crèdits ECTS</label>
                        <span class="text-red-500" v-if="moduleTouched && moduleEquivalenciaError">
                            L'equivalència introduïda no és vàlida.
                        </span>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="unitats_formatives" id="unitats_formatives"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " v-model="newModule.unitats_formatives"
                            @input="handleInput(newModule.unitats_formatives, 'unitats')" required />
                        <label for="unitats_formatives"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Unitats
                            formatives</label>
                        <span class="text-red-500" v-if="moduleTouched && moduleUnitatsError">
                            Les unitats formatives introduïdes no són vàlides.
                        </span>
                    </div>
                </div>
                <button type="submit" :disabled="!allFieldsValid()"
                    :class="{ 'disabled-button': !allFieldsValid(), 'normal-button': allFieldsValid() }"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Afegir
                    Mòdul</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.disabled-button {
    background-color: grey;
}
</style>
