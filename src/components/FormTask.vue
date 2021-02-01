<template lang="pug">
.form
  form(@submit.prevent="savetask($event.target, index)")
    input(v-model='newTask')
    button Add task
</template>

<script>
export default {
  data () {
    return {
      newTask: ''
    }
  },
  props: {
    name: String,
    index: Number
  },
  methods: {
    savetask (item, index) {
      console.log(item)
      console.log(index)
      console.log(this.name)
      this.$http
        .post('/task', { name: this.name, task: item[0].value })
        .then((response) => {
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('tasks/add', [item[0].value, index])
          this.newTask = ''
        })
    }
  }
}
</script>
