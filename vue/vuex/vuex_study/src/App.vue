<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementAction">(+5 1s delay)</button>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    increment () {
        this.$store.commit('increment',2)
    },
    decrement () {
        this.$store.commit('decrement',1)
    },
    incrementAction () {
        this.$store.dispatch('increment',5)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
