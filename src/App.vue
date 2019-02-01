<template>
  <v-layout column>
    <app-header/>
    <v-spacer>
      <router-view/>
    </v-spacer>
  </v-layout>
</template>

<script>
import AppHeader from '@/components/Header.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
body { font: 16px 'Roboto', sans-serif; }
</style>
