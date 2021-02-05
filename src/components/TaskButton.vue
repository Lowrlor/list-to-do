<template lang="pug">
.task-button
  template(v-if='editable && taskIndex === thisTaskIndex && index === thisIndex')
    button(@click='updateTask(_id, index, taskIndex)') Save
    button(@click='taskEdit(index)') X
  template(v-else)
    .move
      .move--up
        font-awesome-icon(icon="chevron-up")(@click='moveTask("up", index, taskIndex, _id)')
      .move--down
        font-awesome-icon(icon="chevron-down")(@click='moveTask("down", index, taskIndex, _id)')
    font-awesome-icon(icon="trash-alt")(@click='removeTask(_id, index, taskIndex)')
    font-awesome-icon(icon="pen")(@click='taskEdit(taskIndex, task, index)')
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TaskButton',
  props: {
    index: Number,
    taskIndex: Number,
    _id: String,
    task: String,
    dataFromInput: String
  },
  data () {
    return {
    }
  },
  computed: mapState({
    editable: state => state.tasks.editable,
    thisTaskIndex: state => state.tasks.thisTaskIndex,
    thisIndex: state => state.tasks.listIndex
  }),
  methods: {
    updateTask (id, index, taskIndex) {
      this.$http
        .post('/task/edit/' + id, { task: this.dataFromInput, taskIndex })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('tasks/update', { index, taskIndex, data: this.dataFromInput })
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    },
    removeTask (id, index, taskIndex) {
      this.$http
        .post('/task/remove/' + id, { index: taskIndex })
        .then((response) => {
          this.$store.dispatch('tasks/remove', { index, taskIndex })
        })
    },
    taskEdit (taskIndex, item, index) {
      console.log(this.thisIndex)
      console.log(this.index)
      this.$store.dispatch('tasks/taskedit', { item, taskIndex, index })
    },
    moveTask (side, index, taskIndex, itemId) {
      this.$http
        .post('/task/move', { side, index, taskIndex, id: itemId })
        .then((response) => {
          this.$store.dispatch('tasks/move', { side, index, taskIndex })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.task-button {
  display: flex;
  opacity: 0;
  .task:hover & {
    opacity: 1;
  }
}
.move {
  display: inline-grid;
  position: relative;
  bottom: 9px;
}
</style>
