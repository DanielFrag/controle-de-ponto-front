import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registers: null,
    token: '',
    user: ''
  },
  mutations: {
    ADD_REGISTERS (state, register) {
      state.registers = register
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  }
})
