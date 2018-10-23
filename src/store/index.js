import Vue from 'vue'
import Vuex from 'vuex'
import {getField, updateField} from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAnswer: '',
    isActive: true,
    error: false,
    countRight: 0,
    countWrong: 0,
    dialog: false,
    task: 'Начать?',
    arithmeticSigns: ['+', '-', '*', '/'],
    score: 0
  },
  mutations: {
    updateField,
    calculateRandNumber (state, payload) {
      const math = Math.floor(Math.random() * (4))
      const sign = state.arithmeticSigns[math]
      const firstNumber = Math.floor(Math.random() * (payload.max - payload.min + 1) + payload.min)
      const secondNumber = Math.floor(Math.random() * (payload.max - payload.min + 1) + payload.min)
      switch (sign) {
        case '+':
          state.score = firstNumber + secondNumber
          break
        case '-':
          state.score = firstNumber - secondNumber
          break
        case '*':
          state.score = firstNumber * secondNumber
          break
        case '/':
          state.score = firstNumber / secondNumber
          break
      }
      state.task = firstNumber + ' ' + sign + ' ' + secondNumber
    },
    clearAll (state) {
      state.task = 'Начать?'
      state.isActive = true
      state.error = false
      state.countRight = 0
      state.countWrong = 0
    },
    isActive (state) {
      state.isActive = !state.isActive
    },
    updateCountRight (state) {
      state.countRight++
    },
    updateCountWrong (state) {
      state.countWrong++
    },
    openDialog (state) {
      state.dialog = !state.dialog
    },
    error (state) {
      state.error = !state.error
    }
  },
  actions: {
    startGame ({commit}, payload) {
      commit('isActive')
      commit('calculateRandNumber', {
        max: payload.max,
        min: payload.min
      })
    },
    randTask ({commit, getters}, payload) {
      if (parseFloat(payload.userAnswer).toFixed(2) === getters.getScore) {
        commit('calculateRandNumber', {
          max: payload.max,
          min: payload.min
        })
        commit('updateCountRight')
      } else if (payload.userAnswer === '') {
        commit('error')
      } else {
        commit('openDialog')
      }
    },
    continueGame ({commit}, payload) {
      commit('openDialog')
      commit('calculateRandNumber', {
        max: payload.max,
        min: payload.min
      })
      commit('updateCountWrong')
    }
  },
  getters: {
    getScore (state) {
      return state.score.toFixed(2)
    },
    getField
  }
})
