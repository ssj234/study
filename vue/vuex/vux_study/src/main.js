// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'

import Button from "ant-design-vue/lib/button";
import Steps from "ant-design-vue/lib/steps";
import "ant-design-vue/dist/antd.css";

Vue.component(Button.name, Button);
Vue.component(Steps.name, Steps);
Vue.config.productionTip = false;
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
