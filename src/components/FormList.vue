<template lang="pug">
.form
  form(v-if='show' @submit.prevent="savelist($event.target)")
    input(v-model='newList')
    button Add
  button(@click='showForm' class='button') Add todo list
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormList',
  data () {
    return {
      newList: ''
    }
  },
  props: {
    emptyToDoList: Array
  },
  computed: mapState({
    show: state => state.list.showForm
  }),
  methods: {
    showForm () {
      this.$store.dispatch('list/showform')
    },
    savelist (item) {
      this.$http
        .post('/list', { name: item.[0].value })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('list/addlist', response)
          this.newList = ''
        })
    }
  },
  watch: {
    emptyToDoList () {
      for (var i = 0; i < this.emptyToDoList.length; i++) {
        var element = document.getElementsByClassName('form-task').[this.emptyToDoList.[i]]
        element.style.borderRadius = '0 0 10px 10px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
    font-size: 20px;
    border: 0;
    background: #066ae1;
    color: white;
}
</style>
