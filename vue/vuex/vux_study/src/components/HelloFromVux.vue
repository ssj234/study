<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>

     <button-tab>
        <button-tab-item @on-item-click="click">Today</button-tab-item>
        <button-tab-item @on-item-click="click" selected>This Week</button-tab-item>
        <button-tab-item @on-item-click="click">This Month</button-tab-item>
      </button-tab>

    <x-button type='primary'>clicktext</x-button>
    <Card title="卡片标题">卡片内容</Card>

    <a-button type="primary">Button</a-button>

    <a-steps :current="1">
    <a-step>
      <!-- <span slot="title">Finished</span> -->
      <template slot="title">
        Finished
      </template>
      <span slot="description">This is a description.</span>
    </a-step>
    <a-step title="In Progress" description="This is a description." />
    <a-step title="Waiting" description="This is a description." />
  </a-steps>

  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { ButtonTab, ButtonTabItem } from 'vux'
import { XButton } from 'vux'
export default {
  components: {
    Group,
    Cell,
     ButtonTab,
    ButtonTabItem,
    XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  methods: {
    click (index) {
      console.log('index is ' + index)
    }
  },
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
