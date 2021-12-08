const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'http://i-book-store.test/api'
})

export default Api