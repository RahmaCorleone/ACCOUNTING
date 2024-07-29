import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LoginPage.vue'
import Signup from '../components/SignUPP.vue'
import Home from '../components/HomePage.vue'
import ProviderList from '../components/ProviderList.vue'
import InvoiceList from '../components/InvoiceList.vue'
import InvoiceLine from '../components/InvoiceLine.vue'


const routes = [
    { path: '/', component: Signup },
    { path: '/login', component: Login },
    { path: '/home', component: Home, children: [
      { path: 'providers', component: ProviderList },
      { path: 'InvoiceList', component: InvoiceList },
      { path: 'InvoiceLine', component: InvoiceLine },

    ]}
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
