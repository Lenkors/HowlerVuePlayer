import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './store/vuex/index'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import IconBase from './components/IconBase.vue'

const pinia = createPinia()

const options = {
    position: POSITION.TOP_LEFT,
    timeout: 4000
};

const app = createApp(App)
app.use(store)
app.use(Toast, options);
app.use(pinia)
app.component('icon-base', IconBase);
app.mount('#app')
