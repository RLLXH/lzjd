import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Grad from '../pageDetail/grad.vue'
import Loading from '../pageDetail/loading.vue'
import Registered from '../pageDetail/registered.vue'
import StaffManagement from '../pageDetail/staffManagement.vue'
import Announcement from '../pageDetail/announcement.vue'
import Dictionary from '../pageDetail/dictionary.vue'
import applicationManagement from '../pageDetail/applicationManagement.vue'
import applicationManagementAddNew from '../pageDetail/applicationManagement/applicationManagementAddNew.vue'
import employeesView from '../pageDetail/employees/employeesView.vue'
import orderManegement from '../pageDetail/orderManegement'
import companyIntroduction from '../pageDetail/companyIntroduction.vue'
import serveType from '../pageDetail/serveType'
import chooseServe from '../pageDetail/chooseServe'
import couManagement from '../pageDetail/couManagement'
import wageManagement from '../pageDetail/wageManagement'
import personalInfo from "../pageDetail/personalInfo"
import articleWagesManagement from "../pageDetail/articleWagesManagement"
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
      }, {
        path: 'Loading',
        name: '登陆',
        component: Loading
      }, {
        path: 'Registered',
        name: '注册',
        component: Registered
      }, {
        path: 'StaffManagement',
        name: '员工管理',
        component: StaffManagement
      }, {
        path: 'Announcement',
        name: '公告列表',
        component: Announcement
      }, {
        path: 'Dictionary',
        name: '字典管理',
        component: Dictionary
      }, {
        path: 'applicationManagement',
        name: '申请管理',
        component: applicationManagement
      }, {
        path: 'applicationManagementAddNew',
        name: '新增申请',
        component: applicationManagementAddNew
      }, {
        path: 'employeesView',
        name: '员工信息',
        component: employeesView
      },{
        path: 'orderManegement',
        name: '订单管理',
        component: orderManegement
      },
      {
        path: 'companyIntroduction',
        name: '公司介绍',
        component: companyIntroduction
      },
      {
        path: 'serveType',
        name: '公司介绍',
        component: serveType
      },
      {
        path: 'chooseServe',
        name: '人员预约',
        component: chooseServe
      },
      {
        path: 'couManagement',
        name: '客户管理',
        component: couManagement
      },
      {
        path: 'wageManagement',
        name: '工资管理',
        component: wageManagement
      },
      {
        path: 'personalInfo',
        name: '个人信息',
        component: personalInfo
      },
      {
        path: 'articleWagesManagement',
        name: '工资条管理',
        component: articleWagesManagement
      },
      ]
    }
  ]
})
