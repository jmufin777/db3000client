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
       <div style="width:900px">
      <table width="500px">
        <tr v-for="(obr,i) in obrazky" :key="i">
          <td @mouseenter="odkaz=url.url()+'obrazek/'+obr.idefix;nahled=true">
          {{obr.idefix}}
          </td>
          <td @mouseenter="nahled=false">
            <a :href="url.url()+'obrazek_orig/'+obr.idefix" target="new">
            <img :src="url.url()+'obrazek_small/'+obr.idefix" height="100px"/>
            </a>
          </td>


        </tr>
      </table>
    </div>
    <div>



    <!-- <img v-if="false && obrazek1>''" :src="`${obrazek1}`"> -->
<v-progress-circular :value="uploadPercentage"></v-progress-circular>
        ifx:   {{ odkaz }} {{ idefix }} / {{ uploadPercentage }}
        FAJLIK: {{ output }}
        nbahled {{nahled}}






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
        odkaz:'',
        url:url,


        cesta:'',
        uploadPercentage: 0,

        nahled:false,
        dialog:false,
        mousedownHandler:false,

        obrazky:[],
      }
    },
  watch: {
    dialog(val) {
      if (val) {
        document.addEventListener('mousedown', this.mousedownHandler)
      } else {
        document.removeEventListener('mousedown', this.mousedownHandler)
      }
    }
  },





    async mounted() {
      const self=this

      this.obrazky= (await Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')).data.data
      setInterval(function(){
        Q.all(self.idefix,'select * from prilohy_prijem order by idefix desc')
          .then((res)=>{
            self.obrazky=res.data.data
          })
          .catch((e)=>{
            self.obrazky=[]

          }
          )

      },3000)

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

      handleFileUpload2(evt){
        const  self=this
        var files = evt.target.files; // FileList object
        //setInterval(function(){
          //self.posli(evt)
           self.posli(evt)
           .then(()=>{
             console.log("Doeslano")
             self.obrazek1=self.url+'obrazek/1'

           })
        //}, 5000)



        //ovar.action='http://www.another_page.com/index.htm';


        return
        self.file=evt.target.files;
        self.output=[]

        for (var i = 0, fi; fi = files[i]; i++) {
              self.output.push('<li><strong>', escape(fi.name), '</strong> (', fi.type || 'n/a', ') - ',
                  fi.size, ' bytes, last modified: ',
                  fi.lastModifiedDate ? fi.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
       }
       //self.submitFile2(files)
     //setInterval(function() {
         self.submitFile2(files)
      //},1000)


        //alert(JSON.stringify(files))
        //self.file = this.$refs.file.files[0];

        //alert(JSON.stringify(this.$refs.file.files))
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
