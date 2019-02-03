<template>
  <v-app>
    <app-header/>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },

  created () {
    this.$store.dispatch('user/refreshToken')
  }
}
</script>

<style lang="scss">
body { font: 16px 'Roboto', sans-serif; }
</style>
