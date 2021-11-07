import Api from "../../api/Api"

const product = {
    namespaced: true,

    state: {
        product: []
    },

    mutations: {
        SET_PRODUCT(state, data) {
            state.product = data
        }
    },

    actions: {
        getProduct({ commit }) {
            Api.get('/product')
                .then(resp => {
                    commit('SET_PRODUCT', resp.data.data)
                })
                .catch(err => {
                    console.log(err.data);
                })
        }
    },

    getters: {

    }
}

export default product