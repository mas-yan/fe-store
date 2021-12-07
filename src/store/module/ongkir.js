import Api from "../../api/Api"

const ongkir = {
    namespaced: true,

    state: {
        provinsi: [],
        cities: [],
        weight: 0,
        cost: 0
    },

    mutations: {
        GET_PROVINSI(state, data) {
            state.provinsi = data
        },
        GET_CITIES(state, data) {
            state.cities = data
        },
        GET_COST(state, data) {
            state.cost = data
        },
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
        },
        getCities({ commit }, data) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.get(`/cities/${data}`)
                .then((resp) => {
                    commit('GET_CITIES', resp.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getCostOngkir({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                Api.post(`/ongkir`, {
                        city_destination: data.city_destination,
                        weight: data.weight,
                        courier: data.courier
                    })
                    .then(resp => {
                        commit('GET_COST', resp.data.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err.response.data);
                    })
            })
        }
    },

    getters: {}
}

export default ongkir