<template lang="pug">
li.list-header
  div(style="display: flex")
    font-awesome-icon(icon="calendar-alt" class='calendar')
    input(v-if='editable && thisIndex === index' v-model='item.name' class='list-input')
    p(v-else) {{item.name}}
  div
    ListButton(:item='item' :index='index')
</template>

<script>
import { mapState } from 'vuex'
import ListButton from '@/components/ListButton.vue'

export default {
  name: 'ListHeader',
  props: {
    item: Object,
    index: Number
  },
  components: {
    ListButton
  },
  computed: mapState({
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
</style>
