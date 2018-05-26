import Vue from 'vue'
import Router from 'vue-router'

// pages
import People from '@/pages/People';
import PeopleDetail from '@/pages/PeopleDetail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: People
    }, {
      path: '/people',
      name: 'People',
      component: People
    }, {
      path: '/people/:id',
      name: 'PeopleDetail',
      component: PeopleDetail
    }, {
      path: '*',
      component: People
    }
  ]
})
