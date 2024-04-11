import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // declarem les rutes de la nostra web
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/modules',
            name: 'modules',
            component: () => import('../views/ModuleView.vue')
        },
        {
            path: '/form',
            name: 'form',
            component: () => import('../views/FormView.vue')
        }
    ]
});

export default router;
