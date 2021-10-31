import { createApp } from 'vue'
import App from './App.vue'
import './css/main.css'
import mixins from './mixins'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import router from './router'
import store from './store'
import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
    //     color: "#bffaf3",
    //     failedColor: "#874b4b",
    thickness: "5px",
};


const app = createApp(App)
app.mixin(mixins)
app.use(router)
app.use(VueProgressBar, options)
app.use(store)
app.mount('#app')