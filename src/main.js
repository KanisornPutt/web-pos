import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import bootstrap
// import 'bootstrap/dist/css/bootstrap.css'
import '/css/main.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(store).use(router).mount('#app')
