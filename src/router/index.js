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
      path: '/users',
      name: 'userslist',
      component: () => import('../views/UsersList')
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
  base: process.env.BASE_URL,
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