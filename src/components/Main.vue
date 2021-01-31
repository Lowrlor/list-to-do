<template lang="pug">
.main
  .list
    ul(v-for='item, index in list' class='ToDoList')
      .item(@mouseenter = "Mouseover($event, true)" @mouseleave = "Mouseover($event, false)")
        p(v-if='!edit') {{item}}
        input(v-if='edit' v-model='data')
        .list-button
          button(v-if='!edit' @click='isedit(item)') Edit
          button(v-if='!edit' @click='removelist(index)') Delete
          button(v-if='edit' @click='saveedit(data, index)') Save
          button(v-if='edit' @click='isedit(item)') X
      .input-add-task
        form
          input
          button Add task
  .form
    form(v-if='show' @submit.prevent="savelist($event.target)")
      input(v-model='newList')
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
      newList: '',
      edit: false,
      data: ''
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
    savelist (item) {
      this.$store.dispatch('savelist', item.[0].value)
      this.newList = ''
    },
    isedit (item) {
      if (this.edit) {
        this.edit = false
      } else {
        this.edit = true
      }
      this.data = item
    },
    saveedit (data, index) {
      this.$store.dispatch('saveedit', [data, index])
      this.newList = ''
      this.edit = false
    },
    removelist (index) {
      this.$store.dispatch('removelist', index)
    },
    Mouseover (e, isMouseover) {
      if (isMouseover) {
        e.target.childNodes.[2].style.visibility = 'visible'
      } else {
        e.target.childNodes.[2].style.visibility = 'hidden'
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
