import { createStore } from "vuex";
import auth from './module/auth'
import profile from './module/profile'
import slider from "./module/slider";
export default createStore({
    modules: {
        auth,
        profile,
        slider
    }
})