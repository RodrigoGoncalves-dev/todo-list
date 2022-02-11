import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import RegisterCard from '@/components/Register/RegisterCard';
import VerifyEmail from '@/views/VerifyEmail';
import ForgotPassword from '@/views/ForgotPassword';
import DefaultBackground from '@/components/DefaultBackground';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: DefaultBackground,
    children: [
      { path: '', name: 'login', component: Login },
    ],
  },
  {
    path: '/registrar',
    component: DefaultBackground,
    children: [
      { path: '', name: 'registerCard', component: RegisterCard },
    ],
  },
  {
    path: '/verificar-email',
    component: DefaultBackground,
    children: [
      { path: '', name: 'verifyEmail', component: VerifyEmail },
    ],
  },
  {
    path: '/esqueceu-senha', component: DefaultBackground,
    children: [
      { path: '', name: 'forgotPassword', component: ForgotPassword },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
});

export default router;
