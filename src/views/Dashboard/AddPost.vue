<template>
  <v-layout justify-center>
    <v-flex xs12 md10 lg8 xl6>
      <h1 class="mt-4 text-xs-center grey--text text--darken-1">{{ post.title || 'Add Post' }}</h1>

      <v-form ref="form" v-model="valid" validation>
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="triggerUpload"
          color="blue-grey"
          class="white--text ml-0"
        >
          Upload image
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>

        <input
          ref="fileInput"
          @change="onFileChange"
          type="file"
          style="display: none"
          accept="image/*"
        >

        <div v-if="imgUploadUrl" class="mt-4 text-xs-center">
          <img height="200" :src="imgUploadUrl" alt="">
        </div>

        <v-text-field
          v-model="post.title"
          :rules="requiredRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="post.description"
          :rules="requiredRules"
          maxlength="100"
          counter
          label="Description"
          required
        ></v-text-field>

        <vue-editor v-model="post.content" class="my-4"/>

        <v-select
          v-model="post.rating"
          :items="ratingItems"
          :rules="requiredRules"
          label="Rating"
          required
        ></v-select>

        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="onSubmit"
          color="red"
          class="white--text ml-0"
        >Add Post</v-btn>

        <v-alert
          :value="postStatus"
          type="success"
          class="mt-3"
        >Your post was posted.</v-alert>
      </v-form>
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
          Yuor post has no content, are you sure you want to post this?
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="red"
            flat
            @click="dialogOnCancel"
          >No</v-btn>

          <v-btn
            color="success"
            flat
            @click="dialogOnConfirm"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },

  data () {
    return {
      ratingItems: [1, 2, 3, 4, 5],
      valid: false,
      dialog: false,

      post: {
        title: '',
        description: '',
        content: '',
        img: '',
        rating: null
      },

      requiredRules: [ (v) => !!v || 'Is required' ]
    }
  },

  computed: {
    ...mapGetters('posts', [ 'addPostStatus', 'imgUploadUrl' ]),

    ...mapGetters('common', [ 'loading' ]),

    postStatus () {
      const status = this.addPostStatus

      if (status) this.clearPost()

      return status
    }
  },

  methods: {
    ...mapActions('posts', [ 'uploadImg' ]),

    ...mapMutations('posts', [ 'clearUploadImgUrl' ]),

    triggerUpload () {
      this.$refs.fileInput.click()
    },

    onFileChange (e) {
      const file = e.target.files[0]

      this.uploadImg(file)
    },

    addPost () {
      this.post.img = this.imgUploadUrl
      this.$store.dispatch('posts/addPost', this.post)
    },

    clearPost () {
      this.post = {
        title: '',
        description: '',
        content: '',
        img: '',
        rating: null
      }

      this.$refs.form.reset()

      this.clearUploadImgUrl()
    },

    dialogOnCancel () {
      this.dialog = false
    },

    dialogOnConfirm () {
      this.dialog = false
      this.addPost()
    },

    onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.post.content === '') this.dialog = true
        else this.addPost()
      }
    }
  },

  destroyed () {
    this.clearUploadImgUrl()
  }
}
</script>
