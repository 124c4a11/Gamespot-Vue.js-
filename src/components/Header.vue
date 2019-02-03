<template>
  <header class="page-header">
    <v-container>
      <v-layout row align-center>
        <router-link to="/" class="logo">Gamespot</router-link>
        <v-spacer/>
        <router-link v-if="!isAuth" to="/signin" class="page-header__link">
          <img :src="loginIcon" alt="login">
        </router-link>

        <button
          v-if="isAuth"
          @click="drawerIsOpen = !drawerIsOpen"
          class="page-header__link hidden-md-and-up"
        ><v-icon dark x-large>menu</v-icon></button>

        <div v-if="isAuth" class="hidden-sm-and-down">
          <router-link
            to="/dashboard"
            class="page-header__link"
          >
            <v-icon dark>subject</v-icon>
            Dashboard
          </router-link>

          <button @click="logout" class="page-header__link">
            <v-icon dark>exit_to_app</v-icon>
            Logout
          </button>
        </div>
      </v-layout>
    </v-container>

    <v-navigation-drawer
      v-if="isAuth"
      v-model="drawerIsOpen"
      app
      right
      temporary
    >
      <v-list>
        <v-list-tile active-class="red--text" to="/dashboard">
          <v-list-tile-action>
            <v-icon>subject</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import loginIcon from '@/assets/img/login.png'

export default {
  data () {
    return {
      loginIcon,
      drawerIsOpen: false
    }
  },

  computed: {
    ...mapGetters('user', [ 'isAuth' ])
  },

  methods: {
    ...mapMutations('user', [ 'logout' ])
  }
}
</script>

<style lang="scss">
/*================================================================
  page-heder
================================================================*/
.page-header {  background-color: #000; }

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

  &.router-link-exact-active { opacity: 1; }

  & + & { margin-left: 2em; }

  img { display: block; }
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
