<template>
  <v-app id="inspire">

    <v-content>

      <v-container fluid fill-height>
        <v-layout align-top justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title >Prihlaseni </v-toolbar-title>
              </v-toolbar>
              <v-card-text>

                <v-form v-if="!$store.state.isUserLoggedIn">
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
    if (!this.$store.state.isUserLoggedIn) {
      this.$message({
                 message: 'Neprihlaseno, prihlaste se prosim',
                 type: 'error',
                 center: true,
                 duration: 3000
              })
    }

    if (this.$store.state.isUserLoggedIn) {

      this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Prihlaseno, Overuji pristupove urovne',
                type: 'error',
                center: true,
                duration: 500
              })
      this.loginUpdate()
      .then(res => {
           this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Uroven overena, cekame, na polozky menu',
                type: 'success',
                center: true,
                duration: 1000
              });

      })




      this.menuUpate()
      .then( res => {

           this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Spusteno',
                type: 'success',
                center: true,
                duration: 1500
              });

      })
      this.$router.push({
        name: 'desktop'
      })
    }
  },
  methods: {
    async logout () {
       this.$message({
         dangerouslyUseHTMLString: true,
         message: 'Odhlasuji',
         type: 'error',
         center: true,
         duration: 1000
       })
       alert('logout 111'+ 'x')
       try {
         const response = await AuthService.logout({
          idefix: this.idefix
        })

        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setLevel', null)
        this.$store.dispatch('setIdefix', null)
        this.$router.push({ name: 'login' })

      } catch(error) {
        this.$message({
                dangerouslyUseHTMLString: true,
                message: `Doslo k chybe ${this.error} logout nebude evidovan`,
                type: 'error',
                center: true,
                duration: 10000
              })
        this.error = error.response.data.error
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setLevel', null)
        this.$store.dispatch('setIdefix', null)
        this.$router.push({ name: 'login' })
      }
    },
    async login0 () {

            this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Prihlasuji - autorizuji v databazi',
                type: 'error',

                center: true,
                duration: 1000
              });
      try {
        const response = await AuthService.login({
          login: this.login,
          password: this.password
        })
        this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Nacitam menu',
                type: 'info',

                center: true,
                duration: 2000
              })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setLevel', response.data.level)
        this.$store.dispatch('setIdefix', response.data.idefix)
        this.menuUpate()
        .then(res => {
           this.$message({
            dangerouslyUseHTMLString: true,
            message: 'Spoustim aplikaci',
            type: 'info',
            center: true,
            duration: 2000
           })
          this.$router.push({
          name: 'desktop'
        })

        })

      } catch (error) {
        this.$message({
                dangerouslyUseHTMLString: true,
                message: `Doslo k chybe ${this.error}`,
                type: 'error',

                center: true,
                duration: 1000
              })
        this.error = error.response.data.error
      }
    },
    async loginUpdate () {
      try {
        const response = await AuthService.update({
          login: this.$store.state.user,
        })
        this.$store.dispatch('setLevel', response.data.level)
        this.$store.dispatch('setIdefix', response.data.idefix)
      } catch (error) {
                  // alert('3')
        this.error = error.response.data.error
      }
    },

    async menuUpate() {
        try {
          const response = await AuthService.menuUpdate({
            idefix: this.$store.state.idefix
          })
              console.log(response.data.items)
          //  console.log(JSON.parse(JSON.stringify(response.data.data[0].items)))
              this.xMenuy1 = JSON.parse(JSON.stringify(response.data.items))
              this.$store.dispatch('setMenuMain',this.xMenuy1)
              this.$store.commit('SETMENUMAIN',this.xMenuy1)
              this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))

        } catch(error) {
          this.error = error.response.data.error
        }
    }






  }

}
</script>
