<template lang="pug">
.task-list
  .trash-tasklist(v-if='checkbox.length > 0' @click='removeTaskFromCheckBox(checkbox, index, _id)')
    font-awesome-icon(icon="trash-alt" class='trash-icon-tasklist')()
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
          @focus='disableDraggable(taskIndex, task)'
          ref='searchInput'
          v-on:keyup.enter='onEnter(_id, taskIndex, index)'
          v-on:keyup.esc='backToOldData(taskIndex)'
          @keydown="$event.keyCode === 13 ? $event.preventDefault() : false"
          toggle-nav='taskEdit(taskIndex, task, index)'
        )
      template(v-else)
        label(@click='onCheckbox($event, index, taskIndex)' class='checkbox-label ')
          input(
            type='checkbox'
            class='checkbox'
          )
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
      oldData: '',
      oldDataForInput: '',
      checkbox: []
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
          if (this.editable) {
            this.$refs.searchInput.[0].style.width = item.length * 8 + 'px'
            this.focusing(this.$refs)
            this.oldDataForInput = this.data
          } else {
            this.data = this.oldDataForInput
            this.input = false
          }
        })
        .catch(err => {
          console.log(err)
          console.log(this.$Err(err))
        })
    },
    focusing (ref) {
      if (this.editable) {
        ref.searchInput.[0].focus()
      }
    },
    startDrag (evt, index, taskIndex) {
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
      this.$children[0].updateTask(id, taskIndex, index)
    },
    backToOldData (taskIndex) {
      this.data = this.oldData
    },
    onCheckbox (checked, index, taskIndex) {
      if (checked.target.checked === true) {
        this.checkbox.push(taskIndex)
      }
      if (checked.target.checked === false) {
        this.checkbox.splice(this.checkbox.indexOf(taskIndex), 1)
      }
    },
    removeTaskFromCheckBox (checkbox, index, _id) {
      this.$http
        .post('task/removetasks/' + _id, { checkbox })
        .then((response) => {
          this.$store.dispatch('tasks/removebycheckbox', { checkbox, index })
            .then(() => {
              var checkbox = document.getElementsByClassName('checkbox')
              for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false
              }
              this.checkbox = []
            })
        })
        .catch((err) => {
          console.log(err)
          console.log(this.$Err(err))
        })
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
  border-radius: 0 0 10px 10px;
}
.span:last-child {
  border-radius: 0 0 10px 10px;
}
.trash-tasklist {
  background: #fff;
  border-bottom: solid 1px gray;
  height: 35px;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
}
.trash-icon-tasklist {
  position: relative;
  right: 5px;
}
.checkbox-label {
  width: 45px;
}
</style>
