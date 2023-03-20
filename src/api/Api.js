const { default: axios } = require("axios");

const Api = axios.create({
    baseURL: 'https://i-book-store.up.railway.app/api'
})

export default Api