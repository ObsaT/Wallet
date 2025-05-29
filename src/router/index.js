// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InfoList from '../views/InfoList.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/info', name: 'Info', component: InfoList  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
