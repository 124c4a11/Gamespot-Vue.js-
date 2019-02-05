<template>
  <v-layout v-if="post" justify-center>
    <v-flex xs12 md10 lg8 xl6>
      <h1 class="mt-4 text-xs-center grey--text text--darken-1">{{ post.title || 'Edit Post' }}</h1>

      <v-form ref="form" v-model="valid" validation>
        <!-- image upload -->
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="triggerImgUpload"
          color="blue-grey"
          class="white--text ml-0"
        >
          Upload thumbnail
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>

        <input
          ref="imgFileInput"
          @change="onImgFileChange"
          type="file"
          style="display: none"
          accept="image/*"
        >

        <!-- poster upload -->
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="triggerPosterUpload"
          color="blue-grey"
          class="white--text ml-0"
        >
          Upload poster
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>

        <input
          ref="posterFileInput"
          @change="onPosterFileChange"
          type="file"
          style="display: none"
          accept="image/*"
        >

        <v-layout v-if="imgUrl || posterUrl" justify-center class="my-4">
          <v-card v-if="imgUrl" width="300" class="mx-1">
            <v-img
              :src="imgUrl"
              aspect-ratio="1.3"
            />
            <v-card-actions class="pa-2">
              Thumbnail
            </v-card-actions>
          </v-card>

          <v-card v-if="posterUrl" width="300" class="mx-1">
            <v-img
              :src="posterUrl"
              aspect-ratio="1.3"
            />
            <v-card-actions class="pa-2">
              Poster
            </v-card-actions>
          </v-card>
        </v-layout>

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
        >Update Post</v-btn>

        <v-alert
          :value="updatePostStatus"
          type="success"
          class="mt-3"
        >Your post was updated.</v-alert>
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

  <v-layout v-else justify-center align-center>
    <h1 class="grey--text text--darken-1">Post not found!</h1>
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

      requiredRules: [ (v) => !!v || 'Is required' ]
    }
  },

  computed: {
    ...mapGetters('posts', [
      'post',
      'updatePostStatus',
      'imgUploadUrl',
      'posterUploadUrl'
    ]),

    ...mapGetters('common', [ 'loading' ]),

    imgUrl () {
      return this.imgUploadUrl || this.post.img
    },

    posterUrl () {
      return this.posterUploadUrl || this.post.poster
    }
  },

  methods: {
    ...mapActions('posts', [
      'uploadImg',
      'getPostById'
    ]),

    ...mapMutations('posts', [
      'clearUploadImgUrl',
      'clearUploadPosterUrl',
      'clearPost'
    ]),

    triggerImgUpload () {
      this.$refs.imgFileInput.click()
    },

    triggerPosterUpload () {
      this.$refs.posterFileInput.click()
    },

    onImgFileChange (e) {
      const file = e.target.files[0]

      this.uploadImg({ file, type: 'img' })
    },

    onPosterFileChange (e) {
      const file = e.target.files[0]

      this.uploadImg({ file, type: 'poster' })
    },

    updatePost () {
      const newPost = { ...this.post }

      newPost.img = this.imgUploadUrl
      newPost.poster = this.posterUploadUrl

      this.$store.dispatch('posts/updatePost', newPost)
    },

    dialogOnCancel () {
      this.dialog = false
    },

    dialogOnConfirm () {
      this.dialog = false
      this.updatePost()
    },

    onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.post.content === '') this.dialog = true
        else this.updatePost()
      }
    }
  },

  created () {
    const id = this.$route.params.id

    if (id) {
      this.postId = id
      this.getPostById(id)
    }
  },

  destroyed () {
    this.clearPost()
    this.clearUploadImgUrl()
    this.clearUploadPosterUrl()
  }
}
</script>
