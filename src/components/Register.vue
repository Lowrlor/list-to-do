<template lang="pug">
.register-form
  .book
    .title
      p Register
    .error
      p {{emailError}}
      p {{passwordError}}
    .form
      form(@submit.prevent="register($refs.email.value, $refs.password.value)")
        .email--input
          .email--label
            label Email:
          input(ref='email' class='input-auth')
        .password--input
          .password--label
            label Password:
          input(ref='password' class='input-auth')
    .submit
      .submit--icon
        .arrow(@click='register($refs.email.value, $refs.password.value)')
          .text
            p Submit
    .login
      .login--icon
        .arrow-left(@click='moveToLogin()')
          .text
            p Login
</template>

<script>
export default {
  data () {
    return {
      emailError: undefined,
      passwordError: undefined
    }
  },
  methods: {
    register (email, password) {
      this.passwordError = undefined
      this.emailError = undefined
      this.$http
        .post('/users', { email, password })
        .then((response) => {
          this.$router.push('/login')
        })
        .catch(err => {
          err = this.$Err(err)
          this.passwordError = undefined
          this.emailError = undefined
          if (err.response.data.errors) {
            if (err.response.data.errors.password) {
              this.passwordError = err.response.data.errors.password.message
            }
            if (err.response.data.errors.email) {
              this.emailError = err.response.data.errors.email.message
            }
          }
        })
    },
    moveToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap');
.text {
  color: #c5c4c5;
  font-weight: 500;
}
p, a {
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
}
input {
  outline: none;
  color: #fff;
}
.email--label, .password--label {
  display: flex;
}

.submit--icon {
  position: absolute;
  top: 395px;
  left: 210px;
  width: 80px;
  cursor: pointer;
}
.arrow {
  position: relative;
}
.arrow::after, .arrow::before {
  content: '';
  position: absolute;
  width: 17%;
  height: 3px;
  right: 3px;
  background-color: #c5c4c5;
}

.arrow::after {
  top: 4px;
  transform: rotate(45deg);
}

.arrow::before {
  top: 12px;
  transform: rotate(-45deg);
}
//login
.login--icon {
  position: absolute;
  top: 395px;
  left: 48px;
  width: 75px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}
.arrow-left {
  position: relative;
}
.arrow-left::after, .arrow-left::before {
  content: '';
  position: absolute;
  width: 31%;
  height: 3px;
  right: 51px;
  background-color: #c5c4c5;
}

.arrow-left::after {
  top: 28px;
  transform: rotate(45deg);
}

.arrow-left::before {
  top: 20px;
  transform: rotate(-45deg);
}
//
.email--input, .password--input {
  z-index: 3;
  padding: 8px;
  position: relative;
  left: 75px;
  display: flex;
  flex-flow: column;
}
.input-auth {
  height: 20px;
  width: 160px;
  background: #D11F2F;
  border-radius: 20px;
  border: none;
  padding: 3px;
}
html, body{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
*, *:before, *:after {
  box-sizing: inherit;
}
*:before, *:after {
  content: "";
  position: absolute;
}
.book {
  width:280px;
  height:420px;
  transform: translate(-50%, -50%);
  background: #F33139;
  padding: 10px;
  background-image: linear-gradient(to right,#D11F2F 48px, #ba0716 50px, transparent 50px);
   //box-shadow:  2px 6px 40px 0px #FEA600
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px 12px 12px 10px;
}
.error {
  position: relative;
  top: 15px;
  left: 20px;
}
</style>
