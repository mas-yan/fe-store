import Api from "../../api/Api"

const product = {
    namespaced: true,

    state: {
        product: [],
        detail: {},
        nextExists: false,
        nextPage: 0,
    },

    mutations: {
        SET_PRODUCT(state, data) {
            state.product = data
        },

        DETAIL_PRODUCT(state, data) {
            state.detail = data
        },

        //set state nextExists
        SET_NEXTEXISTS(state, nextExists) {
            state.nextExists = nextExists
        },

        //set state nextPage
        SET_NEXTPAGE(state, nextPage) {
            state.nextPage = nextPage
        },
        SET_LOADMORE(state, data) {
            console.log(data);
            data.forEach(row => {
                state.product.data.push(row);
            });
        },
    },

    actions: {
        getProduct({ commit }) {
            Api.get('/product')
                .then(resp => {
                    commit('SET_PRODUCT', resp.data.data.data)

                    if (resp.data.data.current_page < resp.data.data.last_page) {

                        //commit ke mutation SET_NEXTEXISTS dengan true
                        commit('SET_NEXTEXISTS', true)

                        //commit ke mutation SET_NEXTPAGE dengan current page + 1
                        commit('SET_NEXTPAGE', resp.data.data.current_page + 1)

                    } else {

                        //commit ke mutation SET_NEXTEXISTS dengan false
                        commit('SET_NEXTEXISTS', false)
                    }
                })
                .catch(err => {
                    console.log(err.data);
                })
        },

        getDetail({ commit }, slug) {
            Api.get(`/product/${slug}`)
                .then(resp => {
                    commit('DETAIL_PRODUCT', resp.data.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        //action getLoadMore
        getLoadMore({ commit }, nextPage) {

            //get data campaign dengan page ke server
            Api.get(`/product?page=${nextPage}`)
                .then(response => {

                    //commit ke mutation SET_LOADMORE dengan response data
                    commit('SET_LOADMORE', response.data.data.data)

                    //console.log(response.data.data.data)

                    if (response.data.data.current_page < response.data.data.last_page) {

                        //commit ke mutation SET_NEXTEXISTS dengan true
                        commit('SET_NEXTEXISTS', true)

                        //commit ke mutation SET_NEXTPAGE dengan current page + 1
                        commit('SET_NEXTPAGE', response.data.data.current_page + 1)

                    } else {

                        //commit ke mutation SET_NEXTEXISTS dengan false
                        commit('SET_NEXTEXISTS', false)
                    }

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        },
    },

    getters: {

    }
}

export default product