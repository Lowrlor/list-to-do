<template lang="pug">
.main
  .form
    form(v-if='show')
      input
      button Add
  .button
    button(@click='showForm') Add to do list
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  computed: mapState({
    show: state => state.showForm
  }),
  methods: {
    showForm () {
      this.$store.dispatch('showform')
    }
  }
}
</script>
