import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import '@/plugins/vee-validate.js';
import '@/plugins/axios.js';

import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
