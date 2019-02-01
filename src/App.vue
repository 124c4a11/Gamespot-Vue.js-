<template>
  <v-layout column class="page">
    <app-header/>
    <v-spacer>
      <router-view/>
    </v-spacer>
    <app-footer/>
  </v-layout>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
body { font: 16px 'Roboto', sans-serif; }

.page { min-height: 100vh; }
</style>
