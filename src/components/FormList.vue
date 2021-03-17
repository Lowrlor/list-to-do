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
  },
  computed: mapState({
    show: state => state.list.showForm,
    user: state => state.list.user
  }),
  methods: {
    showForm () {
      this.$store.dispatch('list/showform')
    },
    savelist (item) {
      if (item.[0].value) {
        this.$http
          .post('/list', { name: item.[0].value, owner_id: this.user._id }, { headers: { Authorization: this.user.token } })
          .then((response) => {
            return response.data
          })
          .then((response) => {
            this.$store.dispatch('list/addlist', response)
            this.newList = ''
          })
          .catch(err => {
            console.log(this.$Err(err))
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
    font-size: 20px;
    border: 2px solid #0b4ad7;
    background: #066ae1;
    color: white;
}
</style>
