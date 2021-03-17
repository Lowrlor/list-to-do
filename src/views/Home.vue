<template lang="pug">
<div class="home">
  button(@click='closeBook' class='button-logout') Logout
  List
</div>
</template>

<script>
import List from '@/components/List.vue'
export default {
  name: 'Home',
  components: {
    List
  },
  methods: {
    logout () {
      const dbName = 'List'

      var request = indexedDB.open(dbName, 2)

      request.onsuccess = function () {
        const db = request.result
        var objectStore = db.transaction(['User'], 'readwrite').objectStore('User')
        request = objectStore.get('user')
        request.onsuccess = function (event) {
          var data = event.target.result
          data.token = ''
          var requestUpdate = objectStore.put(data, 'user')
          requestUpdate.onsuccess = function (event) {
          }
        }
      }
      this.$store.dispatch('list/logout')
    },
    closeBook () {
      const book = document.querySelector('.book')
      const elements = document.querySelectorAll('.page1, .page2, .page3, .page4, .page5, .page6, .front, .back')
      for (var i = 1; i < elements.length - 1; i++) {
        const classOpen = 'page' + i + '-open'
        console.log(elements[i])
        elements[i].classList.remove(classOpen)
      }
      elements[0].classList.remove('back-open')
      elements[elements.length - 1].classList.remove('front-open')
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('foo')
        }, 700)
      })
      myPromise
        .then(() => {
          for (var j = 1; j < elements.length - 1; j++) {
            elements[j].remove()
          }
          return 1
        })
        .then(() => {
          book.classList.add('animate')
        })
      const thisFun = this
      setTimeout(function () {
        thisFun.logout()
      }, 1700)
    }
  }
}
</script>

<style lang="scss">
.button-logout {
  position: absolute;
  right: 16px;
  top: 16px;
  background-color: #3263d1;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.animate {
 left: 50.5%;
 transform: translate(-50%, -50%);
}

.input-auth {
  padding: 8px 12px;
  margin: 8px 0;
  box-sizing: border-box;
}
.login--button, .register--button {
  background-color: #3263d1;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
