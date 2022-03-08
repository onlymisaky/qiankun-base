import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from './store';

const baseApp = createApp(App);
baseApp
  .use(router)
  .use(createStore())
  .mount('#app');
