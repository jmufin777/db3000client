<template>

<div >
 <el-popover
  placement="right-end"
  width="80%"
  trigger="hover">

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
        <td align="center" ><el-checkbox v-model="message2" :value="message2"><v-icon color="blue darken-2">fa-bicycle</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox v-model="message"><v-icon color="blue darken-2">message</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox><v-icon color="blue darken-2">email</v-icon></el-checkbox></td>
        <td align="center" ><el-checkbox><v-icon color="blue darken-2">sms</v-icon></el-checkbox></td>
      </tr>
    </tbody>
  </table>





  <el-button slot="reference" class="ma-2 pa-2" v-bind:class="{ success: vse.pouzito<=1, warning: vse.pouzito > 1 }">Db stav {{pouzito}}

  </el-button >
 </el-popover>


</div>
</template>

<script>
import {mapState} from 'vuex'
import DbStatusService from '@/services/DbStatusService'
// import { setTimeout } from 'timers';
import f from '@/services/fce'
import { setTimeout, clearInterval } from 'timers'
import ListFirma from '@/services/ListFirmaService'





export default {
  data () {
    return {
      message: true,
      message2: true,

      max_conn: 99,
      pouzito: 99,
      res_for_super: 99,
      res_for_normal:99,
      vse: [],
      who: [],
      insterval1:'',
      tStart: 0
    }
  },
  mounted () {


      try{
        console.log('Status nacten')
        this.$message({
                message: 'Status nacten',
                type: 'success',
                center: true,
                duration: 2000
             })
      } catch (e){
        //
         console.log('Error moutn dbstatus')
      }
       this.db_status()
       this.db_who()

  },
  methods: {
  async testNotify()   {
    // return
    const self =this
    console.log(this.user,'bb')

    var neco3  = (await ListFirma.one(this.user,0, 1011,''))

    //console.log("neco3:", neco3.data.firmanoticevalid)
    //neco3.forEach(element => {
  try {


    let nNic=1000
    // alert('aaa')
    await neco3.data.firmanoticevalid.forEach(el=>{
      el.zobrazeno = 1
      var neco2=  (ListFirma.saveNotice(self.user,0,el,1011))

//        console.log(f.datum(el.kdy) + ': ' + el.txt + el.idefix_osoba )

          setTimeout( function(){
            nNic +=  1000
            self.$notify( {
            title: 'Upozorneni pro ( ' + el.firmaosoba+ ' )',
            message:  el.txt  ,
            dangerouslyUseHTMLString: true,
            type: 'warning',
            offset: 100,
            onClick: function(){

            },
            duration: 0
          })
          },nNic)
          console.log('Notify')



    })
    } catch(e) {
      console.log('Chyba notify')
    }



    //});
    //var neco2=  (await ListFirma.saveNotice(self.user,self.idefixThis,jPar,1011))
  },
  async db_who()  {
     const self = this
      console.log(this.user)
     await  DbStatusService.who({idefix: this.$store.state.idefix})
     .then(res => {
       this.who = res.data.data

     })

  },

  async   db_status () {
      const self = this
      //return
   try {
     await  DbStatusService.all({idefix: this.$store.state.idefix})
      .then (res => {
        this.vse= res.data.data
        this.pouzito =this.vse.pouzito
        this.interval1 = setTimeout(function() {
          self.db_status()
          self.db_who()
          //console.log('Notify')
          self.testNotify()

        },7200)

      })
      .catch((e) => {
          this.pouzito =88
          console.log('DB error')
    /*
          this.$message({

                message: `Databze Error E1 ${e}`,
                type: 'error',
                center: true,
                duration: 2000
             })
             */
         this.interval1 = setTimeout(function() {
          self.db_status()
          self.db_who()
        },7100)

      })
    } catch (e2) {
          this.pouzito =89
          console.log("error 2 status")

          this.interval1 = setTimeout(function() {
          self.db_status()
          self.db_who()
        },7100)


    }
   }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'level',
      'idefix',
      'showEdit',
      'setshowModule',
      'setshowModuleTitle',
      'setshowIdefix',

    ]),
  },
   beforeDestroy () {
       clearInterval(this.interval1)
    }


}
</script>
<style scope>

</style>

