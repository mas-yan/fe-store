const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'https://literasiku.heiyan.web.id/api'
})

export default Api