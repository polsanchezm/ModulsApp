<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from './components/MainNavbar.vue';
</script>

<template>
    <MainNavbar />
    <div class="bg-white dark:bg-gray-900 min-h-screen">
        <div class="main-content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
