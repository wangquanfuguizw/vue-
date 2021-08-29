import Vue from 'vue'
import Vuex from 'vuex'
import {INCREMENT} from './mutations-types'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const moduleA = {
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

const store = new Vuex.Store({
  state: {
    counter: 1000,
    students: [
      {id: 110, name: 'why', age: 18},
      {id: 111, name: 'kobe', age: 24},
      {id: 112, name: 'james', age: 30},
      {id: 113, name: 'curry', age: 10},
    ],
    info: {
      name: 'kobe',
      age: 40,
      height: 1.98
    }
  },
  mutations: {
    //方法
    [INCREMENT](state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementCount(state, count) {
      state.counter += count
    },
    addStudent(state, stu) {
      state.students.push(stu)
    },
    updateInfo(state) {
      state.info.name = 'coderwhy'
      //错误的代码：不能在这里进行异步操作
      // setTimeout(() => {
      //   state.info.name = 'coderwhy'
      // },1000)

      // state.info['address'] = '洛杉矶'
      // Vue.set(state.info, 'address', '洛杉矶')
      //该方式做不到响应式
      //delete state.info.age
      // Vue.delete(state.info, 'age')
    }
  },
  actions: {
      //context: 上下文
      // aUpdateInfo(context, payload) {
      //   setTimeout(() => {
      //     context.commit('updateInfo')
      //     console.log(payload.message)
      //     payload.success()
      //   },1000)
      // }
    aUpdateInfo(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload)
          resolve('1111111')
        },1000)
      })
    }
  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    more20stu(state) {
      return state.students.filter(s => s.age >= 20)
    },
    more20stuLength(state, getters) {
      // return state.students.filter(s => s.age >= 20).length
      return getters.more20stu.length
    },
    moreAgeStu(state) {
      // return function (age) {
      //   return state.students.filter(s => s.age >= age)
      // }
      return age => {
        return state.students.filter(s => s.age >= age)
      }
    }
  },
  modules: {
      a: moduleA
  }
})

//导出store
export default store

const obj = {
  name: 'why',
  age: 18,
  height: 1.88,
  address: '洛杉矶'
}
const {name, height, age} = obj
