import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Levels from '@/components/Levels'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/:level',
      name: 'level',
      component: Levels
    }
  ],
  mode: 'history'
})
