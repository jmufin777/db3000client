<template>
  <v-container grid-list-md>
    <slot></slot>
    <v-form>
      Barevnost
<v-layout row wrap>
       <v-flex xs12 sm6 md4>
        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="computedDateFormatted"
            label="Date (read only text field)"
            hint="DD.DD.YYYY format"
            persistent-hint
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date"
          no-title
          locale="cs-cz"
           @input="menu2 = false"></v-date-picker>
        </v-menu>
       </v-flex>
        <v-flex xs12 sm6 md4>

       <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu3"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="time"
          label="Picker in menu"
          prepend-icon="access_time"
          readonly

        ></v-text-field>
        <v-time-picker
          v-if="menu3"
          v-model="time"
          format="24hr"
          locale="cs-cz"
          @change="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
      List : {{ list }} User: {{isUserLoggedIn}}
       </v-flex>
    </v-layout>

    </v-form>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import List2Barevnost from '@/services/List2BarevnostService'

export default {
  props: ['visible'],
  data () {
    return {
      time: null,
        menu2: false,
        modal2: false,
        menu3: false,
        date: null,
        dateFormatted: null,

        list: ''


    }
  },
  async mounted () {

    //if (this.isUserLoggedIn) {
      alert(111)
      this.list = (await List2Barevnost.all()).data
    //}
  },

computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }

    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }

</script>
<style scoped>
</style>


