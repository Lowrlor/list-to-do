import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// setlist
const moduleList = ({
  namespaced: true,
  state: {
    todolist: [],
    showForm: false,
    editable: false,
    thisIndex: -1,
    dropStartIndex: -1,
    onDropIndex: -1,
    oldItem: ''
  },
  mutations: {
    SHOWFORM (state) {
      state.showForm = true
    },
    SETLIST (state, payload) {
      state.todolist = payload
    },
    ADDLIST (state, payload) {
      state.todolist.push(payload)
    },
    REMOVELIST (state, index) {
      state.todolist.splice(index, 1)
    },
    UPDATE (state, payload) {
      state.todolist.splice([payload[1]], 1, payload[0])
      console.log(state.todolist[payload[1]])
      console.log(payload[0])
    },
    EDIT (state, payload) {
      if (state.editable) {
        if (payload) {
          state.oldItem = payload.item
        }
        state.editable = false
        state.thisIndex = -1
        state.editable = false
      } else {
        console.log('there')
        state.thisIndex = payload.index
        state.editable = true
      }
    },
    DROPMOVE (state, payload) {
      var element = this.state.list.todolist[payload.dropStartIndex]
      var splicedElement = this.state.list.todolist.splice(payload.index, 1, element)
      this.state.list.todolist.splice(payload.dropStartIndex, 1, splicedElement[0])
    }
  },
  actions: {
    showform ({ commit }) {
      commit('SHOWFORM')
    },
    setlist ({ commit }, payload) {
      commit('SETLIST', payload)
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
    edit ({ commit }, payload) {
      commit('EDIT', payload)
    },
    dropmove ({ commit }, payload) {
      commit('DROPMOVE', payload)
    }
  }
})
const moduleTasks = ({
  namespaced: true,
  state: {
    listIndex: -1,
    thisTaskIndex: -1,
    taskData: '',
    editable: false,
    index: -1,
    dropStartIndex: -1,
    onDropIndex: -1
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
    },
    DROPMOVE (state, payload) {
      var element = this.state.list.todolist[state.index].tasks[state.dropStartIndex]
      var splicedElement = this.state.list.todolist[state.index].tasks.splice(payload.onDropIndex, 1, element)
      this.state.list.todolist[state.index].tasks.splice(state.dropStartIndex, 1, splicedElement[0])
    },
    SAVEINDEX (state, payload) {
      state.dropStartIndex = payload.dropStartIndex
      state.index = payload.index
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
    },
    dropmove ({ commit }, payload) {
      commit('DROPMOVE', payload)
    },
    saveindex ({ commit }, payload) {
      commit('SAVEINDEX', payload)
    }
  }
})
export default new Vuex.Store({
  modules: {
    list: moduleList,
    tasks: moduleTasks
  }
})
