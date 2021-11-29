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
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
        path: '/category',
        name: 'category',
        component: () =>
            import ('@/views/category/Index.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
        path: '/category/:slug',
        name: 'category.show',
        component: () =>
            import ('@/views/category/Show.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
        path: '/product/:slug',
        name: 'product.show',
        component: () =>
            import ('@/views/product/Index.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
        path: '/cart',
        name: 'cart',
        component: () =>
            import ('@/views/cart/Index.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
        path: '/cart/shipment',
        name: 'shipment',
        component: () =>
            import ('@/views/cart/Shipment.vue'),
        meta: {
            progress: {
                func: [
                    { call: "color", modifier: "temp", argument: "#e1e8f0" },
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
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