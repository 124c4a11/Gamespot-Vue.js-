import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    addPostStatus: false
  },

  getters: {
    addPostStatus: (state) => state.addPostStatus
  },

  mutations: {
    setAddPostStatus (state, status) {
      state.addPostStatus = status
    }
  },

  actions: {
    addPost ({ commit, rootState }, post) {
      commit('common/setLoading', true, { root: true })

      Vue.http.post(`posts.json?auth=${rootState.user.token}`, post)
        .then((response) => response.json())
        .then(() => {
          commit('common/setLoading', false, { root: true })
          commit('setAddPostStatus', true)

          setTimeout(() => {
            commit('setAddPostStatus', false)
          }, 3000)
        })
    }
  }
}
