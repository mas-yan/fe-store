const order = {
    namespaced: true,
    state: {
        product: JSON.parse(localStorage.getItem('product')),
    },
    mutations: {
        SET_PRODUCT(state, data) {
            return state.prduct = data
        }
    },
    actions: {
        addProduct({ commit }, data) {
            localStorage.setItem('product', JSON.stringify(data))
            commit('SET_PRODUCT', data)
        },
    },
    getters: {

    }
}

export default order