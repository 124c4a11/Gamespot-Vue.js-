<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 xl10>
        <v-layout justify-center wrap>
          <v-card
            v-for="(post, ndx) in posts"
            :key="ndx"
            max-width="300"
            class="card_flex ma-1"
          >
            <v-img
              :src="post.img"
              aspect-ratio="1.3"
            ></v-img>

            <v-spacer>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-2">{{ post.title }}</h3>
                  <div class="body-1 grey--text text--darken-2">{{ post.description }}</div>
                </div>
              </v-card-title>
            </v-spacer>

            <v-card-actions>
              <v-spacer/>
              <v-btn
                :to="`post/${post.id}`"
                tag="a"
                dark
                color="red"
              >See review</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>

        <v-layout justify-center class="pt-4">
          <v-btn
            :disabled="loading"
            :loading="loading"
            @click="loadMore"
            large
            color="black"
            class="white--text"
          >Load more</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('posts', [ 'posts' ]),

    ...mapGetters('common', [ 'loading' ])
  },

  methods: {
    ...mapActions('posts', [ 'getPosts' ]),

    loadMore () {
      this.getPosts({ limit: this.posts.length + 4 })
    }
  },

  created () {
    if (!this.posts.length || this.posts.length < 4) {
      this.getPosts({ limit: 4 })
    }
  }
}
</script>

<style lang="scss" scoped>
.card_flex {
  display: flex;
  flex-direction: column;

  .v-image,
  .v-card__actions { flex: 0 0 auto; }
}
</style>
