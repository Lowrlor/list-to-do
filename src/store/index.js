import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showForm: false,
    todolist: []
  },
  mutations: {
    SHOWFORM (state) {
      state.showForm = true
    },
    SAVELIST (state, payload) {
      console.log(payload)
      state.todolist.push(payload)
      console.log(state.todolist)
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    },
    savelist ({ commit }, payload) {
      commit('SAVELIST', payload)
    }
  },
  modules: {
  }
})
