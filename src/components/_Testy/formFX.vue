<template>
      <table>
        <tr v-for="(info1, i) in info.data" :key="i">
          <td>{{info1}}</td><td>{{i}}</td>
        </tr>
      </table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      info: []
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>
<style scoped>

</style>
