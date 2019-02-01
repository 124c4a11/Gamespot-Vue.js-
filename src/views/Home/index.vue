<template>
  <div>
    <home-carousel/>
    <home-content/>
  </div>
</template>

<script>
import HomeCarousel from './HomeCarousel.vue'
import HomeContent from './HomeContent.vue'

export default {
  name: 'home',

  components: {
    HomeCarousel,
    HomeContent
  }
}
</script>
