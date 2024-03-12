import Vue, { createApp } from 'vue'
import ElementUI from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Draggable, { DraggablePlugin, DraggableDirective } from '@braks/revue-draggable';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router';
import store from './vuex/store';
import './assets/font/fonts.css'
import "./mock/index.js";
import Vuex from 'vuex'

const app = createApp(App)
app.use(ElementUI)
app.use(DraggablePlugin);
app.config.productionTip = false


app.use(router)
   .use(store)
    .use(Vuex)
   .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component)
}
