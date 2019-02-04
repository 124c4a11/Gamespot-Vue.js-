<template>
  <v-layout justify-center>
    <v-flex xs12 md11 xl8>
      <h1 class="mt-4 text-xs-center grey--text text--darken-1">List Posts</h1>

      <v-card class="mt-4">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="posts"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.description}}</td>
            <td class="text-xs-center">{{ props.item.rating }}</td>
            <td class="text-xs-center">
              <v-btn
                small
                color="success"
                class="white--text"
              >Edit</v-btn>

              <v-btn
                small
                color="red"
                class="white--text"
              >Delete</v-btn>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Rating',
          align: 'left',
          value: 'rating'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('posts', [ 'posts' ])
  },

  created () {
    this.$store.dispatch('posts/getAllPosts')
  }
}
</script>
