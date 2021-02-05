import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleList = ({
  namespaced: true,
  state: {
    todolist: [],
    showForm: false,
    editable: false,
    thisIndex: -1
  },
  mutations: {
    SHOWFORM (state) {
      state.showForm = true
    },
    GETLIST (state, payload) {
      state.todolist = payload
    },
    ADDLIST (state, payload) {
      state.todolist.push(payload)
    },
    REMOVELIST (state, index) {
      state.todolist.splice(index, 1)
    },
    UPDATE (state, payload) {
      state.todolist[payload[1]] = payload[0]
    },
    EDIT (state, index) {
      if (state.editable) {
        state.editable = false
        state.thisIndex = -1
      } else {
        state.thisIndex = index
        state.editable = true
      }
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    },
    getlist ({ commit }, payload) {
      commit('GETLIST', payload)
    },
    addlist ({ commit }, payload) {
      commit('ADDLIST', payload)
    },
    removelist ({ commit }, index) {
      commit('REMOVELIST', index)
    },
    update ({ commit }, payload) {
      commit('UPDATE', payload)
    },
    edit ({ commit }, index) {
      commit('EDIT', index)
    }
  }
})
const moduleTasks = ({
  namespaced: true,
  state: {
    listIndex: -1,
    thisTaskIndex: -1,
    taskData: '',
    editable: false
  },
  mutations: {
    ADD (state, payload) {
      this.state.list.todolist[payload[1]].tasks.push(payload[0])
    },
    REMOVE (state, payload) {
      this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1)
    },
    UPDATE (state, payload) {
      this.state.list.todolist[payload.index].tasks.splice(payload.taskIndex, 1, payload.data)
      state.editable = false
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
    },
    TASKEDIT (state, payload) {
      if (state.editable) {
        state.editable = false
        state.thisTaskIndex = -1
        state.listIndex = -1
      } else {
        state.editable = true
        state.thisTaskIndex = payload.taskIndex
        state.listIndex = payload.index
      }
      state.taskData = payload.item
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('ADD', payload)
    },
    remove ({ commit }, payload) {
      commit('REMOVE', payload)
    },
    update ({ commit }, payload) {
      commit('UPDATE', payload)
    },
    move ({ commit }, payload) {
      commit('MOVE', payload)
    },
    taskedit ({ commit }, payload) {
      commit('TASKEDIT', payload)
    }
  }
})
export default new Vuex.Store({
  modules: {
    list: moduleList,
    tasks: moduleTasks
  }
})
