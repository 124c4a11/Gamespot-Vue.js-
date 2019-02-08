<template>
  <v-container v-if="post">
    <v-layout justify-center>
      <v-flex xs12 md11 xl8>
        <h1 class="mb-3 grey--text text--darken-3">{{ post.title }}</h1>
        <v-img v-if="post.poster || post.img" aspect-ratio="2" :src="post.poster || post.img" width="100%" :alt="post.title" />
        <div v-html="post.content" class="post-content mt-4 grey--text text--darken-2"></div>
        <div class="post-rating mt-4">Rating: <span>{{post.rating}} / 5</span></div>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container v-else fill-height>
    <v-layout fill-height justify-center align-center>
      <h1 class="grey--text text--darken-1">Sorry, post not found!</h1>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('posts', [ 'post' ])
  },

  created () {
    const id = this.$route.params.id

    if (id) {
      this.postId = id
      this.$store.dispatch('posts/getPostById', id)
    }
  },

  destroyed () {
    this.$store.commit('posts/clearPost')
  }
}
</script>

<style lang="scss" scoped>
.post-content { font-size: 1.2em; }

.post-rating {
  padding: 10px 0px;
  border-top: 5px solid #F44336;
  font-weight: 800;
  font-size: 30px;
  color: red;
  text-align: center;
  background: #000;

  span { color: #fff; }
}
</style>
