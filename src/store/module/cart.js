import Api from "../../api/Api"

const cart = {
    namespaced: true,

    state: {
        cart: [],
        total: null,
    },

    mutations: {
        CART_PRODUCT(state, data) {
            state.cart = data
        },

        TOTAL_CART(state, data) {
            state.total = data
        },

        DESTROY_CART(state) {
            state.cart = []
        },
    },

    actions: {
        cart({ commit }) {
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get(`/cart`)
                .then(resp => {
                    commit('CART_PRODUCT', resp.data.data)
                }).catch((err) => {
                    console.log(err);
                })
        },

        addCart({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/store/${data}`)
                    .then(resp => {
                        commit('')
                        resolve(resp)
                    }).catch((err) => {
                        reject(err.response.data)
                    })
            })
        },

        totalCart({ commit }) {
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get(`/cart`)
                .then(resp => {
                    commit('TOTAL_CART', resp.data.total)
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        addQty({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/qty/${data}`)
                    .then(resp => {
                        commit('')
                        resolve(resp)
                    }).catch((err) => {
                        reject(err.response.data)
                    })
            })
        },
        subtQty({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/subtQty/${data}`)
                    .then(resp => {
                        commit('')
                        resolve(resp)
                    }).catch((err) => {
                        reject(err.response.data)
                    })
            })
        },
        deleteCart({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/destroyCart/${data}`)
                    .then(resp => {
                        commit('')
                        resolve(resp)
                    }).catch((err) => {
                        reject(err.response.data)
                    })
            })
        },

        deleteSelected({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.post(`/cart/delete`, {
                        id: data.id
                    })
                    .then(resp => {
                        commit('')
                        resolve(resp)
                    }).catch((err) => {
                        reject(err.response.data)
                    })
            })
        },
        destroyCart({ commit }) {
            commit('DESTROY_CART')
        },
    },

    getters: {
        qty(state) {
            return state.cart
        },
    }
}

export default cart