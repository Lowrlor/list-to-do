<template lang="pug">
.task-list
  ul(v-for='task, taskIndex in tasks')
    .task
      template(v-if='editable && taskIndex === thisTaskIndex && thisIndex === index')
        input(
          v-model='data'
          @blur='updateTask(_id, taskIndex, index)'
          class='list-input'
          ref='searchInput'
        )
      template(v-else)
        span(@click='taskEdit(taskIndex, task, index)' ref='span').span
          p(ref='text') {{task}}
      TaskButton(
        :index='index'
        :_id='_id'
        :task='task'
        :taskIndex='taskIndex'
        :dataFromInput='data'
      )
</template>

<script>
import { mapState } from 'vuex'
import TaskButton from '@/components/TaskButton.vue'

export default {
  name: 'TaskList',
  data () {
    return {
      data: ''
    }
  },
  props: {
    tasks: Array,
    listData: Object,
    index: Number,
    _id: String,
    task: String,
    taskIndex: Number,
    dataFromInput: String
  },
  components: {
    TaskButton
  },
  computed: mapState({
    list: state => state.list.todolist,
    taskData: state => state.tasks.taskData,
    editable: state => state.tasks.editable,
    thisIndex: state => state.tasks.listIndex,
    thisTaskIndex: state => state.tasks.thisTaskIndex
  }),
  methods: {
    taskEdit (taskIndex, item, index) {
      this.$store.dispatch('tasks/taskedit', { item, taskIndex, index })
        .then(() => {
          this.focusing(this.$refs)
        })
    },
    updateTask (id, taskIndex, index) {
      console.log('blure')
      this.$http
        .post('/task/edit/' + id, { task: this.data, taskIndex })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('tasks/update', { index, taskIndex, data: this.data })
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    },
    focusing (ref) {
      if (this.editable) {
        ref.searchInput.[0].focus()
      }
    }
  },
  watch: {
    taskData: function (value) {
      this.data = value
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: #f7ee0e91;
  }
.span {
  width: 90%;
  display: flex;
}
}
</style>
