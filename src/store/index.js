import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleList = ({
  namespaced: true,
  state: {
    showForm: false,
    todolist: []
  },
  mutations: {
    SHOWFORM (state) {
      state.showForm = true
    },
    ADDLIST (state, payload) {
      state.todolist.push(payload)
    },
    REMOVELIST (state, index) {
      state.todolist.splice(index, 1)
    },
    SAVEEDIT (state, payload) {
      state.todolist[payload[1]] = payload[0]
    },
    GETLIST (state, payload) {
      state.todolist = payload
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    },
    addlist ({ commit }, payload) {
      commit('ADDLIST', payload)
    },
    removelist ({ commit }, index) {
      commit('REMOVELIST', index)
    },
    saveedit ({ commit }, payload) {
      commit('SAVEEDIT', payload)
    },
    getlist ({ commit }, payload) {
      commit('GETLIST', payload)
    }
  }
})
const moduleTasks = ({
  namespaced: true,
  mutations: {
    ADD (state, payload) {
      console.log(payload[0])
      this.state.list.todolist[payload[1]].tasks.push(payload[0])
    },
    REMOVE (state, payload) {
      this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1)
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('ADD', payload)
    },
    remove ({ commit }, payload) {
      commit('REMOVE', payload)
    }
  }
})
export default new Vuex.Store({
  modules: {
    list: moduleList,
    tasks: moduleTasks
  }
})
