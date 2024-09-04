import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: import('../views/LoginView.vue'),
  },
  {
    path: '/contacts',
    name: 'ContactsView',
    component: import('../views/ContactsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
