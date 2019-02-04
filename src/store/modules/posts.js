import Vue from 'vue'
import { UPLOAD_URL, UPLOAD_PRESET } from '@/cloudinaryConfig'

export default {
  namespaced: true,

  state: {
    posts: [],
    addPostStatus: false,
    imgUploadUrl: ''
  },

  getters: {
    posts: (state) => state.posts,

    addPostStatus: (state) => state.addPostStatus,

    imgUploadUrl: (state) => state.imgUploadUrl
  },

  mutations: {
    setAddPostStatus (state, status) {
      state.addPostStatus = status
    },

    setUploadImgUrl (state, imgData) {
      state.imgUploadUrl = imgData.secure_url
    },

    clearUploadImgUrl (state) {
      state.imgUploadUrl = ''
    },

    setPosts (state, posts) {
      state.posts = posts
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
    },

    uploadImg ({ commit }, file) {
      commit('common/setLoading', true, { root: true })

      let formData = new FormData()

      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      Vue.http.post(UPLOAD_URL, formData, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          commit('setUploadImgUrl', response)
          commit('common/setLoading', false, { root: true })
        })
    },

    getPosts ({ commit }, { limit }) {
      commit('common/setLoading', true, { root: true })

      Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${limit}`)
        .then((response) => response.json())
        .then((response) => {
          const posts = []

          for (let key in response) {
            posts.push({
              id: key,
              ...response[key]
            })
          }

          commit('setPosts', posts.reverse())
          commit('common/setLoading', false, { root: true })
        })
    }
  }
}
