import Vue from 'vue'
import { UPLOAD_URL, UPLOAD_PRESET } from '@/cloudinaryConfig'

export default {
  namespaced: true,

  state: {
    posts: [],
    addPostStatus: false,
    updatePostStatus: false,
    imgUploadUrl: '',
    posterUploadUrl: '',
    countPostsUploaded: 0,
    post: null
  },

  getters: {
    posts: (state) => state.posts,

    addPostStatus: (state) => state.addPostStatus,

    updatePostStatus: (state) => state.updatePostStatus,

    imgUploadUrl: (state) => state.imgUploadUrl,

    posterUploadUrl: (state) => state.posterUploadUrl,

    post: (state) => state.post,

    countPostsUploaded: (state) => state.countPostsUploaded,

    lastPosts: (state) => state.posts.slice(0, 4)
  },

  mutations: {
    setAddPostStatus (state, status) {
      state.addPostStatus = status
    },

    setUpdatePostStatus (state, status) {
      state.updatePostStatus = status
    },

    setUploadImgUrl (state, imgData) {
      state.imgUploadUrl = imgData.secure_url
    },

    setUploadPosterUrl (state, imgData) {
      state.posterUploadUrl = imgData.secure_url
    },

    clearUploadImgUrl (state) {
      state.imgUploadUrl = ''
    },

    clearUploadPosterUrl (state) {
      state.posterUploadUrl = ''
    },

    setPosts (state, posts) {
      state.posts = posts
    },

    setPost (state, post) {
      state.post = post
    },

    clearPost (state) {
      state.post = null
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
          }, 2000)
        })
    },

    uploadImg ({ commit }, { file, type }) {
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
          if (type === 'poster') {
            commit('setUploadPosterUrl', response)
          } else {
            commit('setUploadImgUrl', response)
          }

          commit('common/setLoading', false, { root: true })
        })
    },

    getPosts ({ commit, state }, { limit }) {
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

          state.countPostsUploaded = limit

          commit('setPosts', posts.reverse())
          commit('common/setLoading', false, { root: true })
        })
    },

    getAllPosts ({ commit }) {
      commit('common/setLoading', true, { root: true })

      Vue.http.get('posts.json')
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
    },

    getPostById ({ commit, state }, id) {
      const posts = state.posts
      let post = null

      if (posts.length) {
        post = posts.find((post) => {
          return post.id === id
        })
      }

      if (post) {
        commit('setPost', post)
      } else {
        Vue.http.get(`posts.json?orderBy="$key"&equalTo="${id}"`)
          .then((response) => response.json())
          .then((response) => {
            for (let key in response) {
              post = {
                id: key,
                ...response[key]
              }
            }

            commit('setPost', post)
          })
      }
    },

    updatePost ({ commit, rootState }, post) {
      const token = rootState.user.token

      commit('common/setLoading', true, { root: true })

      Vue.http.put(`posts/${post.id}.json?auth=${token}`, post)
        .then(() => {
          commit('setPost', post)
          commit('common/setLoading', false, { root: true })
        })
    },

    deletePost ({ commit, state, rootState }, id) {
      const token = rootState.user.token

      commit('common/setLoading', true, { root: true })

      Vue.http.delete(`posts/${id}.json?auth=${token}`)
        .then(() => {
          let newPosts = state.posts.filter((post) => post.id !== id)

          commit('setPosts', newPosts)
          commit('common/setLoading', false, { root: true })
        })
    }
  }
}
