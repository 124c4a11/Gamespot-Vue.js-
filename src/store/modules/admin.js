import Vue from 'vue'
import router from '@/router'
import fbConfig from '@/firebaseConfig'

const fbAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const fbApiKey = fbConfig.apiKey

export default {
  namespaced: true,

  state: {
    token: null,
    refresh: null,
    authFailed: false,
    refreshLoading: true,
    authErrorMsg: ''
  },

  getters: {
    authFailed: (state) => state.authFailed,

    authErrorMsg: (state) => state.authErrorMsg,

    isAuth: (state) => !!state.token,

    refreshLoading: (state) => state.refreshLoading
  },

  mutations: {
    authUser (state, authData) {
      state.token = authData.idToken
      state.refresh = authData.refreshToken

      if (authData.type === 'signin') router.push('/dashboard')
    },

    authFailed (state, type) {
      if (type === 'reset') state.authFailed = false
      else state.authFailed = true
    },

    setErrorMsg (state, errorMsg) {
      state.authErrorMsg = errorMsg.split('_').join(' ')
    },

    logout (state) {
      state.token = null
      state.refresh = null

      localStorage.removeItem('token')
      localStorage.removeItem('refresh')

      router.push('/')
    },

    refreshLoading (state) {
      state.refreshLoading = false
    }
  },

  actions: {
    signIn ({ commit }, user) {
      Vue.http.post(`${fbAuth}/verifyPassword?key=${fbApiKey}`, {
        ...user,
        returnSecureToken: true
      })
        .then((response) => response.json())
        .then((authData) => {
          commit('setErrorMsg', '')
          commit('authFailed', 'reset')

          commit('authUser', { ...authData, type: 'signin' })

          localStorage.setItem('token', authData.idToken)
          localStorage.setItem('refresh', authData.refreshToken)
        })
        .catch((data) => {
          const errorMsg = data.body.error.message

          commit('setErrorMsg', errorMsg)
          commit('authFailed')
        })
    },

    refreshToken ({ commit }) {
      const refreshToken = localStorage.getItem('refresh')

      if (refreshToken && refreshToken !== 'undefined') {
        Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${fbApiKey}`, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
          .then((response) => response.json())
          .then((authData) => {
            commit('authUser', {
              type: 'refresh',
              idToken: authData.id_token,
              refreshToken: authData.refresh_token
            })

            commit('refreshLoading')

            localStorage.setItem('token', authData.idToken)
            localStorage.setItem('refresh', authData.refreshToken)
          })
      } else {
        commit('refreshLoading')
      }
    }
  }
}
