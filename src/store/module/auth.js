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
                        const token = response.data.token
                        const user = response.data.data

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                        commit('AUTH_SUCCESS', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        localStorage.removeItem('token')
                        reject(error.response.data)
                    })
            })
        }
    },
    getters: {

    }
}

export default auth