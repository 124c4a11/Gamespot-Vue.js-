export default {
  namespaced: true,

  state: {
    loading: false
  },

  getters: {
    loading: (state) => state.loading
  },

  mutations: {
    setLoading (state, isLoading) {
      state.loading = isLoading
    }
  }
}
