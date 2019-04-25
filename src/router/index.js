import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Grad from '../pageDetail/grad.vue'
import Loading from '../pageDetail/loading.vue'
import Registered from '../pageDetail/registered.vue'
import StaffManagement from '../pageDetail/staffManagement.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index/Grad'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [{
        path: 'Grad',
        name: '首页',
        component: Grad,
      },{
        path:'Loading',
        name:'登陆',
        component:Loading
      },{
        path:'Registered',
        name:'注册',
        component:Registered
      },{
        path:'StaffManagement',
        name:'员工管理',
        component:StaffManagement
      }
      ]
    }
  ]
})
