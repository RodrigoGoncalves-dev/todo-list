import Vue from 'vue';
import router from './router';
import App from './App.vue';

import '@/assets/css/tailwind.css';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');