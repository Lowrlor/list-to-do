<template lang="pug">
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
  name: 'FormList',
  data () {
    return {
      newList: ''
    }
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
  }
}
</script>

<style lang="css" scoped>
</style>
