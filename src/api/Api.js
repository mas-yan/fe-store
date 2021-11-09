const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'http://my-store.test/api'
})

export default Api