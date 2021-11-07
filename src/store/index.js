import { createStore } from "vuex";
import auth from './module/auth'
import profile from './module/profile'
import slider from "./module/slider";
import category from './module/category'
import product from './module/product'
export default createStore({
    modules: {
        auth,
        profile,
        slider,
        category,
        product,
    }
})