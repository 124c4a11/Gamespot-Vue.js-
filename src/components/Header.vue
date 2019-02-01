<template>
  <div class="page-header">
    <v-container>
      <v-layout row align-center>
        <router-link to="/" class="logo">Gamespot</router-link>
        <v-spacer/>
        <router-link to="/signin" class="page-header__link">
          <img :src="loginIcon" alt="login">
        </router-link>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import loginIcon from '@/assets/img/login.png'

export default {
  data () {
    return {
      loginIcon
    }
  }
}
</script>

<style lang="scss">
/*================================================================
  page-heder
================================================================*/
.page-header {  background-color: #343a40; }

.page-header__link {
  font-size: 1.25em;
  color: #fff;
  text-decoration: none;
  opacity: .7;
  transition-duration: .25s;

  &:hover,
  &:focus {
    outline: none;
    opacity: 1;
  }

  & + & { margin-left: 1em; }
}

/*================================================================
  logo
================================================================*/

.logo {
  font: 30px/1 'Bungee Inline', cursive;
  color: #fff;
  text-decoration: none;
}
</style>
