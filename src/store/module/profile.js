import Api from '../../api/Api'
const profile = {
    namespaced: true,
    state: {
        profile: {}
    },
    mutations: {
        GET_PROFILE(state, profile) {
            return state.profile = profile
        },

        SET_PROFILE(state, data) {
            return state.profile = data
        }
    },
    actions: {
        getProfile({ commit }) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get('/profile')
                .then(resp => {
                    commit('GET_PROFILE', resp.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        //action updateProfile
        updateProfile({ commit }, formData) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                Api.post('/profile', formData)
                    .then(resp => {
                        commit('SET_PROFILE', resp.data.data)

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err.response.data);
                    })
            })
        },
        updatePassword({ commit }, user) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                Api.post('/profile/password', {
                        old_password: user.old_password,
                        password: user.password,
                        password_confirmation: user.password_confirmation
                    })
                    .then(resp => {
                        commit('SET_PROFILE', resp.data.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err.response.data)
                    })
            })
        }
    }
}

export default profile