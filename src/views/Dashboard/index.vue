<template>
    <v-container fill-height>
      <v-layout fill-height column>
        <div>
          <v-btn to="/dashboard/add_post" dark color=red class="ml-0">Add post</v-btn>
          <v-btn to="/dashboard/list_posts" dark color=red>Manage posts</v-btn>
          <hr class="my-2">
        </div>
        <router-view/>
      </v-layout>
    </v-container>
</template>
