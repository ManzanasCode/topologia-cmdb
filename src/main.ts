import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VNetworkGraph from "v-network-graph"
import router from "./router"
import "v-network-graph/lib/style.css"

loadFonts()

createApp(App)
.use(router)
  .use(vuetify)
  .use(VNetworkGraph)
  .mount('#app')
