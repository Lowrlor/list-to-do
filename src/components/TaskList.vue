<template lang="pug">
.task-list
  li(
    v-for='task, taskIndex in tasks'
    draggable
    @dragstart='startDrag($event, index, taskIndex)'
    @drop='onDrop($event, taskIndex, index, dropStartIndex, _id)'
    @dragover.prevent
    @dragenter.prevent
    class='drag-el'
  )
    .task
      template(v-if='editable && taskIndex === thisTaskIndex && thisIndex === index')
        input(
          v-model='data'
          @blur='updateTask(_id, taskIndex, index)'
          @focus='disableDraggable(taskIndex, task)'
          class='task-textarea'
          ref='searchInput'
          id='txtArea'
          v-on:keyup.enter='onEnter(_id, taskIndex, index)'
          v-on:keyup.esc='backToOldData(taskIndex)'
          @keydown="$event.keyCode === 13 ? $event.preventDefault() : false"
          toggle-nav='taskEdit(taskIndex, task, index)'
        )
      template(v-else)
        span(@click='taskEdit(taskIndex, task, index)').span
          p(class='text') {{task}}
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
      data: '',
      input: false,
      oldData: ''
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
    thisTaskIndex: state => state.tasks.thisTaskIndex,
    dropStartIndex: state => state.tasks.dropStartIndex
  }),
  methods: {
    taskEdit (taskIndex, item, index) {
      this.$store.dispatch('tasks/taskedit', { item, taskIndex, index })
        .then(() => {
          this.$refs.searchInput.[0].style.width = item.length * 8 + 'px'
          this.focusing(this.$refs)
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    },
    updateTask (id, taskIndex, index) {
      this.$http
        .post('/task/edit/' + id, { task: this.data.trim(), taskIndex })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('tasks/update', { index, taskIndex, data: this.data.trim() })
          document.getElementsByClassName('drag-el')[taskIndex].draggable = true
          this.input = false
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    },
    focusing (ref) {
      if (this.editable) {
        ref.searchInput.[0].focus()
      }
    },
    startDrag (evt, index, taskIndex) {
      console.log('there')
      document.getElementsByClassName('ToDoList')[index].draggable = false
      this.$store.dispatch('tasks/saveindex', { index, dropStartIndex: taskIndex })
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
    },
    onDrop (evt, taskIndex, index, dropStartIndex, _id) {
      this.$http
        .post('/task/dropmove', { onDropIndex: taskIndex, index, dropStartIndex, id: _id })
        .then((response) => {
          this.$store.dispatch('tasks/dropmove', { onDropIndex: taskIndex })
            .then(() => {
              document.getElementsByClassName('ToDoList')[index].draggable = true
            })
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    },
    disableDraggable (taskIndex, task) {
      document.getElementsByClassName('drag-el')[taskIndex].draggable = false
      this.input = true
      this.oldData = task
    },
    onEnter (id, taskIndex, index) {
      this.updateTask(id, taskIndex, index)
    },
    backToOldData (taskIndex) {
      this.data = this.oldData
    }
  },
  watch: {
    taskData: function (value) {
      this.data = value
    },
    data: function (value) {
      if (this.input) {
        this.$refs.searchInput.[0].style.width = value.length * 8 + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  word-break: break-all;
  text-align: left;
}
.span {
  width: 90%;
  display: flex;
}
.task-textarea {
  resize: none;
  border: 0 none white;
  overflow: hidden;
  padding: 0;
  border-radius: 0 0 0 0;
  height: '18px'
}
ul {
  padding: 0;
}
li {
  display: block;
  background: white;
  border-bottom: solid 1px gray;
  &:hover {
    background: #f7ee0e91;
  }
}
li:last-child {
  border-radius: 0 0 10px 10px
}
.span:last-child {
  border-radius: 0 0 10px 10px
}
</style>
