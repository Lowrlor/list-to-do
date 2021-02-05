<template lang="pug">
.list
  ul(v-for='item, index in list' class='ToDoList')
    ListHeader(:item='item' :index='index')
    TaskList(:tasks='item.tasks' :index='index' :_id='item._id' :editItem='item.name')
    .form-add-task
      FormTask(:name='item.name' :index='index')
  FormList
</template>

<script>
import ListHeader from '@/components/ListHeader.vue'
import ListButton from '@/components/ListButton.vue'
import FormList from '@/components/FormList.vue'
import TaskList from '@/components/TaskList.vue'
import FormTask from '@/components/FormTask.vue'

import { mapState } from 'vuex'

export default {
  name: 'List',
  data () {
    return {
      newList: ''
    }
  },
  props: {
    tasks: Array,
    item: Object,
    index: Number,
    _id: Number,
    name: String
  },
  components: {
    ListButton,
    ListHeader,
    TaskList,
    FormList,
    FormTask
  },
  computed: mapState({
    show: state => state.list.showForm,
    list: state => state.list.todolist
  }),
  mounted () {
    this.$http
      .get('/list/')
      .then((response) => {
        return response.data
      })
      .then((response) => {
        this.$store.dispatch('list/getlist', response)
      })
  }
}
</script>

<style lang="scss">
.ToDoList {
  border: 3px solid;
  border-radius: 0 0 15px 15px;
}
* ul {
  padding-inline-start: 0;
}
* input {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
</style>
