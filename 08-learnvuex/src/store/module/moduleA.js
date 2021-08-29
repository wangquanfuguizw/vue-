export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    aUpdateName(context) {
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  },
  getters: {
    fullname(state) {
      return state.name + '111111'
    },
    fullname2(state, getters) {
      return getters.fullname + '22222'
    },
    fullname3(state, getters, rootstate) {
      return getters.fullname2 + rootstate.counter
    }
  }
}
