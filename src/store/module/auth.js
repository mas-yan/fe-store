import Api from '../../api/Api'
const auth = {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || ''
    },
    mutations: {
        AUTH_SUCCESS(state, token, user) {
            state.token = token
            state.user = user
        },
        GET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                Api.post('/register', {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        password_confirmation: user.password_confirmation
                    })
                    .then(response => {
                        commit('')
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error.response.data)
                    })
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                Api.post('/login', {
                        email: user.email,
                        password: user.password
                    })
                    .then(resp => {
                        let token = resp.data.token
                        let user = resp.data.data

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        Api.defaults.headers.common['AUTHORIZATION'] = `Bearer ${token}`

                        commit('AUTH_SUCCESS', token, user)
                        commit('GET_USER', user)
                        resolve(resp)
                    })
                    .catch(err => {
                        localStorage.removeItem('token')
                        reject(err.response.data)
                    })
            })
        }
    },
    getters: {
        currentUser(state) {
            return state.user // <-- return dengan data user
        },

        isLoggedIn(state) {
            return state.token
        }
    }
}

export default auth