const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'https://bdb3-103-105-55-87.ngrok.io/api'
})

export default Api