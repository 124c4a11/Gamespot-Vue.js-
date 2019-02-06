<template>
  <v-carousel
    v-if="lastPosts"
    height="700"
    :cycle="false"
    :interval="15000"
  >
    <v-carousel-item
      v-for="post in lastPosts"
      :key="post.id"
      :src="post.poster || post.img"
    >
      <div class="slide-gradient">
        <v-container fill-height="true" py-5>
          <v-layout align-end>
            <div class="slide-content">
              <v-btn
                :to="`/post/${post.id}`"
                tag="a"
                depressed
                color="red"
                class="slide-more ma-0"
              >See review</v-btn>
              <h2 class="slide-title">{{ post.title }}</h2>
            </div>
          </v-layout>
        </v-container>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('posts', [ 'lastPosts' ])
  }
}
</script>

<style lang="scss">
.v-carousel__controls { background: none !important; }

.slide-gradient {
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, .5), transparent 30%) no-repeat;
}

.slide-content { margin-bottom: 20px; }

.slide-title {
  padding: 0 .5em;
  font-weight: 700;
  font-size: 5vw;
  color: #fff;
  background-color: #000;

  @media (max-width: 48em) { font-size: 8vw; }
}

.slide-more { border-radius: 0 !important; }
</style>
