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
        },

        AUTH_LOGOUT(state) {
            state.token = ''
            state.user = ''
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

            //define callback promise
            return new Promise((resolve, reject) => {

                Api.post('/login', {

                    //data yang dikirim ke server
                    email: user.email,
                    password: user.password,

                })

                .then(response => {

                    //define variable dengan isi hasil response dari server
                    const token = response.data.token
                    const user = response.data.data

                    //set localStorage untuk menyimpan token dan data user
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    //commit get user ke mutation
                    commit('GET_USER', user)

                    //resolve ke component dengan hasil response
                    resolve(response)

                }).catch(error => {

                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })

            })

        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT')
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                delete Api.defaults.headers.common['AUTHORIZATION']
                resolve()
            })
        },
        getUser({ commit }) {

            //ambil data token dari localStorage
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.get('/user')
                .then(response => {

                    //commit ke mutatuin GET_USER dengan hasil response
                    commit('GET_USER', response.data)

                })
        },
    },
    getters: {
        currentUser(state) {
            return state.user
        },

        isLoggedIn(state) {
            return state.token
        }
    }
}

export default auth