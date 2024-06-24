import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' } // Redirect to home page
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guards
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     if (!store.getters.isAuthenticated) {
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   } else if (to.meta.requiresGuest) {
//     if (store.getters.isAuthenticated) {
//       next({ name: 'home' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router