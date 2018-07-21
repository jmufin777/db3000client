<template>
 <v-data-table
    :headers="headers"
    :items="list"
    class="elevation-10"
    :total-items="total"
    :loading="loading"
  >
    <v-progress-linear color="blue" v-model="valueDeterminate"></v-progress-linear>
    <template slot="items" slot-scope="props" class="ma-0 pa-0">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-center pa-0 ma-0">{{ props.item.kod }}</td>
      <td class="text-xs-center">
          <v-edit-dialog
            :return-value.sync="props.item.nazev"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.nazev }}</div>
            <div slot="input" class="mt-0 title">Zmena nazvu</div>
            <v-text-field
              slot="input"
              v-model="props.item.nazev"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </v-edit-dialog>
        </td>
    </template>
    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
  </v-data-table>

</template>

<script>
import {mapState} from 'vuex'
import List2Barevnost from '@/services/List2BarevnostService'

export default {
  props: ['visible'],
  data () {
    return {
      valueDeterminate: 65,
      loading: false,
      total: 0,
      pagination: {},
      headers: [
        {
          text: 'Id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        { text: 'Kod', value: 'kod' },
        { text: 'Name', value: 'name' }
      ],
      list: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.list = (await List2Barevnost.all()).data
    }
  },
  watch: {
    pagination: {
      handler () {
        this.my_data()
        alert('watch')
      },
      deep: true
    }
  },
  methods: {
    async my_data () {
      this.loading = true
      this.list = (await List2Barevnost.all()).data
      this.total = this.list.length
      this.loading = false
    },
    close () {

    },
    open () {

    },
    cancel () {

    },
    save () {

    },
    my_data1 () {
      console.log('my data 1')
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])

  }
}

</script>
<style scoped>
</style>
