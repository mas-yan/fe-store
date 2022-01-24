const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'https://semestaku.com/api'
})

export default Api