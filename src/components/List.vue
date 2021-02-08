<template lang="pug">
.list
  ul(v-for='item, index in list' class='ToDoList')
    ListHeader(:item='item' :index='index')
    .form-add-task
      FormTask(:name='item.name' :index='index')
    TaskList(:tasks='item.tasks' :index='index' :_id='item._id' :editItem='item.name')
  FormList(:emptyToDoList='emptyList')
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
      newList: '',
      emptyList: []
    }
  },
  props: {
    tasks: Array,
    item: Object,
    index: Number,
    _id: Number,
    name: String,
    emptyToDoList: Array
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
          .then(() => {
            this.checkList()
          })
      })
  },
  methods: {
    checkList () {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].tasks.length === 0) {
          this.emptyList.push(i)
        }
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background-image: url(/download.png);
}
.ToDoList {
  border: 3px solid;
  border-radius: 0 0 15px 15px;
  margin-bottom: 25px;
  margin-left: 100px;
  margin-right: 100px;
}
.icon {
  padding-left: 2px;
  padding-right: 2px;
}
* ul {
  padding-inline-start: 0;
}
* input {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
</style>
