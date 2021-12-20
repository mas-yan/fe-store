import Api from "../../api/Api"
const order = {
    namespaced: true,
    state: {
        product: JSON.parse(localStorage.getItem('product')) || [],
        snap_token: '',
        order: null,
        detail: [],
        invoice: ''
    },
    mutations: {
        SET_PRODUCT(state, data) {
            return state.product = data
        },
        SET_ORDER(state, data) {
            return state.order = data
        },
        SET_DETAIL(state, data) {
            return state.detail = data
        },
        SET_SNAP_TOKEN(state, data) {
            state.snap_token = data
        },
        SET_INVOICE(state, data) {
            state.invoice = data
        },
        DESTROY_PRODUCT(state) {
            state.product = []
            state.detail = []
        }
    },
    actions: {
        addProduct({ commit }, data) {
            localStorage.setItem('product', JSON.stringify(data))
            commit('SET_PRODUCT', data)
        },

        storeTransaction({ commit }, data) {

            //define callback promise
            return new Promise((resolve, reject) => {

                //get data token dan user
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                //send data donatiion ke server
                Api.post('/transaction', {
                        phone: data.noTelp,
                        full_name: data.name,
                        city: data.city_name,
                        province: data.provinsi_name,
                        address: data.fullAddress,
                        courir: data.courier,
                        service: data.service,
                        cost: data.ongkir,
                        grand_total: data.grand_total,
                        product: data.product,
                        price: data.price,
                        qty: data.qty,
                    })
                    .then(response => {
                        commit('SET_SNAP_TOKEN', response.data[0].snap_token)
                        commit('SET_INVOICE', response.data.data.invoice)
                        resolve(response)

                    }).catch(error => {

                        //show error log dari response
                        reject(error)

                    })

            })

        },
        destroyProduct({ commit }) {
            commit('DESTROY_PRODUCT')
        },

        getOrder({ commit }, data) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.get(`/order?page=${data}`)
                    .then(response => {
                        commit('SET_ORDER', response.data.data)
                        resolve(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getDetail({ commit }, data) {
            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.get(`/order/${data}`)
                .then(response => {
                    commit('SET_DETAIL', response.data.data)
                })
        },

        postReview({ commit }, formData) {
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.post('/review', formData)
                .then(() => {
                    commit()
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
    getters: {

    }
}

export default order