import Api from '../../api/Api'

const category = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        //index categories
        categories: [],
        home: [],
        rand: [],
        category: null,
        productCategory: [],
        //loadmore
        nextExists: false,
        nextPage: 0,
    },

    //mutations
    mutations: {

        RESET_STATE(state, data) {
            state.category = data
        },

        RAND_CATEGORIES(state, data) {
            state.rand = data
        },
        //set state categories dengan data dari response 
        SET_CATEGORIES(state, data) {
            state.categories = data
        },
        SET_CATEGORIES_HOME(state, data) {
            state.home = data
        },
        DETAIL_CATEGORY(state, data) {
            state.category = data
        },
        PRODUCT_CATEGORY(state, data) {
            state.productCategory = data
        },
        SET_NEXTEXISTS(state, nextExists) {
            state.nextExists = nextExists
        },

        //set state nextPage
        SET_NEXTPAGE(state, nextPage) {
            state.nextPage = nextPage
        },

        SET_LOADMORE(state, data) {
            data.data.forEach(row => {
                state.productCategory.push(row);
            });
        },
        SET_LOADMORE_ALL(state, data) {
            data.forEach(row => {
                state.categories.push(row);
            });
        },
    },

    //actions
    actions: {

        // random category
        getRandom({ commit }) {
            Api.get('randCategory')
                .then(resp => {
                    commit('RAND_CATEGORIES', resp.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //action getCategoryHome
        getCategoryHome({ commit }) {

            //get data sliders ke server
            Api.get('/categoryHome')
                .then(response => {

                    //commit ke mutation SET_CATEGORIES dengan response data
                    commit('SET_CATEGORIES_HOME', response.data.data)

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        },
        getCategory({ commit }) {
            Api.get('/category')
                .then(resp => {
                    commit('SET_CATEGORIES', resp.data.data.data)

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
                    console.log(err);
                })
        },
        getDetailCategory({ commit }, slug) {

            commit('RESET_STATE', null)
            Api.get(`/category/${slug}`)
                .then(resp => {
                    commit('DETAIL_CATEGORY', resp.data.category)
                    commit('PRODUCT_CATEGORY', resp.data.data.data)

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
        },

        //action getLoadMore
        getLoadMore({ commit, state }, slug) {
            //get data campaign dengan page ke server
            Api.get(`/category/${slug}?page=${state.nextPage}`)
                .then(response => {

                    //commit ke mutation SET_LOADMORE dengan response data
                    commit('SET_LOADMORE', response.data.data.lessons)

                    if (response.data.data.lessons.current_page < response.data.data.lessons.last_page) {

                        //commit ke mutation SET_NEXTEXISTS dengan true
                        commit('SET_NEXTEXISTS', true)

                        //commit ke mutation SET_NEXTPAGE dengan current page + 1
                        commit('SET_NEXTPAGE', response.data.data.lessons.current_page + 1)

                    } else {

                        //commit ke mutation SET_NEXTEXISTS dengan false
                        commit('SET_NEXTEXISTS', false)
                    }

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        },

        getLoadMoreAll({ commit, state }) {
            //get data campaign dengan page ke server
            Api.get(`/category?page=${state.nextPage}`)
                .then(response => {

                    //commit ke mutation SET_LOADMORE_ALL dengan response data
                    commit('SET_LOADMORE_ALL', response.data.data.data)

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

    //getters
    getters: {

    }

}

export default category