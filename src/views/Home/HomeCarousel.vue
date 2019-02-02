<template>
  <v-carousel
    height="700"
    :cycle="false"
  >
    <v-carousel-item
      v-for="(item, ndx) in slides"
      :key="ndx"
      :src="item.img"
    >
      <div class="slide-gradient">
        <v-container fill-height="true" py-5>
          <v-layout align-end>
            <div class="slide-content">
              <v-btn
                to="#"
                tag="a"
                depressed
                color="red"
                class="slide-more ma-0"
              >See review</v-btn>
              <h2 class="slide-title">{{ item.title }}</h2>
            </div>
          </v-layout>
        </v-container>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import img1 from '@/assets/img/featured/1.jpg'
import img2 from '@/assets/img/featured/2.jpg'
import img3 from '@/assets/img/featured/3.jpg'
import img4 from '@/assets/img/featured/4.jpg'

export default {
  data () {
    return {
      slides: [
        {
          title: 'Red dead redemption 2',
          img: img1
        },
        {
          title: 'Watchdogs 2',
          img: img2
        },
        {
          title: 'Rise of the tomb rider',
          img: img3
        },
        {
          title: 'Spider-man',
          img: img4
        }
      ]
    }
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
