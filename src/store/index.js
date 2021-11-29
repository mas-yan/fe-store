import { createStore } from "vuex";
import auth from './module/auth'
import profile from './module/profile'
import slider from "./module/slider";
import category from './module/category'
import product from './module/product'
import cart from './module/cart'
import ongkir from './module/ongkir'
export default createStore({
    modules: {
        auth,
        profile,
        slider,
        category,
        product,
        cart,
        ongkir,
    }
})