import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showForm: false
  },
  mutations: {
    SHOWFORM () {
      this.state.showForm = true
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    }
  },
  modules: {
  }
})
