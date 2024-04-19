import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomePageView.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MenuView.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/PersonView.vue'),
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('../views/CreateFoodView.vue'),
  },
  {
    path: '/drink',
    name: 'drink',
    component: () => import('../views/CreateDrinkView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
