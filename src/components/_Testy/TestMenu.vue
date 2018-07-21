<template>
  <ram1>
  <v-navigation-drawer
    stateless
    value="true"
  >
  <v-list>
   <v-list-tile @click="$router.push({name: 'desktop'})">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(admin, i) in admins"
            :key="i"
            @click="$router.push({name: 'desktop'})"
          >
            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Actions</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i"
            @click="$router.push({name: 'desktop'})"
          >
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12  class="px-0 ma-0 py-0 my-0">
          <p class="px-0 indigo--text darken-4">12</p>
      </v-flex>
      <v-flex v-for="i in 3" :key="`4${i}`" xs4 class="px-0 ma-0 py-0 my-0" >
          <p class="px-0 mx-0 red lighten-5 px-0 ma-0 py-0 my-0">4{{i}}</p>
      </v-flex>
      <v-flex v-for="i in 4" :key="`3${i}`" xs3 class="px-0 ma-0 py-0 my-0">
          <p class="px-0 mx-0 py-0 my-0 red" >3</p>
      </v-flex>
      <v-flex v-for="i in 4" :key="`${i}`" xs3  class="px-0 ma-0 py-0 my-0">
        <p class="px-0 mx-0 py-0 my-0 teal lighten-5" >{{i}}1</p>
      </v-flex>
      <v-flex v-for="i in 6" :key="`2${i}`" xs2  class="px-0 ma-0 py-0 my-0">
          <p class="px-0 lime  lighten-2">2</p>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container grid-list-md text-xs-center reverse>

    <ram1>
          <p v-for="(moje, i) in Moje" :key="i" class="px-0 indigo lighten-2">
            {{ moje }}  {{ i }}<br>
          </p>
    </ram1>
  </v-container>

  </ram1>
</template>

<script>

export default {
  data: () => ({
    component: {
    },
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ],
    Moje: ['a', 'b']
  })
}
</script>
<style scoped>
</style>
