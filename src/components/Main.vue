<template lang="pug">
.main
  .list
    ul(
      v-for='item in list'
      class='ToDoList'
    )
      .item(
        @mouseenter = "Mouseover($event, true)"
        @mouseleave = "Mouseover($event, false)"
      )
        p {{item}}
        .list-button
          button() Edit
          button() Delete
      .input-add-task
        form
          input
          button Add task
  .form
    form(v-if='show' @submit.prevent="save($event.target)")
      input
      button Add
  .button
    button(@click='showForm') Add todo list
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  data () {
    return {
    }
  },
  computed: mapState({
    show: state => state.showForm,
    list: state => state.todolist
  }),
  methods: {
    showForm () {
      this.$store.dispatch('showform')
    },
    save (item) {
      this.$store.dispatch('savelist', item.[0].value)
    },
    Mouseover (e, isMouseover) {
      if (isMouseover) {
        e.target.childNodes.[1].style.visibility = 'visible'
      } else {
        e.target.childNodes.[1].style.visibility = 'hidden'
      }
    }
  }
}
</script>
<style lang="scss">
.ToDoList {
  border: 3px solid;
  border-radius: 0 0 15px 15px;
}
.list-button {
  visibility: hidden;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.item {
  display: inline-flex;
}
</style>
