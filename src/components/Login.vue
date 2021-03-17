<template lang='pug'>
.login-form
  .book
    .title
      p Login
    .form
      form(@submit.prevent='login(email, password)')
        .error
          template(v-if='error') {{error}}
        .email--input
          .email--label
            label Email:
          input(v-model='email' class='input-auth')
        .password--input
          .password--label
            label Password:
          input(v-model='password' class='input-auth')
    .submit
      .submit--icon
        .arrow(@click='login(email, password)')
          .text
            p Submit
    .register
      .register--icon
        .arrow-left(@click='moveToRegister')
          .text
            p Register
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    user: state => state.list.user
  }),
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    moveBook (email, password) {
      const book = document.querySelector('.book')
      book.style.transform = 'translate(0%, -50%)'
      setTimeout(() => {
        this.$router.push('/')
      }, 1100)
    },
    login (email, password) {
      this.$store.dispatch('list/login', { email, password })
        .then((res) => {
          if (!res.data.error) {
            this.error = null
            const dbName = 'List'
            var request = indexedDB.open(dbName, 2)
            request.onsuccess = function () {
              const db = request.result
              var objectStore = db.transaction(['User'], 'readwrite').objectStore('User')
              request = objectStore.get('user')
              request.onsuccess = function (event) {
                var data = event.target.result
                data.token = res.data.user.token
                var requestUpdate = objectStore.put(data, 'user')
                requestUpdate.onsuccess = function (event) {
                }
              }
            }
            setTimeout(() => {
              this.moveBook(email, password)
            }, 700)
          } else {
            this.error = res.data.error
          }
        })
        .catch(err => {
          console.log(Object.assign({}, err))
          console.log(err)
        })
    },
    setUserByToken (thisToken) {
      this.$store.dispatch('list/loginuserbytoken', { thisToken })
        .then((response) => {
          if (response) {
            var token = response.token
            const dbName = 'List'
            var request = indexedDB.open(dbName, 2)
            request.onsuccess = function () {
              const db = request.result
              var objectStore = db.transaction(['User'], 'readwrite').objectStore('User')
              request = objectStore.get('user')
              request.onsuccess = function (event) {
                var data = event.target.result
                data.token = token
                var requestUpdate = objectStore.put(data, 'user')
                requestUpdate.onsuccess = function (event) {
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    moveToRegister () {
      this.$router.push('/register')
    }
  },
  mounted () {
    const dbName = 'List'
    var request = indexedDB.open(dbName, 2)
    var thisThis = this

    request.onerror = function (event) {
    }
    request.onsuccess = function () {
      const db = request.result
      var objectStore = db.transaction(['User'], 'readwrite').objectStore('User')
      request = objectStore.get('user')
      request.onsuccess = function (event) {
        var data = event.target.result
        if (data.token && data.token.length !== 0) {
          thisThis.setUserByToken(data.token)
        }
      }
    }
    request.onupgradeneeded = function () {
      const db = request.result
      if (!db.objectStoreNames.contains('User')) {
        const objStore = db.createObjectStore('User')
        objStore.add({ token: '' }, 'user')
      }
    }
  }
}
</script>
<style lang='scss'>
.form {
  position: relative;
  top: 40px;
}
.title {
  position: relative;
  left: 15px;
}
</style>
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
.register--icon {
  position: absolute;
  top: 395px;
  left: 48px;
  width: 98px;
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
  width: 20%;
  height: 3px;
  right: 74px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 1s ease-in-out;
  border-radius: 10px 12px 12px 10px;
}
.error {
  text-align-last: right;
  position: relative;
  bottom: 25px;
}
</style>
