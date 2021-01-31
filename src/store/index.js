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
    },
    REMOVELIST (state, index) {
      console.log(index)
      state.todolist.splice(index, 1)
    },
    SAVEEDIT (state, payload) {
      console.log(payload)
      state.todolist[payload[1]] = payload[0]
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    },
    savelist ({ commit }, payload) {
      commit('SAVELIST', payload)
    },
    removelist ({ commit }, index) {
      commit('REMOVELIST', index)
    },
    saveedit ({ commit }, payload) {
      commit('SAVEEDIT', payload)
    }
  },
  modules: {
  }
})
