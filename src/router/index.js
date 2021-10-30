import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/Login.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router