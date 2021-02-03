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
      console.log(payload)
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
      this.state.list.todolist[payload[1]].tasks.push(payload[0])
    },
    REMOVE (state, payload) {
      this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1)
    },
    EDIT (state, payload) {
      this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1, payload.data)
    },
    MOVE (state, payload) {
      if (payload.side === 'up') {
        if (payload.taskIndex !== 0) {
          var element = this.state.list.todolist[payload.index].tasks[payload.taskIndex]
          var splicedElement = this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex - 1, 1, element)
          this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1, splicedElement[0])
        }
      } else {
        var len = this.state.list.todolist[payload.index].tasks.length
        if (payload.taskIndex + 1 !== len) {
          element = this.state.list.todolist[payload.index].tasks[payload.taskIndex]
          splicedElement = this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex + 1, 1, element)
          this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1, splicedElement[0])
        }
      }
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('ADD', payload)
    },
    remove ({ commit }, payload) {
      commit('REMOVE', payload)
    },
    edit ({ commit }, payload) {
      commit('EDIT', payload)
    },
    move ({ commit }, payload) {
      commit('MOVE', payload)
    }
  }
})
export default new Vuex.Store({
  modules: {
    list: moduleList,
    tasks: moduleTasks
  }
})
