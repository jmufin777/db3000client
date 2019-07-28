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
                  <v-text-field v-model='login' prepend-icon="person" name="login" label="Login" type="text" :id="'Login_'+ID" @keyup.enter="setFocus('Pass_'+ID)"></v-text-field>
                  <v-text-field v-model="password" :id="'Pass_'+ID" prepend-icon="lock" name="password" label="Heslo"  type="password"   @keyup.enter="setFocus('Sub_'+ID)"></v-text-field>
                </v-form>
                <div v-for="mess in   message" :key="mess.login">
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="error " v-html="error" /><v-spacer></v-spacer>
                <v-btn
                v-if="!$store.state.isUserLoggedIn"
                @click="login0"
                @focus="login0"
                color="primary" :id="'Sub_'+ID">Prihlaseni</v-btn>
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
import { setTimeout } from 'timers';

export default {
  data () {
    return {
      drawer: null,
      login: '',
      password: '',
      error: null,
      message: 'cekam',
      ID: 0
    }
  },
  props: {
    source: String
  },
  mounted () {
    const self=this
    self.ID = Math.round(Math.random() * 1983458)

    if (!this.$store.state.isUserLoggedIn) {
      // this.$message({
      //            message: 'Neprihlaseno, prihlaste se prosim',
      //            type: 'error',
      //            center: true,
      //            duration: 3000
      //         })
      setTimeout(function(){

          self.setFocus("Login_"+self.ID)
        },1000)


    }

    if (this.$store.state.isUserLoggedIn) {

      // this.$message({
      //           dangerouslyUseHTMLString: true,
      //           message: 'Prihlaseno, Overuji pristupove urovne',
      //           type: 'error',
      //           center: true,
      //           duration: 500
      //         })
      this.loginUpdate()
      .then(res=>{
        console.log('Spusteno')
        this.menuUpate()

        // .then(res=>{
        //   this.$message({
        //         dangerouslyUseHTMLString: true,
        //         message: 'Spusteno',
        //         type: 'success',
        //         center: true,
        //         duration: 15000
        //       });
        // })
      })

      // this.loginUpdate()
      // .then(res => {
      //      this.$message({
      //           dangerouslyUseHTMLString: true,
      //           message: 'Uroven overena, cekame, na polozky menu',
      //           type: 'success',
      //           center: true,
      //           duration: 1000
      //         });

      // })




      // this.menuUpate()
      // .then( res => {

      //      this.$message({
      //           dangerouslyUseHTMLString: true,
      //           message: 'Spusteno',
      //           type: 'success',
      //           center: true,
      //           duration: 1500
      //         });

      // })
      this.$router.push({
        name: 'desktop'
      })
    }
  },
  methods: {
    setFocus(cId) {
      document.getElementById(cId).focus()
    },
    async logout () {

       this.$message({
         dangerouslyUseHTMLString: true,
         message: 'Odhlasuji',
         type: 'error',
         center: true,
         duration: 1000
       })

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
      const self = this
/*
            this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Prihlasuji - autorizuji v databazi',
                type: 'error',
                center: true,
                duration: 1000
              });
              */
      try {
        const response = await AuthService.login({
          login: this.login,
          password: this.password
        })
        /*
        this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Nacitam menu',
                type: 'info',

                center: true,
                duration: 2000
              })
        */
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setLevel', response.data.level)
        this.$store.dispatch('setIdefix', response.data.idefix)
        this.menuUpate()
        .then(res => {

          //  this.$message({
          //   dangerouslyUseHTMLString: true,
          //   message: 'Spoustim aplikaci',
          //   type: 'info',
          //   center: true,
          //   duration: 2000
          //  })
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
        this.error = error.response.data.error+"...."
        setTimeout(function(){
          // self.error="Aaaaaa"
          self.setFocus("Login_"+self.ID)
        },1000)

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
