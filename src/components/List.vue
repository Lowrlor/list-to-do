<template lang="pug">
.list
  ul(v-for='item, index in list' class='ToDoList')
    .list--header
      div(style="display: flex")
        font-awesome-icon(icon="calendar-alt" class='calendar')
        input(v-if='edit && thisIndex === index' v-model='item.name' class='list-input')
        p(v-else) {{item.name}}
      .list--button
        font-awesome-icon(icon="pen")(v-if='!edit' @click='listEditing(item, index)')
        font-awesome-icon(icon="trash-alt")(v-if='!edit' @click='removelist(index, item._id)')
        button(v-if='edit' @click='saveedit(item.name, index, item._id)') Save
        button(v-if='edit' @click='listEditing(item)') X
    .task-list
      ul(v-for='task, taskIndex in item.tasks')
        .task
          input(v-if='isTaskEditing && taskIndex === thistaskIndex' v-model='taskData' class='list-input')
          p(v-else) {{task}}
          .task-button
            div(v-if='isTaskEditing && taskIndex === thistaskIndex')
              button(@click='saveTaskEdit(item._id, index, taskIndex)') Save
              button(@click='taskEditing(index)') X
            div(v-else)
              .move
                .move--up
                  font-awesome-icon(icon="chevron-up")(@click='move("up", index, taskIndex, item._id)')
                .move--down
                  font-awesome-icon(icon="chevron-down")(@click='move("down", index, taskIndex, item._id)')
              font-awesome-icon(icon="trash-alt")(@click='removeTask(item._id, index, taskIndex)')
              font-awesome-icon(icon="pen")(@click='taskEditing(taskIndex, task)')
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
      isTaskEditing: false,
      data: '',
      thisIndex: -1,
      thistaskIndex: -1,
      taskData: ''
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
    listEditing (item, index) {
      if (this.edit) {
        this.edit = false
        this.thisIndex = -1
      } else {
        this.thisIndex = index
        this.edit = true
      }
    },
    taskEditing (taskIndex, item) {
      if (this.isTaskEditing) {
        this.isTaskEditing = false
        this.thistaskIndex = -1
      } else {
        this.isTaskEditing = true
        this.thistaskIndex = taskIndex
      }
      this.taskData = item
    },
    move (side, index, taskIndex, itemId) {
      this.$http
        .post('/task/move', { side, index, taskIndex, id: itemId })
        .then((response) => {
          this.$store.dispatch('tasks/move', { side, index, taskIndex })
        })
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
      this.$http
        .post('/task/remove/' + id, { index: taskIndex })
        .then((response) => {
          this.$store.dispatch('tasks/remove', { index, taskIndex })
        })
    },
    saveTaskEdit (id, index, taskIndex) {
      this.isTaskEditing = false
      this.$http
        .post('/task/edit/' + id, { task: this.taskData, index })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('tasks/edit', { index, taskIndex, data: this.taskData })
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    }
  }
}
</script>

<style lang="scss">
.ToDoList {
  border: 3px solid;
  border-radius: 0 0 15px 15px;
}
.list--header {
  background: linear-gradient(0deg, rgba(7,24,167,1) 22%, rgba(11,115,238,1) 50%);
  color: #fff;
  box-shadow: inset 0px .5px 0px 0px #ada6a6;
  display: flex;
  justify-content: space-between;
}
.list--button {
  opacity: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  .list--header:hover & {
    opacity: 1;
  }
}
.list-input {
  height: 30px;
  width: 150px;
}
.calendar {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.task {
  display: flex;
  justify-content: space-between;
}
.task-button {
  margin-block-start: 1em;
  margin-block-end: 1em;
  opacity: 0;
  .task:hover & {
    opacity: 1;
  }
}
* ul {
  padding-inline-start: 0;
}
* input {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.move {
  display: inline-grid;
  position: relative;
  bottom: 9px;
}
</style>
