<template lang="pug">
.list
  transition-group(name='list')
    ul(
      v-for='item, index in list'
      :key='item._id'
      class='ToDoList'
    )
      ListHeader(:item='item' :index='index')
      .form-add-task
        FormTask(:name='item.name' :index='index')
      TaskList(:tasks='item.tasks' :index='index' :_id='item._id' :editItem='item.name')
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
      newList: '',
      dropStartIndex: -1
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
        this.$store.dispatch('list/setlist', response)
      })
      .catch(err => {
        console.log(this.$Err(err))
      })
  }
}
</script>

<style lang="scss">
body {
  background-image: url(/download.png);
}
.ToDoList {
  border: 3px solid;
  border-radius: 1px 1px 15px 15px;
  margin-bottom: 25px;
  margin-left: 100px;
  margin-right: 100px;
  overflow: hidden;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
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
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
