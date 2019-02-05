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
                :to="`edit_post/${props.item.id}`"
                :disabled="loading"
                :loading="loading"
                small
                color="success"
                class="white--text"
              >Edit</v-btn>

              <v-btn
                :disabled="loading"
                :loading="loading"
                @click="onDelete(props.item.id)"
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

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline white--text red py-3"
          primary-title
        >Attention!</v-card-title>

        <v-card-text>
          Are you sure you want to delete this post? ( there is no turning back )
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="success"
            flat
            @click="onCancel"
          >Not Delete</v-btn>

          <v-btn
            color="red"
            flat
            @click="onConfirm"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      deleteId: '',

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
          sortable: false,
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
    ...mapGetters('common', [ 'loading' ]),

    ...mapGetters('posts', [ 'posts' ])
  },

  methods: {
    ...mapActions('posts', [ 'deletePost' ]),

    onDelete (id) {
      this.deleteId = id
      this.dialog = true
    },

    onConfirm () {
      this.deletePost(this.deleteId)
      this.dialog = false
    },

    onCancel () {
      this.deleteId = ''
      this.dialog = false
    }
  },

  created () {
    this.$store.dispatch('posts/getAllPosts')
  }
}
</script>
