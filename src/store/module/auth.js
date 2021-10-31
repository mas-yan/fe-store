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
                        commit('')
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error.response.data)
                    })
            })
        }
    },
    getters: {

    }
}

export default auth