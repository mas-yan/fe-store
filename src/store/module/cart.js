import Api from "../../api/Api"

const cart = {
    namespaced: true,

    state: {
        cart: [],
        total: 0
    },

    mutations: {
        TOTAL_CART(state, data) {
            state.total = data
        }
    },

    actions: {
        addCart({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/addCart/${data}`)
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
        }
    }
}

export default cart