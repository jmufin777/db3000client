<template>

<div >
 <el-popover
  placement="right"
  width="1000"
  trigger="click">

<div>
  <ul>
    <li> Uplne vlevo modre - ukazuje nyni kdo a s jakymi pravy pouziva obrazovku - taky zatim moc dulezity </li>
    <li> Vlevo nformace o stavu databaze - dulezity nyni hodne, ukazuje, jak databaze uvolnuje spojeni, idelani stav je 1, pri 7 a vice neni neco v poradku, pokud se spojeni neuvolni </li>
    <li> Nize vidite prihlasene uzivatele </li>

    <li> Zobrazuje vsechny kde v posledni minute byla zjistena odezva databaze - kontroluje se kazdych 6 sec</li>
    <li>Sloupec kde je -muzu dopsat podle IP misto vysktytu,prip. pocet soucasne prihlasenych IP adres</li>
    <li>V pravo navrh moznosti online komunikace - neni to slozity, ale nepospicha to, </li>
  </ul>
</div>
<table >
<thead >
      <th align="center">Kdo</th>
      <th align="center">Start</th><th>Delka</th><th>Naposled</th>
      <th align="center">Kde je?</th>
      <th align="center"><el-button size="mini">Odeslat</el-button> </th>
      <th align="center">Obrazovka</th>
      <th align="center">Email</th>
      <th align="center">Sms</th>

      </thead>
    <tbody >
      <tr v-for="(w, i ) in who" :key="i">

        <td >{{w.kdo}}</td>
        <td align="center">{{w.start}}</td>
        <td align="center">{{w.delka}}</td>
        <td align="center">{{w.naposled}}</td>
        <td align="center">IP/Prace/Domov</td>
        <td align="center" ><el-checkbox :value="true"><v-icon color="blue darken-2">fa-bicycle</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox v-model="message"><v-icon color="blue darken-2">message</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox><v-icon color="blue darken-2">email</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox><v-icon color="blue darken-2">sms</v-icon></el-checkbox></td>
      </tr>
    </tbody>
  </table>





  <el-button slot="reference" class="ma-2 pa-2" v-bind:class="{ success: vse.pouzito<=1, warning: vse.pouzito > 1 }">Db stav {{pouzito}}
    vuex: {{ $store.state.idefix}}

  </el-button >
 </el-popover>


</div>
</template>

<script>
import {mapState} from 'vuex'
import DbStatusService from '@/services/DbStatusService'
import { setTimeout } from 'timers';





export default {
  data () {
    return {
      message: true,

      max_conn: 99,
      pouzito: 99,
      res_for_super: 99,
      res_for_normal:99,
      vse: [],
      who: [],
      insterval1:''
    }
  },
  mounted () {
        this.$message({
                message: 'Status nacten',
                type: 'success',
                center: true,
                duration: 2000
             })
       this.db_status()
       this.db_who()

  },
  methods: {
  async db_who()  {
     const self = this
     await  DbStatusService.who({idefix: this.$store.state.idefix})
     .then(res => {
       this.who = res.data.data



     })

  },
  async   db_status () {
      const self = this

     await  DbStatusService.all({idefix: this.$store.state.idefix})
      .then (res => {
        this.vse= res.data.data
        this.pouzito =this.vse.pouzito
        this.interval1 = setTimeout(function() {
          self.db_status()
          self.db_who()
        },6000)

      })
      .catch((e) => {
          this.pouzito =88
          this.$message({

                message: `Databze Error ${e}`,
                type: 'error',
                center: true,
                duration: 2000
             })
      })

    }
  },
   beforeDestroy () {
       clearInterval(this.interval1)
    }

}
</script>
<style scope>

</style>

