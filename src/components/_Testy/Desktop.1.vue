<template>
  <v-app id="inspire" >
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed

      app
      class="pb-0"
      stateless
    >

<v-list class="pt-0" dense >
  <v-divider></v-divider>
  <v-list-tile @click="Status">
     <v-list-tile-action>
       <v-icon> dashboard</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Status</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
   <v-list-tile @click="component='form-helper'">
     <v-list-tile-action>
       <v-icon>settings</v-icon>
     </v-list-tile-action>
     <v-list-tile-content >
       <v-list-tile-title >Nastaveni</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
   <v-list-tile @click="logout">
     <v-list-tile-action>
       <v-icon>directions_run</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Odhlasit</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
   <v-divider></v-divider>
   <v-list-tile @click="component='testy'">
     <v-list-tile-action>
       <v-icon>wb_sunny</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Testy</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
</v-list>

    </v-navigation-drawer>
      <v-toolbar app fixed clipped-left flat class="transparent">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>DB 3000</v-toolbar-title>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="yellow accent-12 elevation-10"
        light
        small
        absolute
        right
        middle
        fab
        ripple

        @click="logout"
      >
     <v-icon>directions_run</v-icon>

      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
      <div class="pl-4 pr-4 pt-2 pb-2">
          <component v-bind:is="component"></component>
        <v-dialog style="elevation-20"/>
      </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; db3000 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

// import Api from '@/services/Api'
import hw from './Blank.vue'
import testy from './_Testy/testy'

import {mapState} from 'vuex'

export default {
  components: {
    'form-helper': hw,
    'testy': testy,
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data: () => {
    return {
      drawer: true,
      component: ''
    }
  },
  props: {
    source: String
  },
  methods: {
    Status: function () {
      alert('status')
    },
    testy () {
      this.$router.push({
        name: 'testy'
      })
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: yellow;
}
</style>
