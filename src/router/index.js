import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/Register.vue'),
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
            import ('@/views/Login.vue'),
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

export default router