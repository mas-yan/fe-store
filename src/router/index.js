import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [{
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/auth/Register.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#fff" },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                    },
                ],
            },
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/auth/Login.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#fff" },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                    },
                ],
            },
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import ('@/views/dashboard/Index.vue'),
        children: [{
                path: '',
                name: 'index',
                component: () =>
                    import ('@/views/dashboard/Dashboard.vue')
            },
            {
                path: '/dashboard/profile',
                name: 'profile',
                component: () =>
                    import ('@/views/dashboard/Profile.vue')
            },
            {
                path: '/dashboard/cart',
                component: () =>
                    import ('@/views/dashboard/Cart.vue')
            },

        ],
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#fff" },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                    },
                ],
            },
            requiresAuth: true
        },
    },
    {
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/home/Index.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#fff" },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                    },
                ],
            },
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router