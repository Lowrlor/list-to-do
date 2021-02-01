<template lang="pug">
.list
  ul(v-for='item, index in list' class='ToDoList')
    .item(@mouseenter = "Mouseover($event, true)" @mouseleave = "Mouseover($event, false)")
      input(v-if='edit && thisIndex === index' v-model='item.name')
      p(v-else) {{item.name}}
      .list-button
        button(v-if='!edit' @click='isedit(item, index)') Edit
        button(v-if='!edit' @click='removelist(index, item._id)') Delete
        button(v-if='edit' @click='saveedit(item.name, index, item._id)') Save
        button(v-if='edit' @click='isedit(item)') X
    .task-list
      ul(v-for='task, taskIndex in item.tasks')
        .task
          p() {{task}}
          .task-button
            button(@click='removeTask(item._id, index, taskIndex)') X
            button() Edit
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
      data: '',
      thisIndex: -1
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
    isedit (item, index) {
      if (this.edit) {
        this.edit = false
        this.thisIndex = -1
      } else {
        this.thisIndex = index
        this.edit = true
      }
    },
    saveedit (data, index, id) {
      this.$http
        .post('/list/edit/' + id, { name: data })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('list/saveedit', [response, index])
          this.newList = ''
          this.edit = false
          this.i = ''
        })
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
        e.target.childNodes.[1].style.visibility = 'visible'
      } else {
        e.target.childNodes.[1].style.visibility = 'hidden'
      }
    }
  }
}
</script>

<style lang="scss">
.task {
  display: flex;
}
.task-button {
  position: relative;
  top: 15px
}
</style>
