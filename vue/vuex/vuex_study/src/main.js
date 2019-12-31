// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex';
import App from './App'


Vue.config.productionTip = false
Vue.use(Vuex)
/* eslint-disable no-new */

var store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: (state,n) => state.count += n,
        decrement: (state,n) => state.count -= n
    },
    getters: {
      count10: state=>{
        return state.count * 10;
      }
    },
    actions: {
      increment ({ commit },count) {
        setTimeout(function(){
          commit('increment',count)
        },1000);
      }
    }
});

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
