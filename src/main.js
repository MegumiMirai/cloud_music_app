import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import getVant from './plugins'

const app = createApp(App)
app.use(store)
app.use(router)
getVant(app)

axios.defaults.baseURL = 'http://localhost:3000'
app.config.globalProperties.$http = axios

app.mount('#app')
