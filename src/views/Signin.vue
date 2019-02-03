<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg3>
        <h1 class="mb-4 text-xs-center grey--text text--darken-1">Sign in</h1>
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                v-model.trim="email"
                :rules="emailRules"
                prepend-icon="person"
                name="login"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model.trim="password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="loading"
              :loading="loading"
              @click="onSubmit"
              block
              color="red"
              class="white--text"
            >Sign in</v-btn>
          </v-card-actions>
          <p v-if="authFailed" class="px-2 pb-1 text-xs-center error--text body-1">{{ authErrorMsg }}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      valid: false,

      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v) || 'E-mail must be valid'
      ],

      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ]
    }
  },

  computed: {
    ...mapGetters('admin', [ 'authFailed', 'authErrorMsg', 'loading' ])
  },

  methods: {
    ...mapActions('admin', [ 'signIn' ]),

    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.signIn(user)
      }
    }
  },

  destroyed () {
    this.$store.commit('admin/authFailed', 'reset')
  }
}
</script>
