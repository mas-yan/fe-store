import { createStore } from "vuex";
import auth from './module/auth'
import profile from './module/profile'
export default createStore({
    modules: {
        auth,
        profile
    }
})