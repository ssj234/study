import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Book from '@/components/Book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
      	{name: 'HelloWorld', path: '/hello', component:HelloWorld},
      	{name: 'Book', path: '/book/:id', component:Book},
      ]
    }
  ]
})
