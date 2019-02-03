<template>
  <v-container>
    <v-btn to="/dashboard/add_post" dark color=red class="ml-0">Add post</v-btn>
    <v-btn to="/dashboard/list_posts" dark color=red>Manage posts</v-btn>
    <hr class="my-2">
    <router-view/>
  </v-container>
</template>
