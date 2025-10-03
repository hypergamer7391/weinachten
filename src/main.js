import './assets/main.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Erstelle ein reaktives globales Objekt
const globalState = reactive({
  debugMode: true
})

app.use(router)

app.mount('#app')

app.provide('globalState', globalState)

router.afterEach(() => {
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count()
  }
})


