import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/items' },
    { path: '/items', name: 'home', component: HomeView },
    { path: '/item/:id', name: 'detail', component: DetailView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})