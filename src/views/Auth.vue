<template lang='pug'>
.auth
  Register(v-if='isRegister')
  Login(v-else)
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'Auth',
  components: {
    Register,
    Login
  },
  computed: {
    isRegister () {
      if (this.$route.name === 'Register') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
