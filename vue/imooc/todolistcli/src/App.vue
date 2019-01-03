<template>
  <div>
    <input class="item" v-model="myvalue"/>
    <button @click="submit">submit</button>
    <ul>
      <todo-item v-for="(item,index) in list" :content="item" :key="index" :index="index" @delete="handleDelete"></todo-item>
    </ul>
  </div>
</template>

<script>
// import component from ToDoItem.vue
// must defined mapping tag->component
// define prop transfer var from parent-comp to child-comp
import TodoItem from './components/ToDoItem.vue'
export default {
  components: {
    'todo-item': TodoItem
  },
  data: function () {
    return {
      myvalue: '',
      list: []
    }
  },
  props: ['index'],
  methods: {
    submit: function () {
      this.list.push(this.myvalue)
      this.myvalue = ''
    },
    handleDelete: function (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>
.item{
  color:blue
}
</style>
