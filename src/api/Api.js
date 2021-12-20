const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'http://i-book-store.herokuapp.com/api'
})

export default Api