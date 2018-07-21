<template>
  <v-app id="inspire">

    <v-content>

      <v-container fluid fill-height>
        <v-layout align-top justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title >Prihlaseni {{$store.state.isUserLoggedIn}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <v-form>
                  <v-text-field v-model='login' prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Heslo"  type="password"></v-text-field>
                </v-form>
                <div v-for="mess in   message" :key="mess.login">
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="error" v-html="error" />
                <v-btn
                v-if="!$store.state.isUserLoggedIn"
                @click="login0" color="primary">Prihlaseni</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    </v-content>

  </v-app>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      drawer: null,
      login: '',
      password: '',
      error: null,
      message: 'cekam'
    }
  },
  props: {
    source: String
  },
  mounted () {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'desktop'
      })
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    },
    async login0 () {
      try {
        const response = await AuthService.login({
          login: this.login,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'desktop'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>
