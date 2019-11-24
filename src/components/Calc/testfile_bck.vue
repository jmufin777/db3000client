<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <!-- <form method="post" enctype="multipart/form-data"> -->
    <form  method="post" enctype="multipart/form-data" id="ovar11">
      <label>File
        <input type="file" id="filexx" ref="filexx" name="file2xx" v-on:change="handleFileUpload($event)"  />
      </label>
    </form>
      <button v-on:click="submitFile()">Submit</button>
      <!-- </form> -->
    </div>
    <div>
    <!-- <img v-if="false && obrazek1>''" :src="`${obrazek1}`"> -->

        ifx:    {{ idefix }}
        FAJLIK: {{ output }}
      <div id="tajne" style="width:100%;height:100%" class="green">
        <iframe style="width:100%;height:100%" id='skrytaframe' name='skrytaframe'>
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import f from '@/services/fce'
import obrazek from '@/services/ObrazekService'
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
        url:'http://78.102.17.162:3003/',
        cesta:''
      }
    },
    mounted() {

      if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      //alert(' Great success! All the File APIs are supported');

    } else {
    alert('The File APIs are not fully supported in this browser.');
    }
    this.obrazek()
    } ,
    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();


            //return
            //formData.append('file', this.file);

            formData.append('file', file);
            f.Alert2(f.Jstr(formData))

        /*
          Make the request to the POST /single-file URL
          axios.post( 'http://78.102.17.162:3003/file1',
        */

         axios.post( 'http://78.102.17.162:3003/upload',
                 //formData,
                 {'file': file},
                 {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
               }
             ).then(function(){
           console.log('SUCCESS!! 11');
         })
         .catch(function(){
           console.log('FAILURE!! 11');
         });
  //      Api().post('query', { params: {  user: user,query: query}} )
        /*
        Api.post( 'file1',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
        */
      },



      /*
        Handles a change on the file upload
      */
    obrazek(){
      const self=this
      return
       obrazek.all(self.idefix)
       .then((obr)=>{
         self.obrazek1=obr
       })



    },
     async posli(evt) {
       const self=this
        var oformname='off'
        var ovar=''
        var framename='skrytaframe'
        if (document.getElementById(framename)){
        }
        if (!document.getElementById(framename)){
            var ifra= document.createElement("iframe")
            ifra.name=framename
            ifra.id=framename
            alert('vkladam')
          //  document.body.appendChild(ifra);
            document.getElementById("tajne").appendChild(ifra);
          }
        if (!document.getElementById(oformname)){
          ovar = document.createElement("FORM")
          ovar.id='off'
        }
         else {
         ovar = document.getElementById(oformname)
         while (ovar.firstChild) {
           ovar.removeChild(ovar.firstChild);
        }
        }
        var o=evt.target.cloneNode(true)
        o.name='file'
        var ofx=document.createElement("input")
        ofx.type="text"
        ofx.name="idefix"
        ofx.value=self.idefix
        //alert(ofx.value)
        ovar.appendChild(o)
        ovar.appendChild(ofx)


        //ovar.enctype = "application/x-www-form-urlencoded,multipart/form-data,text/plain"
        ovar.enctype = "multipart/form-data"
        ovar.action=self.url+'upload'
        ovar.method="post"
        //ovar.target=framename+"zatim"
        ovar.target=framename
        document.body.appendChild(ovar);
        setTimeout(function(){
          // alert(ovar)
          document.getElementById("off").submit();


          ovar.submit()

            setTimeout(function(){
                       self.obrazek1=''
                       self.obrazek1='http://78.102.17.162:3003/obrazek'
                       //self.obrazek()



          //    self.posli(evt)
            },1000)
          f.Alert('submitned' + ovar.action)
        },800)


     },

 handleFileUpload(evt){
   const  self=this
   self.file = evt.target.files[0]; // FileList object
   f.Alert('1111')
   self.poslatnew()
 },
 poslatnew() {
      const self=this
      let formData = new FormData();
      formData.append('file', self.file);
      formData.append('idefix', self.idefix);
      console.log('>> formData >> ', formData);

      // You should have a server side REST API
      axios.post('http://78.102.17.162:3003/upload',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function () {
          console.log('SUCCESS!!');
        })
        .catch(function (err) {
          console.log('FAILURE!!',err);
        });
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
