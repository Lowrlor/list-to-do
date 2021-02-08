<template lang="pug">
.list-header
  div(style="display: flex")
    font-awesome-icon(icon="calendar-alt" class='calendar' class='icon')
    input(v-if='editable && thisIndex === index'
    v-model='item.name'
    class='list-input'
    )
    p(v-else) {{item.name}}
  div
    ListButton(:item='item' :index='index')
</template>

<script>
import { mapState } from 'vuex'
import ListButton from '@/components/ListButton.vue'

export default {
  name: 'ListHeader',
  data () {
    return {
      data: '',
      oldData: ''
    }
  },
  props: {
    item: Object,
    index: Number
  },
  components: {
    ListButton
  },
  computed: mapState({
    todolist: state => state.list.todolist,
    editable: state => state.list.editable,
    thisIndex: state => state.list.thisIndex
  }),
  watch: {
    todolist (val) {
      console.log(val)
      for (var i = 0; i < val.length; i++) {
        var element = document.getElementsByClassName('form-task').[i]
        if (val[i].tasks.length === 0) {
          console.log('here')
          console.log(element)
          element.style.borderRadius = '1px 1px 10px 10px'
        } else {
          console.log('there')
          element.style.borderRadius = '1px 1px 0 0'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-header {
  background: linear-gradient(0deg, rgba(7,24,167,1) 22%, rgba(11,115,238,1) 50%);
  color: #fff;
  box-shadow: inset 0px .5px 0px 0px #ada6a6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.icon {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
