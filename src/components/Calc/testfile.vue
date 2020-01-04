<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <!-- <form method="post" enctype="multipart/form-data"> -->
    <form  method="post" enctype="multipart/form-data" id="ovar11">
      <!-- <label>File -->
      <input  type="file" id="filexx" ref="filexx" name="file2xx" v-on:change="handleFileUpload($event)" />
      <!-- webkitdirectory directory multiple -->
      <!-- </label> -->
    </form>
      <button v-on:click="submitFile()" @mouseenter="nahled=true" @mouseleave="nahled=false">Submit</button>
      <!-- </form> -->
    </div>
        <dia-log2 v-if="nahled && odkaz>''" :show="nahled"  @mouseleave="nahled=false" :odkaz="odkaz" title="">
         <div slot="nahled">
        </div>
        </dia-log2>
       <div style="width:80%">
      <table width="100%">
       <thead>
         <!-- <th>

        ifx:   {{ odkaz }} {{ idefix }} / {{ uploadPercentage }}
        FAJLIK: {{ output }}
        nbahled {{nahled}}
         </th> -->
         <th colspan="4">

          <v-progress-circular v-if="progres" :value="uploadPercentage"></v-progress-circular>

           Prevod na MM bude pts * 0.352778 ?
           Nase  nejmensi jednotka v DB je mm a nemam desetiny , co s tim ?


         </th>
         <th>Info o souboru</th>
         <th>Stav</th>

       </thead>

        <tr v-for="(obr,i) in obrazky" :key="i" >
          <td @mouseenter="odkaz=url.url()+'obrazek/'+obr.idefix;nahled=true" @mouseleave="nahled=true"
          :style="(obr.cesta_zak+'').trim().match(/[0-9]$/)?'width:15%;border:solid 1px;background:#fef9ca':'width:15%;border:solid 1px;background:white'"
          >
          {{obr.idefix}}<br v-if="obr.cesta_zak+''>''">
          {{  (obr.cesta_zak+'').trim().match(/[0-9]$/)?
              (obr.cesta_zak+'').slice((obr.cesta_zak+'').length-10)
              :''
              }}
          </td>
          <td @mouseenter="nahled=false"
          style="width:20%"
          >
            <a :href="url.url()+'obrazek_orig/'+obr.idefix" target="new">
            <img :src="url.url()+'obrazek_small/'+obr.idefix" height="100px"/>
            </a>
          </td>
          <td @mouseenter="nahled=false"
          style="width:15%"
          >
            <button @click="smaz(obr.idefix)">SMAZ</button>
            <a :href="url.url()+'obrazek_del/'+obr.idefix+'/'+idefix" target="new">
            <i aria-hidden="true" class="el-icon-delete" style="cursor:pointer"
            ></i>
            </a>
          </td>
          <td @mouseenter="nahled=false"
          style="width:25%;text-align:left;padding:10px"
          >
            <b>{{obr.nazev.split("/").reverse()[0]}}</b>
            <pre class="green lighten-4">
              {{(obr.pdfinfo+'').trim().substr(0,20)}}
            </pre>
           </td>
          <td style="width:35%;text-align:left;padding:10px">

            <b>{{obr.basename}}</b>
            <br>Z:{{obr.cesta_zak}}
            <br>M:{{obr.cesta_mezi}}
            <br>S:{{obr.cestat_stroj}}
            <br>{{obr.nazev}} <br>{{obr.thumb_1}}<br>{{obr.thumb_2}}
          </td>
          <td style="width:35%;text-align:left;padding:10px">
            {{obr.stav}}
          </td>
        </tr>
      </table>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import f from '@/services/fce'
import upload0 from '@/services/upload0'
import Q from '@/services/query'
import url from '@/services/url'
import obrazek from '../../services/ObrazekService'
import {mapState} from 'vuex'
import {getters} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, clearTimeout } from 'timers'
import { forEach } from 'p-iteration'

/*
encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '3c98a500adbd83b1d0d91de062ab913e',
  path: 'uploads/3c98a500adbd83b1d0d91de062ab913e',
  size: 155713 } 'uploads/3c98a500adbd83b1d0d91de062ab913e'
  */

//import Api from '@/services/Api'
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        file: '',
        output: [],
        obrazek1:'',
        obrazekapi: obrazek,
        odkaz:'',
        url:url,
        progres:false,
        cesta:'',
        uploadPercentage: 0,

        nahled:false,
        dialog:false,
        mousedownHandler:false,

        obrazky:[],
        n:0
      }
    },
  watch: {
    dialog(val) {
      if (val) {
        document.addEventListener('mousedown', this.mousedownHandler)
      } else {
        document.removeEventListener('mousedown', this.mousedownHandler)
      }
    },
    n: async function(){
        var neco=[];
         neco=(await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc limit 5')).data.data
         this.obrazky=neco
        }
    },
    async mounted() {
      const self=this
      self.n=0
      //this.obrazky= (await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')).data.data
      setInterval(function(){
        //Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')
        Q.all(self.idefix,'select sum(idefix) as idefix from prilohy_prijem ')
          .then((res)=>{
            self.n=res.data.data[0].idefix
            //console.log(n);
          })
          .catch((e)=>{
                console.log(self.n, " EEEERRRRR " , e);
            //self.obrazky=[]
          }
          )
      },1500)

      //f.Alert(this.odkaz)
      if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      //alert(' Great success! All the File APIs are supported');

    } else {
    alert('The File APIs are not fully supported in this browser.');
    }
    this.obrazek()
    } ,
    methods: {
    async smaz(obrazek_id) {
      const self=this
      //Q.all(self.idefix,`delete from prilohy_prijem where idefix=${obrazek_id}`)
      //return;
      //neco=(await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc limit 5')).data.data
      var smaz=true

      await f.asyncForEach(self.obrazky,async (el)=> {
        if (el.idefix==obrazek_id){

          if (el.cesta_zak>'' && (el.cesta_zak+'').match(/[0-9]$/)){
//            f.Alert('Je uz zakazky, nelze smzatodcud',el.cesta_zak )
            smaz=false;
          }
        }
      })
      if (smaz==true){
        obrazek.del(self.idefix,obrazek_id)
      } else
      if (await self.otazka('Soubor je pridelen k zakazce','Vymazat ?') ) {
          obrazek.del(self.idefix,obrazek_id)
      }

    },
    async otazka(txt1='',txt2='') {
      const self=this
      return new Promise((resolve,rej)=>{
        self.$confirm(txt1 , txt2 , {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Ano?',
        cancelButtonText: 'Ne'
     })
     .then(()=>{

        resolve(true)
     })
     .catch((e)=> {
        resolve(false)
     }
     )


      })
    },
    mousedownHandler(e) {
      if (e.target.classList.contains('v-overlay__scrim')) this.nahled = false
    },
      /*
        Submits the file to the server
      */


      /*
        Handles a change on the file upload
      */
    obrazek(){
      const self=this

       obrazek.all(self.idefix)
       .then((obr)=>{
         self.obrazek1=obr
         console.log(self.obrazek1)
       })

    },

 async handleFileUpload(evt){
   const  self=this
   self.file = evt.target.files[0]; // FileList object
   var nazev=self.file.name
   var idefix_obr=0

   self.fileInfo(evt.target.files)
   //self.obrazky= (await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')).data.data


//alert(nazev)

   var res1=await upload0.all( self.idefix , nazev )
   self.nahled=false
    if (res1.data.a>0) {
      //f.Alert3('1 nalezeno na serveru',res1.data.a, res1.data.files)
    } else {
      idefix_obr = await self.poslatnew()
    }

    self.odkaz=url.url()+'obrazek/'+idefix_obr
    this.obrazky= (await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')).data.data
   //f.Alert3(res1.data.a)


//   f.Alert($('#filexx').val())

 },
 async poslatnew() {
      const self=this
      let formData = new FormData();
      formData.append('file', self.file);
      formData.append('idefix', self.idefix);
      console.log('>> formData >> ', formData);
      this.uploadPercentage=0;
      var res=0;
      self.progres=true;

      // You should have a server side REST API
      //axios.post('http://78.102.17.162:3003/upload',
      axios.post(`${url.url()}upload`,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
             onUploadProgress: function( progressEvent ) {
              this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
            }.bind(this)
          }
        ).then(function () {
          self.progres=false;
          console.log('SUCCESS!!');


        })
        .catch(function (err) {
          console.log('FAILURE!!',err);
        });
   },
    fileInfo(files) {
      const self= this
       // self.file=evt.target.files;
        //self.output=[]


        for (var i = 0, fi; fi = files[i]; i++) {

              self.output.push('<li><strong>', escape(fi.name), '</strong> (', fi.type || 'n/a', ') - ',
                  fi.size, ' bytes, last modified: ',
                  fi.lastModifiedDate ? fi.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
       }
       //console.log('OutPut',self.output)
       //console.log('OutPut ',files[0])
       //f.Alert2(f.Jstr(files))

    },





    },
    computed: {
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',


    ]),
  },
  }
</script>
