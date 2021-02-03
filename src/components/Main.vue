<template lang="pug">
.main
  List
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    List
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.ToDoList {
  border: 3px solid;
  border-radius: 0 0 15px 15px;
}
</style>
