import Api from "../../api/Api"

const ongkir = {
    namespaced: true,

    state: {
        provinsi: []
    },

    mutations: {
        GET_PROVINSI(state, data) {
            state.provinsi = data
        }
    },

    actions: {
        getProvinsi({ commit }) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.get('/provinces')
                .then((resp) => {
                    commit('GET_PROVINSI', resp.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    getters: {}
}

export default ongkir