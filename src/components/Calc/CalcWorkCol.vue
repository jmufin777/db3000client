<template>
  <!-- <tr style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
     <div style="position:relative;font-size:100%; border:1px solid black;border-right:none;min-height:18em" class="pt-1 pl-0 ml-1 pb-0 "
     :class="{'brown lighten-3': getType()=='Mat1','green lighten-1': getType()=='Laminace','orange lighten-1': getType()=='Kasir','yellow lighten-2': getType()=='Rezani','   lighten-2': getType()=='Rezani'
     , 'pink lighten-5': getType()=='Baleni', 'cyan lighten-3': getType()=='DTP' , 'lime lighten-2': getType()=='Externi'}"
     @click="setKalk(kalkulaceid);setID()"
     @scroll="TestRend=TestRend+1"
     v-if="isDeleted==false"
     :key="TestRend"
     v-cloak
     >
   <div style="position:absolute;width:100%;top:10px;height:90%;background:white" class="white"></div>
    <span v-if="true && kalkulaceid==KalkulaceThis">

      <win-dow v-if="false && getType()=='Rezani'"
          id="a"
          :id="'id_'+getIndex()+'_id'"
          :title="getType()"
          :x="200 * getIndex()"
          :w="400"
          :y="300 + 30* getIndex()"
          :z="0"
          :h="251"
          :parent="false"
          :maximize="false"
          :demo="false"
          >
        <div>OKNO {{getType()}} / {{getId()}} {{ kalkulaceid}}</div>
        <div>budik {{ info }}</div>
        <div>budik {{ filtrDataStro1 }}</div>

      </win-dow>


<!---Materialy - rezani nema k dispozici !!!1//-->
     <!-- <div style="max-height:10em;overflow-y:scroll;position:absolute;z-index:1000"  v-if="form.showtxt && (getType()=='Mat1'  || getType()=='Laminace' || getType()=='Kasir' || getType()=='Jine'  )
            && (filtrData().length>1 || (filtrData().length==1 && filtrData()[0].nazev!=form.txt) )
        " class="elevation-12 yellow"
        :style="'top:'+ getBottom('seek1_'+ID)+'px;width:'+getWidth('seek1_'+ID,8)+'px;left:'+getLeft('seek1_'+ID,1)+'px'" > -->
        <div v-cloak style="max-height:10em;overflow-y:scroll;position:absolute;z-index:1000"  v-if="form.showtxt && (getType()=='Mat1'  || getType()=='Laminace' || getType()=='Kasir' || getType()=='Jine'  )
            && (filtrDat.length>1 || (filtrDat.length==1 && filtrDat[0].nazev!=form.txt) )
        " class="elevation-12 yellow"
        :style="'top:'+ getBottom('seek1_'+ID)+'px;width:'+getWidth('seek1_'+ID,8)+'px;left:'+getLeft('seek1_'+ID,1)+'px'" >
          <span style="display:none">FF {{ filtrDat.length}}</span>
        <!-- {{ filtrData()}} -->
          <table  width="100%" v-if="form.showtxt &&  (getType()=='Mat1'  || getType()=='Laminace' || getType()=='Kasir'|| getType()=='Jine' )"  >
             <!-- <tr class="mt-1 green" v-for="(item, i) in filtrData()" :key="i" > -->
              <tr class="mt-1 green" v-for="(item, i) in filtrDat" :key="i" >
              <td >
              <a :href="'#'" :id="'seek1_'+ID+'_list_'+i"
              @keydown="seznam('seek1_'+ID+'_list_'+i,1,$event)"
              @click="form.txt= item['nazev']; form.showtxt=false; setCol(item)" @focus="lastFocus='seek1_'+ID">
              <v-card class="silver pa-0 ma-0 " style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:80%;height:100%" class="pa-0 ma-0 grey lighten-5">
                <v-card-text style="font-size:90%;text-align:left;width:100%;height:100%" @click="form.txt= item['nazev']; form.showtxt=false; setCol(item)"
                :class="{'blue':1==1, 'blue lighten-5':item['poradi']==111, 'orange lighten-5':item['poradi']>1888888,'grey lighten-5':1==1}"
                class="pa-0 ma-0 pl-1 pr-1"
                >
                 <!-- {{'list_'+i}} : -->
                  {{ item['nazev']}}
                 </v-card-text>
                 </td><td style="width:20%;height:100" class="pa-0 ma-0 grey lighten-5">
                 <v-card-text style="font-size:90%;text-align:center;width:100%;height:100%" @click="form.txt= item['nazev']; form.showtxt=false; setCol(item)"
                 :class="{'grey lighten-5':item['poradi']==10, 'grey lighten-5':item['poradi']>10 ,'grey lighten-5':1==1 }"
                 class="pa-0 ma-0"
                >
                 <!-- {{item['sirka_mm']}} x {{ item['vyska_mm']}} -->
                  {{item['zkratka']}}
                 </v-card-text>
                 </td></tr></table>

              </v-card>
               </a>
              </td>
            </tr>
          </table>
        </div>
        <!--Materilay EOF//-->

        <!--LAMINACE, rezani, baleni - stroj mody!!!//-->
        <!--    // && ( filtrDataStroj().length>1|| (filtrDataStroj().length==1 && filtrDataStroj()[0].nazev!=form.txtStroj) //-->
        <div style="min-height:5px;max-height:10em;overflow-y:scroll;position:absolute;z-index:51001"
        v-if="form.showtxtStroj && (getType()=='Laminace' || getType()=='Kasir' ||  getType()=='Rezani' || getType()=='Baleni' || getType()=='Jine') && filtrDataStro.length > 0" class="elevation-12 teal"
          :style="'top:'+ getBottom('seek2_'+ID)+'px;width:'+getWidth('seek2_'+ID,8)+'px;left:'+getLeft('seek2_'+ID,0)+'px'">
          <span style="display:none">FF {{ filtrDataStro.length}}</span>
        <span style="display:none">
         {{ filtrDataStro}}
         <!-- {{ getBottom('seek2_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtStroj && (getType()=='Laminace' || getType()=='Kasir' ||  getType()=='Rezani' || getType()=='Baleni' || getType()=='Jine' ) " >
             <tr class="mt-0 pa-0 grey lighten-4" v-for="(item1, i1) in filtrDataStro" :key="i1"  >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="'seek2_'+ID+'_list_'+i1"
              @keydown="seznam('seek2_'+ID+'_list_'+i1,1,$event)"
              @click="form.txtStroj= item1['nazev']; form.showtxtStroj=false; setColStroj(item1)" @focus="lastFocus='seek2_'+ID">
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%" @click="form.txtStroj= item1['nazev']; form.showtxtStroj=false; setColStroj(item1)"
                :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                class="ma-0 pa-0 pl-1"
                >
                  {{item1['nazev_stroj'] }} - {{ item1['nazev'] }}
                 </v-card-text>
                 </td></tr></table>

              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>
      <!--LAMINACE//-->

      <!--    Externi Prace //-->
        <div style="min-height:5px;max-height:10em;overflow-y:scroll;position:absolute;z-index:51001"
        v-if="form.showtxtPrace && (getType()=='Externi' ) && filtrDataPrac.length > 0" class="elevation-12 teal"
          :style="'top:'+ getBottom('seek4_'+ID)+'px;width:'+getWidth('seek4_'+ID,8)+'px;left:'+getLeft('seek4_'+ID,0)+'px'">
          <span style="display:none">FF {{ filtrDataPrac.length}}</span>
        <span style="display:none">
         {{ filtrDataPrac}}
         <!-- {{ getBottom('seek2_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtPrace && (getType()=='Externi'  ) " >
             <tr class="mt-0 pa-0 grey lighten-4" v-for="(item1, i1) in filtrDataPrac" :key="i1"  >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="'seek4_'+ID+'_list_'+i1"  @keydown="seznam('seek4_'+ID+'_list_'+i1,1,$event)" @click="form.txtPrace= item1['prace']; form.showtxtPrace=false; setColPrace(item1)" @focus="lastFocus='seek4_'+ID">
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%" @click="form.txtPrace= item1['prace']; form.showtxtPrace=false; setColPrace(item1)"
                :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                class="ma-0 pa-0 pl-1"
                >
                  {{ item1['prace'] }}
                 </v-card-text>
                 </td></tr></table>

              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>
      <!--    Externi Prace //-->

      <!--    Externi Dod //-->
        <div style="min-height:5px;max-height:10em;overflow-y:scroll;position:absolute;z-index:51001"
        v-if="form.showtxtDod && (getType()=='Externi' ) && filtrDataDo.length > 0" class="elevation-12 teal"
          :style="'top:'+ getBottom('seek5_'+ID,40)+'px;width:'+getWidth('seek5_'+ID,8)+'px;left:'+getLeft('seek5_'+ID,0)+'px'">
        <span style="display:none">FF {{ filtrDataDo.length}}</span>
        <span style="display:none">
         {{ filtrDataDo}}
         <!-- {{ getBottom('seek5_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtDod && (getType()=='Externi'  ) " >
             <tr class="mt-0 pa-0 grey lighten-4" v-for="(item1, i1) in filtrDataDo" :key="i1"  >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="'seek5_'+ID+'_list_'+i1"  @keydown="seznam('seek5_'+ID+'_list_'+i1,1,$event)" @click="form.txtDod= item1['firma']; form.showtxtDod=false; setColDod(item1)" @focus="lastFocus='seek5_'+ID">
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%" @click="form.txtDod= item1['firma']; form.showtxtDod=false; setColDod(item1)"
                :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                class="ma-0 pa-0 pl-1"
                >
                  {{ item1['firma'] }}
                 </v-card-text>
                 </td></tr></table>

              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>
      <!--    Externi Prace //-->

      <!--Jen stroj - stroj//-->
        <!--    // && ( filtrDataStroj().length>1|| (filtrDataStroj().length==1 && filtrDataStroj()[0].nazev!=form.txtStroj) //-->
        <div style="min-height:5px;max-height:10em;overflow-y:scroll;position:absolute;z-index:510015;border:1px solid silver"

        v-if="form.showtxtStroj1 && ( getType()=='Rezani' ) && filtrDataStro1.length > 0 "  class="elevation-2 grey lighten-4 pa-0 ma-0"
        :style="'top:'+ getBottom('seek3_'+ID)+'px;width:'+getWidth('seek3_'+ID,8)+'px;left:'+getLeft('seek3_'+ID,0)+'px'">
        <span style="display:none">FF {{ filtrDataStro1.length}}</span>
        <span style="display:none">
         {{ filtrDataStro1}}
         <!-- {{ getBottom('seek2_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtStroj1 && (  getType()=='Rezani' || getType()=='Baleni') " >
             <tr class="mt-0 pa-0" v-for="(item2, i2) in filtrDataStro1" :key="i2" >
              <td class="ma-0 pa-0">
              <a :href="'#'" :id="'seek3_'+ID+'_list_'+i2"  @keydown="seznam('seek3_'+ID+'_list_'+i2,$event)" @click="form.txtStroj1= item2['nazev_stroj']; form.showtxtStroj1=false; setColStroj1(item2)" @focus="lastFocus='seek3_'+ID">
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%"><tr><td style="width:100%" class="ma-0 pa-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%" @click="form.txtStroj1= item2['nazev_stroj']; form.showtxtStroj1=false; setColStroj1(item1)"
                :class="{'blue lighten-5':1==1, 'orange lighten-5':1>1}"
                class="grey lighten-4 pa-0 ma-0 pl-1"
                >
                 {{ item2['nazev_stroj'] }}
                 </v-card-text>
                 </td></tr></table>
              </v-card>
                </a>
              </td>
            </tr>
          </table>
        </div>
      <!--Jen stroj - stroj//-->
     </span>
     <!--- aboslutne pozicivany nabidky !-->
    <form >
        <!-- jen rezani - je nehore, nebor stroj je prvni v nabicce je li pozadavekem//-->

          <v-card style="width:100%;height:35px;float:none;border-radius:25px;border-top-right-radius:10px"
          class="pa-0 ma-0"
          :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
          >
          <v-card-text style="width:100%;z-index:900000; text-align:left " class="pa-0 pt-0 "
          :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
           >
          <div style="width:100%;float:none;border-radius:25px;border-top-right-radius:30px !important;border: solid 0px black !important">
          <table class="pa-0 ma-0 "
          :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
          style="width:100%;border:solid 0px black"> <tr class="pa-0 ma-0 grey lighten-3"><td width="80%" class="pa-0 ma-0 pt-0 pb-0 "
          :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
          >

           <el-dropdown split-button size="small" trigger="click" @command="zmenaType"  style="width:100;height:80% !important"
           :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
           >
            {{getType()}}
            <el-dropdown-menu slot="dropdown" class="grey lighten-5" style="position:absolute;left:150px" >
              <el-dropdown-item  :command="'Mat1'">Materialy</el-dropdown-item>
              <el-dropdown-item  :command="'Laminace'">Laminace</el-dropdown-item>
              <el-dropdown-item  :command="'Kasir'">Kasir</el-dropdown-item>
              <el-dropdown-item  :command="'Rezani'">Rezani</el-dropdown-item>
              <el-dropdown-item  :command="'Baleni'">Baleni</el-dropdown-item>
              <el-dropdown-item  :command="'Jine'">Jine</el-dropdown-item>
              <el-dropdown-item  :command="'Externi'">Externi</el-dropdown-item>
              <el-dropdown-item  :command="'DTP'">DTP</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </td><td width="20%" class="pa-0 ma-0  pr-3" style="border-top-right-radius:30px;text-align:right"
          :class="{'blue lighten-4': $store.state.KalkulaceColThis==getId(),'grey lighten-3': $store.state.KalkulaceColThis!==getId()}"
          >

          <button type="button" style="width:20%;height:26px;text-align:right" class="  px-0 cell" @click="deleteCol()" ><i class="el-icon-delete" size="mini"></i></button>
          </td></tr></table>
          </div>

          </v-card-text>

          </v-card>

          <!-- jen rezani //-->
         <v-card style="width:100%;max-height:60px;float:none" class="pa-0 elevation-0" v-if="getType()!='Externi' && getType()!='DTP' && !getType().match(/Mat/)  && !getType().match(/Laminace/)  && !getType().match(/Kasir/)">
         <v-card-text style="width:100%;" class="pa-0" >
        <!-- :style="'height:'+(17*f1.entrcount(form.txtStroj))+'px'" -->
            <textarea-autosize type="text"
                v-model="form.txtStroj"
                size="mini"
                style="width:100%; height:16px;max-height:60px;border:none;font-size:110%;padding-left:5px;"
                class="nb elevation-0 pb-0 pt-0 p-1"
                :placeholder="'Hledani Stroj '+ getType()+ ' '+ID"
                rows="1"

                @focus.native="fokus('stroj');form.showtxtStroj=true"
                @click.native="fokus('stroj');form.showtxtStroj=true"
                @keydown.native="fokus('stroj');form.showtxtStroj=true;seznam('seek2_'+ID+'_list_0',0,$event)"
                @blur.native="blur1('seek2_'+ID)"

                :id="'seek2_'+ID"
              ></textarea-autosize>
         </v-card-text>
         </v-card>
         <v-card style="width:100%;float:none;max-height:60px;border:none" class="pa-0 pt-0 elevation-0"  v-if="getType()!='Externi' && getType()!='DTP' && !getType().match(/Rez/) && !getType().match(/Baleni/)" >
            <v-card-text style="width:100%;border:none" class="pa-0 elevation-0" >
              <textarea-autosize type="text"
              v-model="form.txt"
              size="mini"
              style="width:100%; height:16px;max-height:60px;border:none;font-size:110%;"
              class="pl-1"
              rows="1"
              :placeholder="'Hledani Mat'+ getType()+ ' '+ID"
              @focus.native="fokus('mat');form.showtxt=true"
              @click.native="fokus('mat');form.showtxt=true"
              @keydown.native="fokus('mat');form.showtxt=true;seznam('seek1_'+ID+'_list_0',0,$event)"
              @blur.native="blur1('seek1_'+ID)"
              :id="'seek1_'+ID"  ></textarea-autosize>
                <!-- {{ getBottom2('seek2_'+ID) }} / {{ getBottom('seek1_'+ID) }} -->
                <!-- {{ filtrDataStroj() }} -->
            </v-card-text>
         </v-card>
         <v-card style="width:100%;float:none" class="pa-0 elevation-0"  v-if="getType()!='Externi' && getType()!='DTP' && !getType().match(/Rez/)  && !getType().match(/Baleni/)" >
          <v-card-text style="width:80%; text-align: left" class="pa-0 pl-1" >
          <select v-if="getType()!=='Mat1'" v-model="form.tisk"  @change="saveVuexData(); classJarda('sel1_'+ID)" :id="'sel1_'+ID"       @keydown="classJarda('sel1opt_'+ID+'_'+form.tisk)"
            style="color:black;font-color:black;border: 1px solid white !important;font-size:110%" class="white lighten-2 pl-0 pr-2 pt-0 pb-0"
          >
            <option v-for="(a,b ) in Tisk"
                :key="a.val"
                :label="a.txt"
                :value="a.val"
                :id="'sel1opt_'+ID+'_'+a.val"
              >
              {{ a.txt }}
            </option>
          </select>

          </v-card-text>
        </v-card>

        <v-card style="width:100%;float:none;height:8em;overflow:scroll;border:none" class="pa-0 elevation-0"  v-if="getType()=='Externi'" > <!-- Puvodni externi //-->
          <v-card-text style="width:100%;" class="pa-0" >
        <!-- :style="'height:'+(17*f1.entrcount(form.txtStroj))+'px'" -->
        <!-- @change.native="form.txtDod=''" -->
            <textarea-autosize type="text"
                v-model="form.txtPrace"
                size="mini"
                style="width:100%; height:16px;max-height:60px;border:none;font-size:110%;"
                class="nb elevation-0 pb-0 pl-1"
                :placeholder="'Hledani Prace '+ getType()+ ' '+ID"
                rows="1"

                @focus.native="fokus('prace');form.showtxtPrace=true"
                @click.native="fokus('prace');form.showtxtPrace=true"
                @keydown.native="fokus('prace');form.showtxtPrace=true;seznam('seek4_'+ID+'_list_0',0,$event)"
                @blur.native="blur1('seek4_'+ID)"

                :id="'seek4_'+ID"
              ></textarea-autosize>
         </v-card-text>
         <v-card-text style="width:100%;" class="pa-0" >
        <!-- :style="'height:'+(17*f1.entrcount(form.txtStroj))+'px'" -->
            <textarea-autosize type="text"
                v-model="form.txtDod"
                size="mini"
                style="width:100%; height:16px;max-height:60px;border:none;font-size:110%;"
                class="nb elevation-0 pb-0 pl-1"
                :placeholder="'Hledani Dod '+ getType()+ ' '+ID"
                rows="1"

                  @focus.native="fokus('dod');form.showtxtDod=true"
                  @click.native="fokus('dod');form.showtxtDod=true"
                @keydown.native="fokus('dod');form.showtxtDod=true;seznam('seek5_'+ID+'_list_0',0,$event)"
                @blur.native="blur1('seek5_'+ID)"
                :id="'seek5_'+ID"
              ></textarea-autosize>
         </v-card-text>
         <v-card-text style="width:100%;text-align:left;" class="pa-0 pl-0" >
              <table class="pa-0">
                <tr>
                  <td class="pl-1 pt-0 pb-0" style="width:20%">
                    Naklad/ks
                  </td>
                  <td style="width:30%" class="prava">
                    <input type="number" v-model="form.ext_naklad_ks" size="mini"  style="width:90%; height:15px; text-align:right;border-bottom: dotted 1px black;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData"
                    @change="form.ext_celkem=form.ext_naklad_ks*form.ext_pocet_ks ;saveVuexData()">
                  </td>
                  <td class="pl-1" style="width:20%">
                    Pocet
                  </td>
                  <td class="prava" style="width:30%">
                    <input type="number" v-model="form.ext_pocet_ks" size="mini"  style="width:90%; height:15px; text-align:right;;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData"
                    @change="form.ext_celkem=form.ext_naklad_ks*form.ext_pocet_ks;saveVuexData()">
                  </td>
                </tr>
                <tr>
                  <td class="pl-1" style="width:20%">
                    Celkem
                  </td>
                  <td class="prava" style="width:30%">
                    <input type="number" v-model="form.ext_celkem" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData" @change="saveVuexData()">
                  </td>
                  <td class="pl-1" style="width:20%">
                    <!-- <td class="nic bila prava pr-2 blue--text " style="width:20%"> -->
                    Prodej
                  </td>
                  <td class="prava" style="width:30%">
                    <input type="number" v-model="form.ext_prodej" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData" @change="saveVuexData()">
                  </td>
                </tr>
              </table>


          </v-card-text>

        </v-card>

        <v-card style="width:100%;float:none;height:7em;overflow:scroll" class="pa-0"  v-if="getType()=='DTP'" >
          <v-card-text style="width:100%; text-align: left" class="pa-0 pl-1" >
            <table style="width:100%;" class="pa-0">
              <tr >
                <td style="width:60%">Prodejni cena</td>
                <td style="width:40%">
                  <input type="hidden" v-model="formx" size="mini"  placeholder="Popis" style="width:100%; height:15px; text-align:left" class="tdl tdn elevation-0 pl-1"  >
                  <input type="number" v-model="form.prodejDTP" size="mini"  placeholder="Prodej DTP" style="width:100%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pl-1 "
                  @change="formx=formx+1"
                   >
                </td>
              </tr>
            </table>


          </v-card-text>
        </v-card>
        <div v-if="getType().match(/Baleni/)">
        <v-card style="width:100%;" class="pa-0 elevation-0"  v-if="getType().match(/Baleni/)" >
          <table style="width:100%" class="elevation-0">
            <tr>
              <!-- <td class="leva pl-1">Zpusob</td> -->
              <td style="width:50%" colspan="1" class="pl-2">
                <table>
                  <tr><td>
                <select v-if="true || getType().match(/Baleni/)" v-model="form.baleni"  @change="saveVuexData(); classJarda('sel2_'+ID)" :id="'sel2_'+ID"
                  @keydown="classJarda('sel2opt_'+ID+'_'+form.Baleni)"
                  style="width:100%;color:black;font-color:black;border: 1px solid white !important;font-size:110%" class="white lighten-2 pl-0 pr-2 pt-0 pb-0"
                >
                  <option v-for="(c,d ) in Baleni"
                      :key="c.val"
                      :label="c.txt"
                      :value="c.val"
                      :id="'sel2opt_'+ID+'_'+c.val"
                    >
                    {{ c.txt }}
                  </option>
                </select>
               </td>
               <td>
                 {{(form.baleni)=='0'?'Cena':(form.baleni=='1')?'Po'+form.baleni:(form.baleni==2)?'Pocet':(form.baleni==3)?'Pocet':'Nevim'}}
                 <input type="hidden" v-model="form.naklad_ks" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData" @change="saveVuexData()">
               </td>

              <td   v-if="form.baleni==0" class="prava">
                <input type="number" v-model="form.naklad_mody" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1"  @change="saveVuexData()">
              </td>

              <td   v-if="form.baleni==1" class="prava">
                <input type="number" v-model="form.naklad_po" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1"  @change="saveVuexData()">
              </td>

              <td   v-if="form.baleni==2" class="prava">
                <input type="number" v-model="form.naklad" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1"  @change="saveVuexData()">
              </td>

              <td   v-if="form.baleni==3" class="prava">
                <input type="number" v-model="form.naklad_cena" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1"  @change="saveVuexData()">
              </td>

            <!-- <tr >
              <td  class="leva pl-1">Naklad ks</td>
              <td  class="prava">
                <input type="number" v-model="form.naklad_ks" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1" @click="readVuexData" @change="saveVuexData()">
              </td>
            </tr> -->
               </tr></table>
            </td></tr>
          </table>


          </v-card>



          </div>


        <v-card class="pa-0" style="max-height:500px;position:absolute;bottom:2em;width:100%">
          <v-card-text style="text-align:left" class="pa-0">
            <textarea
              type="textarea" v-model="form.poznamka"
              style="width:100%; min-height:4em;max-height:160px;border:none;font-size:14px"

              class="nb elevation-0 pb-0 grey lighten-3 pl-2"
              placeholder="poznamka"
              @change="saveVuexData()">
            </textarea>
          <!-- {{ entrcount(form.poznamka) }} {{ (form.poznamka.match(/\n/g) || []).length +1 }} / {{ 'height:'+(16*entrcount(form.poznamka))+'px' }} -->
          </v-card-text>
        </v-card>

        <v-card style="width:100%;float:none;position:absolute;bottom:0px;height:2em;vertical-align: text-bottom;" class="white" v-if="!getType().match(/Balenixx/)">
          <v-card-text style="text-align:left;width:100%;vertical-align: text-bottom;" class="pa-0">
            <table><tr><td style="width:20%">
            &nbsp;Naklad&nbsp;&nbsp;
            </td><td  style="width:30%">
            <input type="number" v-model="form.naklad" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1" readonly @change="saveVuexData()">
            </td><td  style="width:20%">
            <span v-if="level==3" >Korekce&nbsp;&nbsp;</span>
            <span v-else>&nbsp;</span>
            </td><td  style="width:30%">

            <input v-if="level==3" type="number" v-model="form.nakladkorekce" size="mini"  style="width:90%; height:15px; text-align:right;font-size:110%" class="tdl tdn elevation-0 pr-1"  @change="saveVuexData()">
            <span v-else>&nbsp;</span>
            </td></tr></table>
          </v-card-text>
        </v-card>
        <v-card style="width:20%;float:left;display:none" >
          <v-card-text style="text-align:left;width:100%;" class="pa-0">

          </v-card-text>
        </v-card>



        <slot name="obsah">
          <!-- k: {{Kalkulace[k_id()].kalkulaceid}} / {{ k_id() }} /{{Kalkulace[k_id()].type}} -->
         <!-- Slot Menu Leve -->
       </slot>


       </form>

      </div>

  <!-- </div> -->
</template>


<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'

import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, setInterval, clearTimeout } from 'timers'
import ListStroj from '../../services/ListStrojService'
import SQL from '../../services/fcesql'
import Q from '../../services/query'
import f from '../../services/fce'
// Vue.prototype.$f = f;
import { stringify } from 'querystring';



//enum_strojmod_text

export default {
    props: {
    kalkulaceid: {
      type : Number,
      required: true
    } ,
    sloupecid: {
      type : Number,
      required: false
    },
    typid: {
      type : Number,
      required: true
    },
    neco: {
      type : Number,
      required: false
    }

  },
 data () {

   return {
     //soubory:
        dialogImageUrl: '',
        dialogVisible: false,
        info:'info',
        isDeleted: false,
        TestRend :0,
        timeout: false,
        f1: f,
        formx:0,
     //soubory
      MenuLeft: [
     ],
     MenuLeftJoin: [
       {key: 0 , text: 'Druh tisku'},
       {key: 1 , text: 'Velkoploch'},
       {key: 2 , text: 'Archovy'},
     ],

     Format: [],

     FormatJoin: [],

      enum_up: [],
      enum_mod:[],
      enum_mod_full:[],

     Tisk: [
       {val:0,txt:'Jednostranny'},
       {val:1,txt:'Oboustranny'},
       {val:2,txt:'Oboustranny ruzny'},
       {val:3,txt:'Bez tisku'},
     ],

     Baleni: [
       {val:0,txt:'Mody'},
       {val:1,txt:'Balit Po'},
       {val:2,txt:'Pocet Baliku'},
       {val:3,txt:'Je to jedno'},

     ],


     //

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,
       Format: '',
       nakladks: 0,
       filelist:[],
       tisk:0,
       baleni:0,   //Vyber nabidky


       txt: '',  //polozka hledaniho textu 1,  je vztazena k typu sloupce
       txtStroj1:'',
       txtStroj:'',
       txtPrace:'',
       txtDod:'',

       showtxt: false,
       showtxtStroj: false,  //mody stroje
       showtxtStroj1: false, //Jen stroj
       showtxtDod: false, //Jen firma
       showtxtPrace: false, //Jen prace
       //Externi
       ext_naklad_ks:0, //cena za 1 kus
       ext_pocet_ks:0, //pocet ks
       ext_celkem:0, //pocet ks
       ext_prodej:0, //pocet ks


       //Externi
       naklad:0,
       nakladkorekce:0,
       prodejDTP:0,
       //Baleni - polozku naklad

       naklad_mody:0,
       naklad_po:0,
       naklad_cena:0,
       naklad_ks:0,
//Baleni - polozku naklad

       poznamka:'',
       externi: [{
         Popis: '',
         Cena: 0,
       },
       {
         Popis: '',
         Cena: 0,
       },
       {
         Popis: '',
         Cena: 0,
       }
        ],

       itemSelectedStroj: {},
       itemSelectedStroj1: {},
       itemSelectedMat: {},
       itemSelectedDod: {},
       itemSelectedPrace: {},
       stroj: ''
     },

     ID:0,
     SirkaLast:0,
     VyskaLast:0,

     Interval:0,

     countZmen:0,

     //vuex - odkazy
     Kalk: [],
     Cols: [],
     Col:  [],
     Mat:  [],
     MatVolba: 0,
     filtrDat:[],
     filtrDataStro:[],
     filtrDataStro1:[], //Nazby strrojiu pro rezani
     filtrDataDo:[], //Nazby strrojiu pro rezani
     filtrDataPrac:[], //Nazby strrojiu pro rezani
     lastType:'',
     lastFocus:'',
     //filtrDataStroj:[],
     //filtrDataStroj1:[], //Nazby strrojiu pro rezani

   }
 },
 created () {
   const self=this
   var ie=0
   for(ie=0 ;ie<0 ;ie++) {
    self.form.externi.push( {Popis: '', Cena: 0 })
   }
   eventBus.$on('Rend', (server) => {
  if (self.form.showtxt || self.form.showtxtStroj || self.form.showtxtStroj1)   {
     if (self.timeout){
       clearTimeout(self.timeout)
       self.timeout=false
     }
       self.timeout=setTimeout(function() {

         self.TestRend++;
         console.log("Render col ", self.TestRend )

     }, 500)
    }



   //  alert('Rederik'+ self.TestRend)
   })

 },
 async mounted () {
   const self = this
     this.ID = Math.round(Math.random() * 198345813 *Math.random() )
       var neco=JSON.stringify(self.Kalkulace[self.k_id()])
       self.Kalk=JSON.parse(neco)
       try {
         setTimeout(function(){
           self.readVuexData()
         },500)

       } catch(e) {
         f.Alert2('Data potiz')
       }

       //alert("Pripjoj" + self.getType())

      self.Cols=self.Kalk.sloupecid // Sloupce do samostany promenny abych se neposral z tech tecek

      self.Col=self.Cols[self.getIndex()] ;
      setInterval(function(){
        self.hideAll()
      },500)



  var nNic=0;
  var nNic2=0;
//return
self.Interval= setInterval(function()  {

     if (nNic2<20){
      nNic++;

      // document.getElementById('seek'+nNic+'_'+self.ID).dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
      if (nNic>=3) nNic = 0;
      nNic2++;
     }
    //self.filtrData()
    if (self.getType()!=="Mat1"){
      if (self.filtrDataStro1.length==0 && self.txtStroj1==''){
          self.filtrDataStroj1()
      }
    }
    if (self.getType()=="Rezani"){
        if (self.filtrDataStro.length==0 && self.txtStroj==''){
          self.filtrDataStroj()
        }

    }
    if (self.getType() == "Baleni"){
       self.form.naklad = self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs
    }

  },1500 )

 // self.nactiDb()
   return
 },


watch: {
   formx: function() {
     const self = this
      //alert('ahoj')
      self.form.naklad =0
      var neco=0;
      self.form.externi.forEach((el,id) =>{
        neco+=(el.Cena*1)
      })
      self.form.naklad = neco
      this.saveVuexData()

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
      'KalkulaceThis',
      'user',
    ]),

},


 methods: {
 entrcount(neco)   {
   return f.entrcount(neco)
 },

  async nactiDb(ihned=false){
      const self = this
      //return
      setTimeout(function()  {
    // alert(self.getType())

      var atmp=[]

      // self.info=self.Kalkulace[self.k_id()].data.FormatSirka
      if (
        ihned ||
        self.SirkaLast!=self.Kalkulace[self.k_id()].data.FormatSirka  ||
        self.VyskaLast!=self.Kalkulace[self.k_id()].data.FormatVyska
       ) {
        if (self.Kalkulace[self.k_id()].data.FormatSirka == 0 || self.Kalkulace[self.k_id()].data.FormatVyska == 0 ) {
            return
        }
        self.countZmen++;
        // alert('COL 44 ' + JSON.stringify(self.Col)+" / "+ self.getIndex())

//        // self.info="zmena " + self.countZmen;
        self.SirkaLast = self.Kalkulace[self.k_id()].data.FormatSirka // this.$store.state.Kalkulace[self.k_id()].data.FormatSirka
        self.VyskaLast = self.Kalkulace[self.k_id()].data.FormatVyska // this.$store.state.Kalkulace[self.k_id()].data.FormatSirka
        // self.info+=self.idefix+"juzr"
        //self.Col=self.Kalk[self.k_id()][0].sloupecid[self.getIndex()]

        // console.log("COL ", JSON.stringify(self.Col[0].sloupecid))
        console.log("COL 4", JSON.stringify(self.Col))

        var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )

        if (q1>""){
          self.q(q1)
        }
        var q2=SQL.getStroj(self.getType())
        // f.Alert("Q# "+ self.getType() + q2)
        if (q2>""){
          //alert(q2)
          self.qStroj(q2)
          // self.info=q2
        }
        //alert("Q#")
        var q3=SQL.getStroj1(self.getType())
         //alert("Q# "+ self.getType() + q3)
        if (q3>""){

          self.qStroj1(q3)

        }
        if (self.getType()=="Externi"){
           var q4= SQL.getPrace()
           //self.filtrDataPrac= self.qPrace(q4)
           self.Col.DataPrace= self.qPrace(q4)

           var q5= SQL.getDod()
           //self.filtrDataPrac= self.qDod(q5)
           self.Col.DataDod= self.qDod(q5)
        }



        if (self.getType()=="Rezani"){
          // alert('rezba'+JSON.stringify(self.Col.dataStroj1))
          try {
          self.form.itemSelectedStroj1=self.Col.dataStroj1[0]
          } catch(e) {
            console.log("sloupec rezani neni ")
          }

          }
        if (self.getType()=="Kasir"){
          try{
          self.form.itemSelectedStroj1=self.Col.dataStroj1[0]
          self.form.itemSelectedStroj=self.Col.dataStroj[0]
          } catch(e) {
            console.log("sloupec kasir neni ")
          }
          //alert('rezba'+JSON.stringify(self.Col.dataStroj1))
        }
        if (self.getType()=="Laminace"){
          try{
           self.form.itemSelectedStroj1=self.Col.dataStroj1[0]
          self.form.itemSelectedStroj=self.Col.dataStroj[0]
          } catch(e) {
            console.log("sloupec Laminace neni ")
          }

          //alert('rezba'+JSON.stringify(self.Col.dataStroj1))
        }


      }

  },1500)

  },
async   zmenaType(cSloup=""){


      const self = this
      if (cSloup == self.getType()) {
         // self.f1.Alert("Prdlacky")
        return
      }
            self.isDeleted=true
      // self.ID = Math.round(Math.random() * 198345813 *Math.random() )
             self.form.txt= ''  //polozka hledaniho textu 1,  je vztazena k typu sloupce
             self.form.txtStroj1=''
             self.form.txtStroj=''
             self.form.txtDod=''
             self.form.txtPrace=''

             self.filtrDataStro=[]
             self.filtrDataStro1=[]
             self.filtrDat=[]
             self.filtrDataPrac=[]
             self.filtrDataDo=[]
/*
            var q1=SQL.getStroj(cSloup)
            self.filtrDataStro = (await self.qStroj(q1))
            var q2=SQL.getStroj1(cSloup)
            self.filtrDataStro1 = (await self.qStroj1(q2))
*/

             self.form.showtxt       = false
             self.form.showtxtStroj  = false  //mody stroje
             self.form.showtxtStroj1 = false
             self.form.showtxtPrace  = false
             self.form.showtxtDod    = false
             self.form.naklad=0,
             self.form.nakladkorekce=11110,
             self.form.prodejDTP=0,
             self.form.naklad_mody=0
             self.form.naklad_po=0
             self.form.naklad_cena=0
             self.form.naklad_ks=0 //Naklda ks z levy strany
             self.form.poznamka=''
             self.form.itemSelectedStroj= {}
             self.form.itemSelectedStroj1= {}
             self.form.itemSelectedMat= {}
             self.form.externi = []

             self.form.ext_naklad_ks = 0 //cena za 1 kus
             self.form.ext_pocet_ks = 0 //pocet ks
             self.form.ext_celkem = 0 //pocet ks
             self.form.ext_prodej = 0 //pocet ks

             var ie=0
             for(ie=0 ;ie<20 ;ie++) {
              self.form.externi.push( {Popis: '', Cena: 0 })
             }
             //self.Kalk= []
             //self.Cols= []
             self.Col=  []
             self.Mat=  []
             self.MatVolba= 0
     self.saveVuexData()

     self.$store.dispatch('changeColType',{
       kalkulaceid: self.k_id(),
       idxCol: self.getIndex(),
       type: cSloup,
       data: {}
     })

     self.Cols=self.Kalk.sloupecid // Sloupce do samostany promenny abych se neposral z tech tecek
     self.Col=self.Cols[self.getIndex()] ;

     //self.Col.push( self.Cols);
    // alert(self.getType())
     self.readVuexData();
     //return
     setTimeout(function(){
     self.saveVuexData();
             setTimeout(function(){
               //self.nactiDb(true)
               self.isDeleted=false
                //self.f1.Alert(self.TestRend)
               self.ID = Math.round(Math.random() * 198345813 *Math.random() )
               self.TestRend=self.TestRend+1
               self.filtrDataStro=[]
               self.filtrDataStro1=[]
               self.filtrDat=[]
               self.filtrDo=[]
               self.filtrPrac=[]
             },100)
     },100)
   },
   deleteCol(){
      const self = this
      var xData=self.form.txt+self.form.txtStroj1+self.form.txtStroj+self.form.txtPrace+self.form.txtDod

      if (xData=='' || confirm("Odtsranit " + self.getType() +" ?")){
        self.isDeleted=true
        setTimeout(function(){
          eventBus.$emit('MenuHlavni',
        {
          kalkulaceid: self.k_id(),
          idxCol: self.getIndex(),
          key: 555
        }
        )
        },500)
      }

   },

    seznam(id,kod,e, obsah=""){
     const self  = this
     var i=0;
     var aPrvek=id.split("_")

     var nKey=e.keyCode
     var obj1= e.target  //kde stojim
     var objSeznam="";
     var delka=aPrvek.length
     var idPoz= aPrvek[delka -1] ;
     var PrvekBase=""
     var PrvekNext=""
     var PrvekBefore=""
     var tmp=0;

     var PrvekTxt=""

    // self.info=aPrvek
     // self.info.push({dele: aPrvek.length })

     for (i=0;i<(delka-1);i++) {
       if (i < delka -2){
         if (PrvekTxt>"") PrvekTxt+="_"
         PrvekTxt+=aPrvek[i]
       }
       PrvekBase+=aPrvek[i]+'_'
        // self.info.push(PrvekBase)

     }
      // self.info.push({"PrvekTxt": PrvekTxt })
      // self.info.push({"Pozice": idPoz })
      // self.info.push({"base": PrvekBase })

      tmp = idPoz*1;
      if (idPoz>0){
        tmp = tmp -1
        PrvekBefore = PrvekBase + tmp
      }
        tmp = idPoz*1;
        tmp = tmp +1
        PrvekNext = PrvekBase + tmp



     var status = false;


      if (document.getElementById(id)) { //Id odkazuje na prvni radku seznamu = pokud existuje
          status= true;
          objSeznam= document.getElementById(id)
        //  // self.info.push("OK")
      }


     // self.info.push(e.keyCode)
     switch (nKey) {
       case 27:
        setTimeout(function(){
            self.form.showtxt=false
            self.form.showtxtStroj=false
            self.form.showtxtStroj1=false
            self.form.showtxtDod=false
            self.form.showtxtPrace=false
            document.getElementById(PrvekTxt).focus()


          setTimeout(function(){
            self.form.showtxt=false
            self.form.showtxtStroj=false
            self.form.showtxtStroj1=false
            self.form.showtxtDod=false
            self.form.showtxtPrace=false

          },100)

        },100)


        //alert('nevidim jej')
        //f.stopka(e)
        //return true
        break;
     }
     if (kod==0){
       switch (nKey) {
       case 9:
        setTimeout(function(){
          self.form.showtxt=false
          self.form.showtxtStroj=false
          self.form.showtxtStroj1=false
          self.form.showtxtDod=false
          self.form.showtxtPrace=false
        },100)


        //alert('nevidim jej')
        //f.stopka(e)
        //return true
        break;
       case 40:
         f.stopka(e)

         if (status) {
           objSeznam.focus()
           // self.info.push(objSeznam.id)
         } else {
           return
         }
     }

     }
   if (kod==1){

    switch (nKey) {
      case 38:
          f.stopka(e)
          if (PrvekBefore>"" &&  document.getElementById(PrvekBefore)){
            document.getElementById(PrvekBefore).focus()
            break;
          }
      case 40:
          f.stopka(e)
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
      case 36: //Houm
          f.stopka(e)
          PrvekNext = PrvekBase+"0"

          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }

      case 35: //End
          f.stopka(e)
            tmp = idPoz*1;
          while (PrvekNext>"" &&  document.getElementById(PrvekNext)) {

            tmp = tmp +1
            PrvekNext = PrvekBase + tmp
          }
          PrvekNext = PrvekBase + (tmp-1)

          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
      case 34: //PejdzDaun
          f.stopka(e)
          tmp = idPoz*1;
          PrvekNext = PrvekBase + tmp
          for (i=1;i<8;i++){
            if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
              tmp = tmp +1
              PrvekNext = PrvekBase + tmp
            } else {
              if (!document.getElementById(PrvekNext)){
                PrvekNext = PrvekBase + (tmp-1)
              }
              break;
            }
          }
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
         case 33: //PejdzAp
          f.stopka(e)
          tmp = idPoz*1;
          PrvekNext = PrvekBase + tmp
          for (i=1;i<8;i++){
            if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
              tmp = tmp - 1
              if (tmp<=0){
                PrvekNext = PrvekBase + "0"
                break;
              }
              PrvekNext = PrvekBase + tmp

            } else {
              if (!document.getElementById(PrvekNext)){
                PrvekNext = PrvekBase + (tmp+1)
              }
              break;
            }
          }
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
        case 37:  //sipa vleft

          setTimeout(function(){
              document.getElementById(PrvekTxt).focus()
            },50)
        break;
       case 39:  //sipa vright
            setTimeout(function(){
               //e.target.click()
               f.stopka(e)
               e.target.click()
               document.getElementById(PrvekTxt).focus()
               document.getElementById(PrvekTxt).change
            },100)
            //f.stopka(e)
        break;

        case 13:
            //f.stopka(e)
            e.target.click
            setTimeout(function(){
              document.getElementById(PrvekTxt).focus()
            },50)

            break;
     }
     }

//el.selectionEnd = el.selectionStart


   },
  blur1(id) {
    const self = this
      // f.Alert(self.lastFocus, " ", id)
      return
      if (self.lastFocus == id) {
        return
      }
    setTimeout(function(){

      self.form.showtxt       = false
      self.form.showtxtStroj  = false
      self.form.showtxtStroj1 = false
      self.form.showtxtPrace  = false
      self.form.showtxtDod    = false

    },600)
  },
  setID(){
     const self = this
    self.$store.dispatch('setID',{
       ID: self.ID
     })
  },
  getID(){
     const self = this
     return self.$store.state.KalkulaceID

  },
  hideAll(){
       const self = this

    if (self.getID()!= self.ID ){
      //f.Alert('Schovam')
//      console.log("Schovam ", self.ID)

      if (self.form.showtxt )       self.form.showtxt=false
      if (self.form.showtxtStroj )  self.form.showtxtStroj=false
      if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
      if (self.form.showtxtPrace )  self.form.showtxtPrace=false
      if (self.form.showtxtDod )    self.form.showtxtDod=false
    } else {
      // console.log("drzim ", self.ID)
    }

  },
   async fokus(kdezejsem) {
     const self = this
    //  self.$store.dispatch('setID',{
    //    ID: kdezejsem
    //  })

     //self.lastFocus=''
     self.$store.dispatch('KalkulaceColThis',self.getId()) //Jen nastavi KalkulaceThis

     if (self.lastType!= self.getType()){
       // alert('zmane')
       self.filtrDataStro =   []
       self.filtrDataStro1 =  []
       self.lastType = self.getType()

       var q1=SQL.getStroj(self.getType())
       self.filtrDataStro = (await self.qStroj(q1))
       var q2=SQL.getStroj1(self.getType())
       self.filtrDataStro1 = (await self.qStroj1(q2))
       console.log("storj", JSON.stringify(self.filtrDataStro))
     }




      if (kdezejsem.match(/prace/) ){
           if (!self.Col.hasOwnProperty('DataPrace') || self.Col.DataPrace.length==0){
             var q2=SQL.getPrace()
             self.Col.DataPrace = (await self.qPrace(q2))
           }
           await self.filtrDataPrace()
      } else
     if (kdezejsem.match(/dod/) ){
           if (!self.Col.hasOwnProperty('DataDod') || self.Col.DataDod.length==0){
             var q2=SQL.getDod()
             self.Col.DataDod = (await self.qDod(q2))
           }
           await self.filtrDataDod()
           // f.Alert(JSON.stringify(self.filtrDataDo))
      } else
      if (kdezejsem.match(/mat/) ){
        if (!self.Col.hasOwnProperty('data') || self.Col.data.length== undefined ||  self.Col.data.length==0){
         //f.Alert('heldam '+  self.Col.data )
         var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
         // f.Alert(q1)
         // self.filtrDat=(await self.q(q1))
         self.Col.data=(await self.q(q1))
         console.log("MAT 3 \n" , JSON.stringify(self.Col.data))
        }
        console.log("MAT 3 \n" , JSON.stringify(self.Col.data.length))
        await self.filtrData()
         //await self.filtrData()

      }


       //if (kdezejsem.match(/stroj$/) ){
         //var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
         // self.q(q1)
          if (kdezejsem.match(/stroj$/) ){
            if (self.form.showtxt )       self.form.showtxt=false
            //if (self.form.showtxtStroj )  self.form.showtxtStroj=false
            if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
            if (self.form.showtxtPrace )  self.form.showtxtPrace=false
            if (self.form.showtxtDod )    self.form.showtxtDod=false
          } else
          if (kdezejsem.match(/stroj1$/) ){
            if (self.form.showtxt )       self.form.showtxt=false
            if (self.form.showtxtStroj )  self.form.showtxtStroj=false
            //if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
            if (self.form.showtxtPrace )  self.form.showtxtPrace=false
            if (self.form.showtxtDod )    self.form.showtxtDod=false
          } else
          if (kdezejsem.match(/mat/) ){
            //if (self.form.showtxt )       self.form.showtxt=false
            if (self.form.showtxtStroj )  self.form.showtxtStroj=false
            if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
            if (self.form.showtxtPrace )  self.form.showtxtPrace=false
            if (self.form.showtxtDod )    self.form.showtxtDod=false
          } else
          if (kdezejsem.match(/prace/) ){
            if (self.form.showtxt )       self.form.showtxt=false
            if (self.form.showtxtStroj )  self.form.showtxtStroj=false
            if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
            //if (self.form.showtxtPrace )  self.form.showtxtPrace=false
            if (self.form.showtxtDod )    self.form.showtxtDod=false
          } else
          if (kdezejsem.match(/dod/) ){
            if (self.form.showtxt )       self.form.showtxt=false
            if (self.form.showtxtStroj )  self.form.showtxtStroj=false
            if (self.form.showtxtStroj1 ) self.form.showtxtStroj1=false
            if (self.form.showtxtPrace )  self.form.showtxtPrace=false
            //if (self.form.showtxtDod )    self.form.showtxtDod=false
          }
       // }



     // self.nactiDb(true)
     if (self.getType()=="Baleni"){
       self.nactiDb(true)

       //self.f1.Alert("Baleni", self.SQL.getStroj(self.getType()))
     }


     if (kdezejsem.match(/stroj$/) ){
        await (self.filtrDataStroj())
        if (self.filtrDataStro.length == 0 ){
          setTimeout(function() {

          },200)
        }
       // f.Alert('stroj'+ self.filtrDataStro.length)
     }
     return

     console.log("Fokus ", kdezejsem ," ? ", SQL.getStroj(self.getType()) )
     //self.filtrDataStroj();
   },
   async q(qq) {
     const self = this
     var atmp=[]
     // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.data=atmp;
      } catch(e){
        console.log(e)
      }
      console.log("Q MAT2 \n",JSON.stringify(atmp))
      return atmp
   },
   async qStroj(qq) {
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.dataStroj=atmp;
        console.log("DATA STROJ" , JSON.stringify(self.Col.dataStroj))
        // self.info=JSON.stringify(self.Col.dataStroj)
      } catch(e){
        console.log(e)
      }
      return atmp

   },
    async qStroj1(qq) { //Jen stroj
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.dataStroj1=atmp; //Jen Stroj
        self.form.dataStro1 = atmp;

        // self.info=atmp;
        console.log("DATA STROJ" , JSON.stringify(self.Col.dataStroj1))

      } catch(e){
        console.log(e)
      }
      return atmp

   },
   async qDod(qq) { //Jen dodavatel
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.DataDod=atmp; //Jen Stroj
        self.form.dataDo = atmp;

        // self.info=atmp;
        console.log("DATA Dod" , JSON.stringify(self.Col.filtrDataDod))

      } catch(e){
        console.log(e)
      }
      return atmp

   },
   async qPrace(qq) { //Jen dodavatel
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.DataPrace=atmp; //Jen Stroj
        self.form.filtrDataPrac = atmp;

        // self.info=atmp;
        console.log("DATA Dod" , JSON.stringify(self.Col.filtrDataPrace))

      } catch(e){
        console.log(e)
      }
      return atmp

   },
   classJarda(xId){

     var neco = document.getElementById(xId)
     if (neco) {
       neco.className="jarda"
     }

     //alert(neco)
   },

   saveVuexData(aa) {
     const self = this
    if (self.form.poznamka== undefined ){
      self.form.poznamka=''
       }
    self.form.poznamka = (self.form.poznamka+'').trim()



     self.$store.dispatch('replaceKalkCol',{kalkulaceid: self.k_id(), idxCol: self.getIndex(),
     data: {
       mat: self.form.itemSelectedMat,
       stroj: self.form.itemSelectedStroj,
       stroj1: self.form.itemSelectedStroj1,
       dod: self.form.itemSelectedDod,
       prace: self.form.itemSelectedPrace,
       naklad: self.form.naklad,
       nakladkorekce: self.form.nakladkorekce,
       naklad_mody: self.form.naklad_mody, //Baleni
       naklad_po: self.form.naklad_po,  //Baleni
       naklad_cena: self.form.naklad_cena, //Baleni
       naklad_ks: self.form.naklad_ks, //pocet kusu zleva

       tisk: self.form.tisk,
       baleni: self.form.baleni,
       poznamka: self.form.poznamka,
       externi:  self.form.externi,
       prodejDTP: self.form.prodejDTP,
       ext_naklad_ks: self.form.ext_naklad_ks,
       ext_pocet_ks:  self.form.ext_pocet_ks,
       ext_celkem: self.form.ext_celkem,
       ext_prodej: self.form.ext_prodej,

        }} )

   },
   readVuexData() {
     // return
     const self = this
     if (self.getIndex()  < 0) {
       return
     }
     var neco = self.$store.state.Kalkulace[self.k_id()].sloupecid[self.getIndex()]


       try {
          self.form.itemSelectedStroj  = neco.data.stroj
          self.form.itemSelectedStroj1 = neco.data.stroj1
          self.form.itemSelectedMat    = neco.data.mat
          self.form.itemSelectedDod    = neco.data.dod
          self.form.itemSelectedPrace  = neco.data.prace
          self.form.naklad             = neco.data.naklad
          self.form.nakladkorekce      = neco.data.nakladkorekce
          self.form.prodejDTP          = neco.data.prodejDTP

          self.form.naklad_mody        = neco.data.naklad_mody //Baleni
          self.form.naklad_po          = neco.data.naklad_po //Baleni
          self.form.naklad_cena        = neco.data.naklad_cena //Baleni
          self.form.tisk               = neco.data.tisk
          self.form.baleni             = neco.data.baleni
          self.form.poznamka           = neco.data.poznamka

          self.form.ext_naklad_ks = neco.data.ext_naklad_ks //cena za 1 kus
          self.form.ext_pocet_ks  = neco.data.ext_pocet_ks //pocet ks
          self.form.ext_celkem    = neco.data.ext_celkem   //pocet ks
          self.form.ext_prodej    = neco.data.ext_prodej   //pocet ks

       } catch (e) {
         f.Alert2('Nelze jsit data pro index ', self.getIndex() ,JSON.stringify(neco)  )
       }

          if (self.getType() == "Externi"){
            if (neco.data.externi!==undefined) {
              self.form.externi            = JSON.parse(JSON.stringify(neco.data.externi))
            }

          }

     if (self.getType() == "Baleni"){
       if (f.isEmpty(self.form.baleni)){
         self.form.baleni=0
       }


       //f.Alert(self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs)
       self.form.naklad_ks = self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs
       //f.Alert(form.baleni)
       //self.form.naklad_ks = 50000
     }

     try  {
       self.form.txt       = neco.data.mat.nazev
       //alert( JSON.stringify(neco.data.mat.nazev))
     } catch(e) {
       //alert('nei nazev Matrose')
     }

     try  {
       self.form.tisk             = neco.data.tisk
       if (self.form.tisk== undefined) self.form.tisk =0

       //alert( JSON.stringify(neco.data.mat.nazev))
       //alert(neco.data.tisk)
     } catch(e) {

       //alert('nei nazev Matrose')
     }

     try  {
       self.form.txtStroj       = neco.data.stroj.nazev
       //self.form.txtStroj = "ahokj"
       //alert( JSON.stringify(neco.data.stroj) + " / " + neco.data.stroj.nazev)
     } catch(e) {
       //console.log('nei nazev stroje ve sloupci ' + self.getType())
     }
     try  {
      self.form.txtStroj1       = neco.data.stroj1.nazev_stroj
       //self.form.txtStroj = "ahokj"
       //alert( JSON.stringify(neco.data.stroj1) + " / " + neco.data.stroj1.nazev_stroj)
     } catch(e) {
       //console.log('nei nazev stroje ve sloupci ' + self.getType())
     }

     try  {
      self.form.txtDod       = neco.data.dod.firma
     } catch(e) {
       //console.log('nei nazev stroje ve sloupci ' + self.getType())
     }

    try  {
      self.form.txtPrace       = neco.data.prace.prace
     } catch(e) {
       // console.log('nei nazev stroje ve sloupci ' + self.getType())
     }


   },
   setCol(itemSelected){
     const self = this
     var aTmp={}
      //alert("Materila " + self.getIndex())
      self.form.itemSelectedMat = itemSelected;
     if (self.getType()=='Mat1' || true ){
       self.saveVuexData();
       // alert("k_id: mators "+ self.getType() +  ' ' +self.k_id())
       return
     }
   },
   setColPrace(itemSelected){
     const self = this
      self.form.itemSelectedPrace = itemSelected;
     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return

     }
   },
   setColDod(itemSelected){
     const self = this
      self.form.itemSelectedDod = itemSelected;
     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return

     }
   },
   setColStroj1(itemSelected){
     const self = this
      self.form.itemSelectedStroj1 = itemSelected;
     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return
     }
   },
   setColStroj(itemSelected){
     const self = this
      self.form.itemSelectedStroj = itemSelected;
     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return
     }
   },

   async filtrDataOld() {
      const self = this
      var neco =[]

      try {
      neco = self.Col.data.filter(el => (
          (
          //(el.nazev).toUpperCase().match(self.form.txt.toUpperCase())  || self.form.txt ==''
          self.vyraz(el.nazev).match(self.vyraz(self.form.txt))  || self.form.txt ==''
        //        ||
         // (el.sub).toUpperCase().match(self.form.txt.toUpperCase())  || self.form.txt ==''
         )
          ))

       } catch (e) {
         console.log("Asi cekam na materialy")
         var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
         self.q(q1)

       }
      return neco
   },
   vyraz(ctxt){
     return f.vyraz(ctxt)
   },
   async filtrData() {
      const self = this
      var neco =[]
      self.filtrDat=[]
      if (self.Col.hasOwnProperty('data')){
          self.Col.data.forEach((el, idx) => {
            if (self.vyraz(el.nazev).match(self.vyraz(self.form.txt))  || self.form.txt =='') {
              self.filtrDat.push(el)
            }

          })
      } else {
          var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
          neco =  (await self.q(q1))
          self.filtrDat = neco
          self.Col.data = neco
      }
      return

   },
   async filtrDataPrace() {
      const self = this
      var neco =[]
      var idx = -1
      var zadanDod = false
      self.filtrDataPrac=[]

      if (self.Col.hasOwnProperty('DataDod') && self.form.itemSelectedDod && self.form.txtDod >'') {
        zadanDod = true
      }
      if (self.Col.hasOwnProperty('DataPrace') && self.Col.DataPrace.length ){
           // f.Alert('heldcka' ,self.Col.DataPrace.length )

          self.Col.DataPrace.forEach(el=>{
              //console.log(el.nazev);
            if (self.Col.hasOwnProperty('DataDod') && self.form.itemSelectedDod) {

              idx = _.indexOf(el.dod_seznam,self.form.itemSelectedDod.idefix_firma)   //console.log(el.nazev);
              //if (idx >-1) f.Alert(idx)
            }
            if ( idx >=0 && self.form.txtPrace ==''){
          //    el.prace+= "/ A " + idx
              neco.push(el)
              self.filtrDataPrac.push(el)
              self.form.showtxtPrace=true
            } else
            if (!zadanDod &&  self.form.txtPrace ==''){
      //        el.prace+= "/ B " + idx
              neco.push(el)
              self.filtrDataPrac.push(el)
              self.form.showtxtPrace=true
            } else
            if (self.form.txtPrace > '' &&  el.prace== self.form.txtPrace) {
              self.form.showtxtPrace=true
              console.log("Stejny " + self.form.txtPrace + " // " + el.prace )
              neco=[]
              self.filtrDataPrac=[]
              //return ;
            } else
            if (!zadanDod && self.form.txtPrace > '' && (self.vyraz(el.prace)).indexOf(self.vyraz(self.form.txtPrace))>=0
            // &&  (el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())
            ) {
        //      el.prace+= "/ C " + idx
              //self.form.showtxtStroj=true
              self.filtrDataPrac.push(el)
              neco.push(el)
            }

          })

      } else {
        // alert('heldcka 22')
        var q1=SQL.getPrace()
          //f.Alert('Ctu')
          neco =  (await self.qPrace(q1))
          self.filtrDataPrac = neco
          self.Col.DataPrace = neco

       return []
      }
      console.log("Delke neco " , neco.length)
      return neco
   },
      async filtrDataDod() {
      const self = this
      var neco =[]
      var idx = -1
      self.filtrDataDo=[]
      if (self.Col.hasOwnProperty('DataDod')){
          self.Col.DataDod.forEach(el=>{
            if (self.Col.hasOwnProperty('DataPrace') && self.form.itemSelectedPrace) {
              idx = _.indexOf(el.prace_seznam,self.form.itemSelectedPrace.idefix_prace)   //console.log(el.nazev);
            }
            if ((!self.form.itemSelectedPrace || self.form.txtPrace =='') && self.form.txtDod =='' ) {
              neco.push(el)
              self.filtrDataDo.push(el)
              self.form.showtxtDod=true
            } else
            if ((!self.form.itemSelectedPrace || self.form.txtPrace =='') && self.form.txtDod > '' && (self.vyraz(el.firma)).indexOf(self.vyraz(self.form.txtDod))>=0 ) {
              neco.push(el)
              self.filtrDataDo.push(el)
              self.form.showtxtDod=true
            } else
            if (idx >=0  && self.form.txtDod =='' ){
              neco.push(el)
              self.filtrDataDo.push(el)
              self.form.showtxtDod=true
            } else
            if (idx >=0  && self.form.txtDod > '' &&  el.firma== self.form.txtDod) {
              self.form.showtxtDod=true
              console.log("Stejny " + self.form.txtDod + " // " + el.prace )
              neco=[]
              self.filtrDataDo=[]
            } else
            if (idx >=0  && self.form.txtDod > '' && (self.vyraz(el.firma)).indexOf(self.vyraz(self.form.txtDod))>=0
            ) {
              console.log(el.prace_seznam)
              self.filtrDataDo.push(el)
              neco.push(el)
            }
          })

      } else {
        var q1=SQL.getDod()
          neco =  (await self.qDod(q1))
          self.filtrDataDo = neco
          self.Col.DataDod = neco
       return []
      }
      return neco
   },
   async filtrDataStroj() {
      const self = this
      var neco =[]
      self.filtrDataStro=[]
      // self.info+="B"


//      console.log('dataStroj', self.getType() )
      if (self.Col.hasOwnProperty('dataStroj')){


          self.Col.dataStroj.forEach(el=>{
              //console.log(el.nazev);
            if ( self.form.txtStroj ==''){
              neco.push(el)
              self.filtrDataStro.push(el)
              self.form.showtxtStroj=true
            } else
            if (self.form.txtStroj > '' &&  el.nazev== self.form.txtStroj) {
              self.form.showtxtStroj=true
              console.log("Stejny " + self.form.txtStroj + " // " + el.nazev )
              neco=[]
              self.filtrDataStro=[]
              //return ;
            } else
            if (self.form.txtStroj > '' && (self.vyraz(el.nazev)).indexOf(self.vyraz(self.form.txtStroj))>=0
            // &&  (el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())
            ) {
              //self.form.showtxtStroj=true
              self.filtrDataStro.push(el)
              neco.push(el)
            }

          })

      } else {
        var q1=SQL.getStroj(self.getType())
          //f.Alert('Ctu')

          self.filtrDataStro = (await self.qStroj(q1))

       return []
      }
      console.log("Delke neco " , neco.length)

      return neco
   },
   filtrDataStroj1() {
      const self = this
      var neco =[]
      self.filtrDataStro1=[]


      console.log('dataStroj1')
      if (self.Col.hasOwnProperty('dataStroj1')){
           // self.info+= "A"
          self.Col.dataStroj1.forEach(el=>{

              // self.info+= self.form.txtStroj1 //console.log(el.nazev);
            if ( self.form.txtStroj1 ==''){
              // self.info+= el.nazev_stroj
              neco.push(el)
              self.filtrDataStro1.push(el)
              self.form.showtxtStroj1=true
            } else
            if (self.form.txtStroj1 > '' &&  el.nazev_stroj== self.form.txtStroj1) {
              self.form.showtxtStroj1=true
              console.log("Stejny " + self.form.txtStroj1 + " // " + el.nazev_stroj )
              neco=[]
              self.filtrDataStro1=[]
              //return ;
            } else
            if (self.form.txtStroj1 > '' && (self.vyraz(el.nazev_stroj) ).indexOf(self.vyraz(self.form.txtStroj1))>=0
            // &&  (el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())
            ) {
              //self.form.showtxtStroj=true
              self.filtrDataStro1.push(el)
              neco.push(el)
              //console.log("Pozice" , (el.nazev).toUpperCase().indexOf(self.form.txtStroj.toUpperCase()) , " : ",(el.nazev).toUpperCase() ,  self.form.txtStroj.toUpperCase() )
              //console.log("NECO " , neco)
            }
            //el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())  ||

          })
      //   return self.Col.dataStroj

      } else {
        var q1=SQL.getStroj1(self.getType())
          self.qStroj1(q1)
          return []
      }


      console.log("Delke neco " , neco.length)
      // self.filtrDataStro=neco;
      // neco = self.Col.dataStroj
      return neco
   },

   getBottom(id,addPoz=10, idVztah="obal1_kalkulace") {
     var neco=200
     var oNeco
     var obal= document.getElementById(idVztah)
   //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetTop+oNeco.offsetHeight+ addPoz
       neco = neco - obal.scrollTop
       //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

       //oNeco.parentElement.style.background='pink'

       //neco = oNeco.offsetTop
   //    alert(neco+ " // "+ id )

     } else {

     }

     return neco;
   },

   getLeft(id,addPoz=10,idVztah="obal1_kalkulace") {
     var neco=500
     var oNeco
     var obal= document.getElementById(idVztah)
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetLeft+addPoz

       var r2 = oNeco.closest("#test_1");
       neco = neco - r2.scrollLeft
       console.log(neco," LEFT ", obal.scrollLeft, " Left Neco " , oNeco.scrollLeft, oNeco.parentElement.scrollLeft , " R2 ", r2.id , "scr ", r2.scrollLeft , " r ", r2.scrollWidth )



     } else {
     }

     return neco;
   },
   getWidth(id,addPoz=10) {
     var neco=300
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetWidth+addPoz

       //neco = oNeco.offsetTop
       //alert(neco)

     } else {

     }

     return neco;
   },
   querySearch501(queryString, cb) {  //Nazev
        var n1 = self.Col.Data
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      handleSelect(item) {
        console.log(item)
      },
    createFilter(queryString) {
        return (link) => {
          if (link.value == null ) {
            return ''
          }
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
   async strojmod() {
     const self = this
     var atmp=[]
     var found = true

     atmp=(await ListStroj.one(this.user,-1,1041)).data.enum_strojmod_full
     self.enum_mod_full = atmp
     if (!atmp.length || atmp.length == 0)  return
     //self.enum_up=atmp
      //console.log(atmp.length)
     //return
     atmp.forEach(el => {
       //console.log(el)
       found = self.enum_up.find( el2=>{
          return el2.text == el.stroj
       })

      if (!found) {

        self.enum_up.push({'text': el.stroj})
      }

     })
      //self.enum_up=atmp
     //if (atmp.
     //this.enum_up
   //  alert(enum_up)
   },

   async matKat() {


   },
  ShowMod(a) {
     const self = this
     console.log(a)
     self.form.stroj = a
   },
   MenuRet(a,b) {
     const self = this
     console.log("a",a)
     self.MenuLeftJoin.forEach(el => {
       if (el.text == a) {
         self.form.MenuRet = el.key
         console.log("ret",self.form.MenuRet)
         return
       }
     })
     //eventBus.$emit('WorkLeft',{key: self.nRet })
     //console.log(a ,"::: ", self.nRet)

   },
   SetFormat(a,b) {
     const self = this
     console.log("a",a)
     self.FormatJoin.forEach(el => {
       if (el.text == a) {
         self.form.sirka = el.sirka*1
         self.form.vyska = el.vyska*1
         self.form.Format = el.text
         //console.log("ret",self.form.MenuRet)
         return
       }
     })
   },

   getType() {
     var cRet=   this.$store.getters.getIdColType(this.kalkulaceid,this.sloupecid)
    return cRet
     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}
   },
   getIndex() {
  //   var idK = k_id()
//     var cType = this.$store.state.Kalulace[idK].sloupecid[sloupecid]
  var kRet=   this.$store.getters.getIdCol(this.kalkulaceid,this.sloupecid)
  return kRet
     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}
   },

getId() {
  //   var idK = k_id()
  //    var cType = this.$store.state.Kalulace[idK].sloupecid[sloupecid]

  return this.sloupecid

     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}


   },


   setKalk(idK) {
     const self=this
       this.$store.dispatch('setKalk',idK) //Jen nastavi KalkulaceThis
       self.$store.dispatch('KalkulaceColThis',self.getId()) //Jen nastavi KalkulaceThis

            //alert(idK)
            //self.$store.dispatch('replaceKalk',{dataAll: self.Kalk})
    },
    k_id() {
  var kRet=   this.$store.getters.getId(this.kalkulaceid)
  return kRet

 },

   //Soubory
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`renove before ${ file.name }？`);
      }

   //Soubory



 }
}

</script>

<style>
.v-list__tile .v-list__tile--link .v-list__tile--active .theme--light .primary--text {
  z-index: 1000000 !important;
  opacity: 0.5;
  background:black !important;
}
textarea:focus, input:focus{
    outline: 1px dashed;
}

a:focus {

    color: black;
    font-weight: 900;
    background: white;
    outline: 0px ;

}
a {
   text-decoration: none;
}

select option div {
/*
    background: greenyellow !important;
    background-color: #fff !important;
    border: 10px dashed #d9d9d9  !important;
    border-radius: 6px !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    width: 98% !important;
    height: 80px !important;
    text-align: left  !important;
    position: relative !important;
    overflow: hidden !important;
  */
}
</style>
<style scoped>
textarea:focus, input:focus{
    outline: 0px dashed;
}
.tdl .tdn {
  background: green

}
input textarea {
  border-bottom: dotted 1px black;

}
input[type="number"] {
  border-bottom: dotted 1px black;

}


a:focus {
    color: black;
    font-weight: 900;
    background: white;

}
select, option {
    color: black;
    font-size:12px;

    /* font-weight: 600; */

}
select:focus, option:focus {
    color: black;
    /* font-weight: 600; */

}

a {
   text-decoration: none;
}
.sloupec {
  vertical-align: text-top;
}

table tr td {
  border:none;
  border-right: solid 0px white;border-bottom: solid 0px white;
  border-collapse:collapse;
}

input {
  border:none;

}

.el-upload-dragger1 {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 98%;
    height: 80px;
    text-align: left;
    position: relative;
    overflow: hidden;
}
select option div {

    background: greenyellow !important;
    background-color: #fff !important;
    border: 1px dashed #d9d9d9  !important;
    border-radius: 0px !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    width: 98% !important;
    height: 80px !important;
    text-align: left  !important;
    position: relative !important;
    overflow: hidden !important;
}
.jarda {
    /* background: greenyellow !important; */
}


</style>


