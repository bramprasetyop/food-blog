import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Details from './views/Details.vue'
import Post from './views/Post.vue'
import Contact from './views/Contact.vue'






Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/content/:id',
      name: 'content',
      component: Details
    }, {
      path: '/post',
      name: 'Article',
      component: Post
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ],
  mode: 'history'
})