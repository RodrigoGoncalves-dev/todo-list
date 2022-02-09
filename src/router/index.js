import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import RegisterCard from '@/components/Register/RegisterCard';
import VerifyEmail from '@/views/VerifyEmail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registrar',
    name: 'RegisterCard',
    component: RegisterCard,
  },
  {
    path: '/verificar-email',
    name: 'VerifyEmail',
    component: VerifyEmail,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
});

export default router;
