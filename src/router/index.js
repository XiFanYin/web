import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/welcome",
    children: [{
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../views/Welcome')
    },
    {
      path: '/admin/menu',
      name: 'menuManager',
      component: () => import('../views/MenuManager')
    },
    {
      path: '/admin/dept',
      name: 'rights',
      component: () => import('../views/Rights')
    },
  
  
  ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token') || to.path === "/login") {
    return next()
  } else {
    return next("/login")
  }

});



export default router