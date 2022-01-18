const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

export default Api