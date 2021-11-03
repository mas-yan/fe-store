import Api from '../../api/Api'

const category = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        //index categories
        categories: [],

    },

    //mutations
    mutations: {

        //set state categories dengan data dari response 
        SET_CATEGORIES(state, data) {
            state.categories = data
        },

    },

    //actions
    actions: {

        //action getCategoryHome
        getCategoryHome({ commit }) {

            //get data sliders ke server
            Api.get('/categoryHome')
                .then(response => {

                    //commit ke mutation SET_CATEGORIES dengan response data
                    commit('SET_CATEGORIES', response.data.data)

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        },

        //action getCategory
        // getCategory({ commit }) {

        //     //get data sliders ke server
        //     Api.get('/category')
        //         .then(response => {

        //             //commit ke mutation SET_CATEGORIES dengan response data
        //             commit('SET_CATEGORIES', response.data.data.data)

        //         }).catch(error => {

        //             //show error log dari response
        //             console.log(error)

        //         })
        // },

    },

    //getters
    getters: {

    }

}

export default category