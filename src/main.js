import { createApp } from 'vue'
import App from './App.vue'
import './css/main.css'
import mixins from './mixins'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import router from './router'
import store from './store'

const app = createApp(App)
app.mixin(mixins)
app.use(router)
app.use(store)
app.mount('#app')