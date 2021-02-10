<template lang="pug">
.list-header
  .input-with-text
    font-awesome-icon(icon="calendar-alt" class='calendar' class='icon')
    input(
      v-if='editable && thisIndex === index'
      v-model='item.name'
      class='list-input'
      ref='list-input'
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
  })
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
.input-with-text {
  display: flex;
}
</style>
