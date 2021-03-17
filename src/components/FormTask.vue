<template lang="pug">
.form-task
  form(@submit.prevent="savetask($event.target, index)")
    font-awesome-icon(icon="plus" class='plus')
    input(v-model='newTask' class='task-input')
    button(class='task-input-button') Add task
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
      if (item[0].value.length > 0) {
        this.$http
          .post('/task', { name: this.name, task: item[0].value })
          .then((response) => {
            return response.data
          })
          .then((response) => {
            this.$store.dispatch('tasks/add', [item[0].value, index])
            this.newTask = ''
          })
          .catch(err => {
            console.log(this.$Err(err))
          })
      }
    }
  }
}
</script>
<style lang='scss'>
.form-task {
  background: gray;
  height: 45px;
}
.task-input {
  width: 80%;
  position: relative;
}
.task-input-button {
  position: relative;
}
.plus {
  font-size: 30px;
  position: relative;
  top: 6.5px;
  right: 0.2%;
}
</style>
