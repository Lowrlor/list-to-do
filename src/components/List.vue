<template lang="pug">
.list
  ul(v-for='item, index in list' class='ToDoList')
    .item(@mouseenter = "Mouseover($event, true)" @mouseleave = "Mouseover($event, false)")
      p(v-if='!edit') {{item.name}}
      input(v-if='edit' v-model='data')
      .list-button
        button(v-if='!edit' @click='isedit(item)') Edit
        button(v-if='!edit' @click='removelist(index, item._id)') Delete
        button(v-if='edit' @click='saveedit(data, index)') Save
        button(v-if='edit' @click='isedit(item)') X
    .task-list
      ul(v-for='task, taskIndex in item.tasks') {{task}}
        button(@click='removeTask(item._id, index, taskIndex)') X
        button Edit
    .form-add-task
      FormTask(:name='item.name' :index='index')
  FormList
</template>

<script>
import FormList from '@/components/FormList.vue'
import FormTask from '@/components/FormTask.vue'

import { mapState } from 'vuex'

export default {
  name: 'List',
  data () {
    return {
      newList: '',
      edit: false,
      data: ''
    }
  },
  props: {
    name: String,
    index: Number
  },
  components: {
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
  },
  methods: {
    isedit (item) {
      if (this.edit) {
        this.edit = false
      } else {
        this.edit = true
      }
      this.data = item
    },
    saveedit (data, index) {
      this.$store.dispatch('list/saveedit', [data, index])
      this.newList = ''
      this.edit = false
    },
    removelist (index, id) {
      this.$http
        .delete('/list/remove/' + id)
        .then((response) => {
          this.$store.dispatch('list/removelist', index)
        })
    },
    removeTask (id, index, taskIndex) {
      console.log(taskIndex)
      this.$http
        .post('/task/remove/' + id, { index: taskIndex })
        .then((response) => {
          this.$store.dispatch('tasks/remove', { index, taskIndex })
        })
    },
    Mouseover (e, isMouseover) {
      if (isMouseover) {
        e.target.childNodes.[2].style.visibility = 'visible'
      } else {
        e.target.childNodes.[2].style.visibility = 'hidden'
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
