import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home'
import Signin from './views/Signin'
import Dashboard from './views/Dashboard'
import DashboardGreeting from './views/Dashboard/DashboardGreeting'
import AddPost from './views/Dashboard/AddPost'
import ListPosts from './views/Dashboard/ListPosts'

Vue.use(Router)

const authGuard = {
  beforeEnter: (to, from, next) => {
    const redirect = () => {
      if (store.state.admin.token) {
        if (to.path === '/signin') next('/dashboard')
        else next()
      } else {
        if (to.path === '/signin') next()
        else next('/')
      }
    }

    if (store.state.admin.refreshLoading) {
      store.watch((state, getters) => getters['admin/refreshLoading'], () => redirect())
    } else {
      redirect()
    }
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      ...authGuard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        { path: '/', component: DashboardGreeting },
        { path: 'add_post', component: AddPost },
        { path: 'list_posts', component: ListPosts }
      ],
      ...authGuard
    }
  ]
})
