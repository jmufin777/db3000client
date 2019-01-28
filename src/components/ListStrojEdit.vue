<template>
 <win-dow :title="'events'" :id="`events`"

    :x="xMyska"
    :w="1024"
    :y="100"
    :z="0"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="false"
    :forgetWH="false"
    :forgetAll="false"
    v-if="IsDialog1 && list && list.data && list.data.stroj && list.data.stroj[0]"

    >
<!-- <span slot="a1">A1</span>
<span slot="a2">A2</span>
<span slot="a3">A3</span> -->


<div slot="b1" class="green lighten-4 elevation-2" style="height:40px;font-size:18px">{{ stepInfo}} </div>
<!-- <span slot="b3">B3</span> -->
<div slot="a1" style="height:40px;font-size:18px;" class="px-2 green lighten-4 elevation-2" >
{{ ((isCopy ==false )?'Zmena':'Nova polozka ') +' ' + list.data.stroj[0].nazev  }}
</div>
<div slot="c1" style="height:40px;font-size:18px" class="green lighten-4 elevation-2">
      <el-button v-if="isCopy == false " type="primary" id="btn_user_new_submit8210" @click="submitForm('formnew')" size="mini"> Novy Upravou</el-button>
      <el-button v-if="isCopy" type="primary" id="btn_user_submit8210" @click="submitForm('form')" size="mini"
        >Vlozit </el-button>
       <el-button v-else type="primary" id="btn_user_submit8210" @click="submitForm('formstep0')" size="mini"
       class="blue"
        >Ulozit</el-button>
      <el-button v-if="isCopy" @click="resetForm('form')" id="btn_cancel_submit8210" size="mini">Zrusit</el-button>
      <el-button v-else @click="resetForm('form')" id="btn_cancel_submit8210" size="mini" class="blue--text">Zavrit</el-button>
<!--
        <el-button @click="cancelForm" id="btn_cancel_submit8210" size="mini" style="height:40px;font-size:18px">Zavrit</el-button>
        -->
</div>

 <el-row slot="b22" style="height:20px;font-size:14px;">

 <el-tabs v-model="step2" @tab-click="handleClick" class="mx-4">
        <el-tab-pane label=" Rozmery"  name="1"></el-tab-pane>
        <el-tab-pane label=" Priprava, mod "  name="2"></el-tab-pane>
        <el-tab-pane label=" Ceny"  name="3" ></el-tab-pane>
      </el-tabs>
  </el-row>
  <span slot="a2" style="height:20px;font-size:18px">

      &nbsp;
  </span>

<!-- <span slot="c3">C3</span> -->
 <div
        persistent
        max-width="900px"
        style="position:absolute;top:30px;left:0px;height:100%;width:100%;background:white"
        scrollable
        v-if="IsDialog1"
    >
<v-card
      class="mx-0 my-0"
    >
      <v-card-title class="title font-weight-regular justify-space-between">



        <!-- <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="14"
          v-text="step"
        >

        </v-avatar> -->
<!-- Step: {{step2}} / {{ step }}  /{{ idefixThis }} -->


      </v-card-title>

       <v-window v-model="step">


      <form  id="form8210" ref="form3" :model="form3" label-width="70px" :label-position="labelPosition"
        class="demo-ruleForm is-success" >

         <v-window-item :value="1">

        <v-card v-show="step2=='1'"><v-card-text>


    <el-row class="ma-2">
     <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >
    <el-row class="ma-2">
     <el-col :span="2">Nazev </el-col>
     <el-col :span="5">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.stroj[0].nazev"
      :fetch-suggestions="querySearch1"
      placeholder="Nazev stroje"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
     </el-col>
     <el-col :span="3">Technologie </el-col>
     <el-col :span="4">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.stroj[0].nazev_text"
      :fetch-suggestions="querySearch2"
      placeholder="Technologie"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
    </el-col>
    <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-strojskup','Skupiny Stroju')" style="width:90%">Skupina stroje:</el-button> </el-col>
     <el-col :span="4" >

       <el-select v-model="list.data.stroj[0]['idefix_strojskup']"
        default-first-option

         size="mini"  class="pt-0 pl-1">
            <el-option
            v-for="item8 in list.data.enum_strojskup"
            :key="item8.idefix*1"
            :label="item8.nazev"
            :value="item8.idefix*1"
           >{{item8.nazev}} </el-option>
       </el-select>

     </el-col>
    </el-row>
    <el-row class="ma-2">
      <el-col :span="24"><hr></el-col>
    </el-row>
    <el-row class="ma-2">
     <el-col :span="6">max šířka materiálu mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_mat_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">max délka materiálu mm</el-col>

     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_mat_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">max šířka tisku mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_tisk_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">max délka tisku mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_tisk_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
<!--//
    <el-row class="ma-2">

     <el-col :span="6">max šířka laminace mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_lam_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">max délka laminace mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_lam_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
-->
    <el-row class="ma-2">

     <el-col :span="6">technologický okraj strana mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_strana_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">technologický okraj začátek mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_start_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">technologická mezera mezi kopiema mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_spacecopy_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">technologická mezera mezi jobama mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_spacejobs_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
    </el-row>
    <el-row class="ma-2">

     <el-col :span="6">technologický okraj konec mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_end_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">bezokrajový tisk</el-col>
     <el-col :span="3">
     <input style="height:14px;width:14px" type="checkbox" @change="changeBezOkraj" name="bezOkraje" value="1"  :checked="(list.data.stroj[0].bez_okraj==1)?true:false">
     <!-- <el-input-number v-model="list.data.stroj[0].bez_okraj" size="mini"  style="width:100%"></el-input-number> -->
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">velikost spadávky pro technologii mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].spadavka_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">prostor pro strojové ořezové značky - mm?</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].space_znacky_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
    </el-row>




       <!-- <el-input  v-model="list.data.mat[0].nazev1" size="mini"></el-input> -->

     </el-col>
    </el-row>

         </v-card-text></v-card>
         </v-window-item>

   <v-window-item :value="2" style="opacity:1" >

     <v-card v-show="step2=='2'">
       <v-card-text>
     <el-row class="ma-2">

     <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >



      <el-row class="ma-2" >
        <div  ref="seznam"  class=grid-content >
        <ta-ble3  :h="'360px;width:100%'" :Sirka="1000" :Leva="'20%'" :Prava="'10%'" :Stred="'70%'" >
         <table slot="head" :style="pof(Sirka*0.9,100)">
            <thead  >
              <tr>
              <th :style="pof(Sirka*0.9,22)+';color:red'">Prace</th>
              <th :style="pof(Sirka*0.9,15)">Rozliseni</th>
              <th :style="pof(Sirka*0.9,15)">Rychlost</th>
              <th :style="pof(Sirka*0.9,15)">Jednotka</th>
              <th :style="pof(Sirka*0.9,10)">Prioritni</th>
              <th :style="pof(Sirka*0.9,25)">Zbytek</th>
              </tr>
            </thead>
        </table>

        <table slot="body" :style="pof(Sirka*0.9,100)">
        <tbody  >

              <tr v-for="(itemFull, iFull) in list.data.strojmod" :key="iFull" class="tdline nb tdlr"
              :id="'RadekS_' + iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID"
              :ref="'RadekS_' + _max(iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID)" >
              <td :style="pof(Sirka*0.9,22)"   class="leva pl-2">{{ePrace(itemFull.idefix_prace)}}</td>

<!-- <td :style="pof(Sirka*0.75,12)"  class="pl-2 leva">{{itemFull.nazev}}</td> -->
              <td :style="pof(Sirka*0.9,15)"   class="pl-2 leva">{{itemFull.nazev_text}}</td>
              <td :style="pof(Sirka*0.9,15)"   class="stred">{{itemFull.rychlost}}</td>
              <td :style="pof(Sirka*0.9,15)"   class="stred">{{eJednotka(itemFull.idefix_jednotka)}}</td>
              <td :style="pof(Sirka*0.9,10)"   class="stred"><input size="mini" style="height:28px;width:28px" v-model="itemFull.mod_priorita" type="checkbox" @change="editPriorita(iFull)" name="Hotovost" value="1"  :checked="itemFull.mod_priorita==true"></td>
              <td :style="pof(Sirka*0.9,25)" > ZB: {{itemFull.nazev}}</td>
              </tr>

        </tbody>
        </table>

        <table slot="headl" :style="pof(Sirka*0.2,100)">
            <thead  >
              <tr>
              <th :style="pof(Sirka*0.2,100)">Nazev</th>

              </tr>
            </thead>
        </table>

        <table slot="bodyl" :style="pof(Sirka*0.2,100)">
        <tbody  >
           <draggable v-model="list.data.strojmod"  :options="{group: 'people' }" @start="drag=true" @end="chooseItemMod"  class="ma-0 pa-0">
              <tr v-for="(itemFull, iFull) in list.data.strojmod" :key="iFull" class="tdline nb tdlr"

              :id="'RadekL_' + iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID"
              :ref="'RadekL_' + _max(iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID)"
              >
              <td :style="pof(Sirka*0.1,100) + ';cursor:pointer'" class="prava pr-1">{{iFull + 1}}</td>

              <td :style="pof(Sirka*0.3,100) + ';cursor:pointer'"  class="pl-2 leva">{{itemFull.nazev}}</td>


              </tr>
           </draggable>
        </tbody>
        </table>

        <table slot="headr" :style="pof(Sirka*0.1,100)">
            <thead  >
              <tr >
                    <th class="tdline" :style="pof(Sirka*0.1,100)">
                    <button  type="button" style="width:22px;height:22px; font-color:black" class="pl-0 info elevation-3"
                      @click="setInsertMod"
                     ><i class="el-icon-plus" size="mini"></i>
                     </button>
              </th>

              </tr>
            </thead>
        </table>

        <table slot="bodyr" :style="pof(Sirka*0.10,100)">
        <tbody  >
              <tr v-for="(itemFull, iFull) in list.data.strojmod" :key="iFull" class="tdline nb tdlr"
               :id="'RadekR_' + iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID"
               :ref="'RadekR_' + _max(iFull+''+ itemFull.idefix + '' + itemFull.idefix_prace+ '' + '' + list.data.stroj.length +''+ID)"
               >
                <td :style="pof(Sirka*0.10,100)"  class="pl-0 stred">

                    <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="setEditMod(iFull)" ><i class="el-icon-edit" size="mini"></i></button>
                    <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="deleteMod(iFull)" ><i class="el-icon-delete" size="mini"></i></button>
                    <!-- <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="false" ><i class="el-icon-delete" size="mini"></i></button> -->
                     <!-- <button  type="button" style="width:100%;height:26px;z-index:1900000" class="px-0 " @click="deleteMod(iFull)" ><i class="el-icon-delete" size="mini"></i></button> -->
                  </td>
            </tr>

        </tbody>
        </table>

        </ta-ble3>
        {{(false)?list.data.strojmod : ''}}

        </div>



    </el-row>

<!-- <vue-draggable-resizable :style="pof(Sirka*0.9,100)+';position:absolute;top:40%;left:30%;height:90%;background:#fff;z-index:50;border:solid 2px silver'"   :parent="false" v-if> -->
   <!-- <win-dow-male :title="''" :id="`events`"

    :x="20"
    :w="Sirka*0.9"
    :y="100"
    :z="5000"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="false"
    :forgetWH="true"
    :forgetAll="true"
     v-if="addMod == true || editMod == true "

    > -->

<vue-draggable-resizable :handles="[]"    :isActive="true" :isResizable="true" :z="4999" :style="pof(Sirka*0.91,100)+';background:white;position;absolute;height:90%;'"   class="elevation-1" v-if="addMod == true || editMod == true "  >
<!-- <div :style="pof(Sirka*0.9,100)" class="elevation-5" v-if="addMod == true || editMod == true" > -->
<div :style="pof(Sirka*0.9,100)+';position:absolute;top:5px;left:5px;height:90%;background:#fff;z-index:5000;border:solid 2px silver'" class="elevation-5" v-if="addMod == true || editMod == true " >
<!-- <div :style="pof(Sirka*0.9,100)+';position:absolute;top:40%;left:30%;height:90%;background:#fff;z-index:50;border:solid 2px silver'" class="elevation-5" v-if="addMod == true || editMod == true " > -->
<el-row class="ml-3 mt-3 mb-0  " v-if="true" >
<el-col :span="14" class="elevation-2">
  <el-row>
    <el-col :span="23" class="elevation-3 pa-1 my-2 green--text"><b>Zakladni vlastnosti</b></el-col>
  </el-row>
  <!--1 Prace //-->
  <el-row>
    <el-col :span="6" ><el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:100%;" class=" elevation-5">Prace</el-button></el-col>
    <el-col :span="10">
        <el-select
                  v-model="strojmod.idefix_prace"
                  default-first-option
                  size="mini"
                  class="pt-0 pl-1"
                  filterable
                  style="width:90%"
            >
                <el-option
                v-for="item82 in list.data.enum_prace"
                :key="item82.idefix*1"
                :label="item82.nazev"
                :value="item82.idefix*1"
                >{{item82.nazev}} </el-option>
          </el-select>
      </el-col>
      <el-col :span="6" class="elevation-1 py-1" >Prioritni</el-col>

     <el-col :span="2">
       <el-checkbox v-model="strojmod.mod_priorita" class="mx-1 px-1 mt-1"
            size="mini">
       </el-checkbox>
     </el-col>
  </el-row>
<!--2 Nazev //-->
  <el-row class="my-2" >
    <el-col :span="6" class="elevation-1 py-1" >Nazev</el-col>
    <el-col :span="17">
         <el-autocomplete
        class="inline-input mr-1"
        v-model="strojmod.nazev"
        :fetch-suggestions="querySearch3"
        placeholder="Nazev tisk.modu"
        @select="handleSelect"
        size="mini"
        style="width:90%"
       ></el-autocomplete>
    </el-col>
  </el-row>

  <!--3 Rozliseni - nazev_text //-->
  <el-row class="my-2" >
    <el-col :span="6" class="elevation-1 py-1" >Rozliseni</el-col>
    <el-col :span="18">
      <el-autocomplete
      class="inline-input mr-1 "
      v-model="strojmod.nazev_text"
      :fetch-suggestions="querySearch4"
      placeholder="Rozliseni "
      @select="handleSelect"
      size="mini"
      style="width:90%"
     ></el-autocomplete>
    </el-col>
  </el-row>

  <!--4 Rychlost //-->
  <el-row class="my-2" >
    <el-col :span="6" class="elevation-1 py-1" >Rychlost</el-col>
    <el-col :span="6" class="pl-2">
        <el-input-number v-model="strojmod.rychlost" size="mini"  style="width:90%"></el-input-number>
    </el-col>

        <el-col :span="4" ><el-button size ="mini" @click="edit_vlastnosti('list2-jednotka','Jednotka')" style="width:100%;" class=" elevation-5">Jednotka</el-button></el-col>
        <el-col :span="7" class="pr-2 pl-0">
       <el-select v-model="strojmod.idefix_jednotka"
        default-first-option
        size="mini"  class="pt-0 pl-1 mx-1"
        filterable
        style="width:90%"
        >
            <el-option
            v-for="item83 in list.data.enum_jednotka"
            :key="item83.idefix*1"
            :label="item83.nazev"
            :value="item83.idefix*1"
            >{{item83.nazev}} </el-option>
       </el-select>
      </el-col>

  </el-row>

</el-col>

<el-col :span="9" class="elevation-1 ml-1">


  <el-row class="elevation-0 pa-1 my-1 green--text">
    <el-col :span="14" class="py-0 elevation-1" >Inkoust</el-col>
    <el-col :span="10" class="py-0 elevation-1">Spotreba</el-col>
  </el-row>
  <el-row >
      <el-col :span="2" class="elevation-1 py-1">1</el-col>
      <el-col :span="12" class="elevation-1">
        <el-select v-model="strojmod.idefix_i1"
          size="mini"
          class="pt-0 pl-1 mx-1"
          style="width:90%"
          >
        <el-option
            v-for="item90 in list.data.enum_inkoust"
            :key="item90.idefix*1"
            :label="item90.nazev"
            :value="item90.idefix*1"
            >{{item90.nazev}} </el-option>
       </el-select>

      </el-col>
      <el-col :span="10" class="elevation-1">
        <el-input-number v-model="strojmod.i1spotreba" size="mini"  style="width:90%"></el-input-number>
      </el-col>
  </el-row>
<!--2--//-->
  <el-row >
      <el-col :span="2" class="elevation-1 py-1">2</el-col>
      <el-col :span="12" class="elevation-1">
        <el-select v-model="strojmod.idefix_i2"
          size="mini"
          class="pt-0 pl-1 mx-1"
          style="width:90%"
          >
        <el-option
            v-for="item91 in list.data.enum_inkoust"
            :key="item91.idefix*1"
            :label="item91.nazev"
            :value="item91.idefix*1"
            >{{item91.nazev}} </el-option>
       </el-select>

      </el-col>
      <el-col :span="10" class="elevation-1">
        <el-input-number v-model="strojmod.i2spotreba" size="mini"  style="width:90%"></el-input-number>
      </el-col>
  </el-row>
<!--2 EOF //-->
<!--3--//-->
  <el-row >
      <el-col :span="2" class="elevation-1 py-1">3</el-col>
      <el-col :span="12" class="elevation-1">
        <el-select v-model="strojmod.idefix_i3"
          size="mini"
          class="pt-0 pl-1 mx-1"
          style="width:90%"
          >
        <el-option
            v-for="item92 in list.data.enum_inkoust"
            :key="item92.idefix*1"
            :label="item92.nazev"
            :value="item92.idefix*1"
            >{{item92.nazev}} </el-option>
       </el-select>

      </el-col>
      <el-col :span="10" class="elevation-1">
        <el-input-number v-model="strojmod.i3spotreba" size="mini"  style="width:90%"></el-input-number>
      </el-col>
  </el-row>
<!--3 EOF //-->
<!--4--//-->
  <el-row >
      <el-col :span="2" class="elevation-1 py-1">4</el-col>
      <el-col :span="12" class="elevation-1">
        <el-select v-model="strojmod.idefix_i4"
          size="mini"
          class="pt-0 pl-1 mx-1"
          style="width:90%"
          >
        <el-option
            v-for="item93 in list.data.enum_inkoust"
            :key="item93.idefix*1"
            :label="item93.nazev"
            :value="item93.idefix*1"
            >{{item93.nazev}} </el-option>
       </el-select>

      </el-col>
      <el-col :span="10" class="elevation-1">
        <el-input-number v-model="strojmod.i4spotreba" size="mini"  style="width:90%"></el-input-number>
      </el-col>
  </el-row>
<!--4 EOF //-->

<!--5--//-->
  <el-row >
      <el-col :span="2" class="elevation-1 py-1">5</el-col>
      <el-col :span="12" class="elevation-1">
        <el-select v-model="strojmod.idefix_i5"
          size="mini"
          class="pt-0 pl-1 mx-1"
          style="width:90%"
          >
        <el-option
            v-for="item94 in list.data.enum_inkoust"
            :key="item94.idefix*1"
            :label="item94.nazev"
            :value="item94.idefix*1"
            >{{item94.nazev}} </el-option>
       </el-select>

      </el-col>
      <el-col :span="10" class="elevation-1">
        <el-input-number v-model="strojmod.i5spotreba" size="mini"  style="width:90%"></el-input-number>
      </el-col>
  </el-row>
<!--5 EOF //-->




</el-col>

  </el-row>


<!-- Radek s inkousty !-->


    <el-row >
      <el-col :span="24">
        <v-btn v-if="addMod==true" @click="insertMod" small> Vlozit </v-btn>
        <v-btn v-if="editMod==true" @click="saveMod(strojmod)"  small> Zmena </v-btn>
        <v-btn @click="closeMod" small> Zavrit </v-btn>
      </el-col>
    </el-row>

</div>
</vue-draggable-resizable>
   <!-- </win-dow-male> -->


<!-- <draggable v-model="list.data.strojmod"  :options="{group: 'people' }" @start="drag=true" @end="drag=false" :move="chooseItemMod"> -->
   <el-col :span="24">






</el-col>

    </el-col>
    </el-row>

    </v-card-text></v-card>

      </v-window-item>

        <v-window-item :value="3">

         <v-card v-show="step2=='3'"><v-card-text>
          <el-row class="ma-2 ">
          <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >
             <el-row class="ma-2">

              <el-col :span="5">Priprava stroje - minuty</el-col>
              <el-col :span="3">

              <el-input-number v-model="list.data.stroj[0].priprava_cas_minuta" size="mini"  style="width:100%"></el-input-number>
              </el-col>
              <el-col :span="4">Naklad</el-col>
              <el-col :span="3">
              <el-input-number v-model="list.data.stroj[0].priprava_celkem_naklad" size="mini"  style="width:100%"></el-input-number>
              </el-col>
              <el-col :span="4">Prodej</el-col>
              <el-col :span="3">
              <el-input-number v-model="list.data.stroj[0].priprava_celkem_prodej" size="mini"  style="width:100%"></el-input-number>
              </el-col>

      </el-row>

            <el-row class="mx-0 ml-0 mt-3 mb-1 blue-grey lighten-4">
              <el-col :span="2">Poradi</el-col>
              <el-col :span="5">Popis</el-col>
              <!-- <el-col :span="3">Stroj Mod</el-col> -->
              <el-col :span="3" class="ml-1"><el-button size ="mini" @click="edit_vlastnosti('list2-jednotka','Jednotka')" style="width:90%">Jednotka</el-button></el-col>
              <el-col :span="2">Start</el-col>
              <el-col :span="2">Stop</el-col>
              <el-col :span="2">Naklad/h</el-col>
              <el-col :span="2">Prodej/h</el-col>
              <el-col :span="1">&nbsp;</el-col>




              <!-- <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:90%">Prace</el-button> </el-col> -->
            </el-row>

      <el-row class="pt-1 pb-1 mb-2 blue-grey lighten-5">
      <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="strojceny.kod"  class="mb-0 px-0 cell cisla" style="width:100%;">
       </el-col>
       <el-col :span="5">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="strojceny.nazev"
      :fetch-suggestions="querySearch5"
        placeholder="Popis polozky"
      @select="handleSelect"
      size="mini"
      style="width:90%"

    ></el-autocomplete>
       </el-col>
     <!-- <el-col :span="3">

        <el-select v-model="strojceny.idefix_strojmod"  size="mini" class="pt-1 pl-1 ml-2"  style="width:100%"  >
          <el-option
            v-for="item290 in list.data.enum_strojmod_this"
            :key="item290.idefix*1"
            :label="item290.value"
            :value="item290.idefix*1"
            >{{item290.value}} </el-option>
       </el-select>
      </el-col> -->
      <el-col :span="3" class="mx-1">
        <el-select v-model="strojceny.idefix_jednotka"  size="mini" class="pt-1 pl-1 ml-2"  style="width:90%"
        filterable
        >
          <el-option
            v-for="item291 in list.data.enum_jednotka"
            :key="item291.idefix*1"
            :label="item291.nazev"
            :value="item291.idefix*1"
            >{{item291.nazev}} </el-option>
       </el-select>
      </el-col>
      <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="strojceny.pocet_start"  class="mb-0 px-0 cell cisla" style="width:90%;position:relative;top:0px">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="strojceny.pocet_stop"   class="mb-0 px-0 cell cisla" style="width:90%;">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="strojceny.cena_naklad"  class="mb-0 px-0 cell cisla" style="width:90%;">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="strojceny.cena_prodej"   class="mb-0 px-0 cell cisla" style="width:90%;">
       </el-col>

     <el-col style="border:solid 0px" :span="1" >
     <button  type="button" style="width:100%;height:26px" class="pl-4" @click="insertCeny" ><i class="el-icon-plus" size="mini"></i></button>
     </el-col>
     </el-row>

  <draggable v-model="list.data.strojceny"  :options="{group: 'peoplex' }" @start="drag=true" @end="chooseItemCeny" >
      <el-row  v-for="(itemceny, iceny) in list.data.strojceny" :key="itemceny.idefix" class="ma-0 mt-0 "
              v-bind:class="{ 'white' : ( iceny % 1 == 0) , 'blue lighten-5' : ( iceny % 2 != 0)  }"
      >
   <el-col style="border:solid 0px;height:30px" :span="2" class="pt-0 nb" >
         <input type="number" v-model="list.data.strojceny[iceny].kod"  class="mt-2 mb-0 px-0 cell cisla" style="width:100%;">
   </el-col>
   <el-col :span="5">
   <el-autocomplete
      class="inline-input mr-1 mt-2 "
      v-model="list.data.strojceny[iceny].nazev"
      :fetch-suggestions="querySearch5"
      placeholder="Popis polozky"
      @select="handleSelect"
      size="mini"
      style="width:90%"

    ></el-autocomplete>
       </el-col>

     <!-- <el-col :span="3">
        <el-select v-model="list.data.strojceny[iceny].idefix_strojmod"  size="mini" class="pt-1 pl-1 ml-2"  style="width:100%"  >
          <el-option
            v-for="item290 in list.data.enum_strojmod_this"
            :key="item290.idefix*1"
            :label="item290.value"
            :value="item290.idefix*1"
            >{{item290.nazev}} </el-option>
       </el-select>
      </el-col> -->
      <el-col :span="3" class="mx-1">
        <el-select v-model="list.data.strojceny[iceny].idefix_jednotka"  size="mini" class="pt-0 pl-1 ml-2 mt-2 "  style="width:90%"
        filterable
         >
          <el-option
            v-for="item291 in list.data.enum_jednotka"
            :key="item291.idefix*1"
            :label="item291.nazev"
            :value="item291.idefix*1"
            >{{item291.nazev}} </el-option>
       </el-select>
      </el-col>
      <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="list.data.strojceny[iceny].pocet_start"  class="mb-0 px-0 cell cisla mt-2 " style="width:90%;">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="list.data.strojceny[iceny].pocet_stop"   class="mb-0 px-0 cell cisla mt-2 " style="width:90%;">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="list.data.strojceny[iceny].cena_naklad"  class="mb-0 px-0 cell cisla mt-2 " style="width:90%;">
       </el-col>
       <el-col style="border:solid 0px;height:30px" :span="2" >
         <input type="number" v-model="list.data.strojceny[iceny].cena_prodej"   class="mb-0 px-0 cell cisla mt-2 " style="width:90%;">
       </el-col>


     <el-col style="border:solid 0px" :span="1" >

       <button  type="button" style="width:100%;height:22px;z-index:10000;position:relative;top:8px" class="px-0 " @click="deleteCeny(iceny)" ><i class="el-icon-delete" size="mini"></i></button>

       &nbsp;
     <!-- <button  type="button" style="width:100%;height:26px" class="pl-4" @click="insertCeny" ><i class="el-icon-plus" size="mini"></i></button> -->
     </el-col>



      </el-row>
      </draggable>
                <div class="pa-3 mt-4 text-xs-center" style="width:100%">

            <!-- <pre>
            tisk 1 hodina kč - náklad
            tisk čas prvních 20 min - Kč/hod prodej
            tisk čas druhých 20 min - Kč/hod prodej
            tisk čas třetích 20 min - Kč/hod prodej
            tisk druhá a další hodina - Kč/hod prodej

            průjezd strojem CMYK arch náklad Kč/arch
            průjezd strojem CMYK arch naklad / prodej - prvních 25 archů
            průjezd strojem CMYK arch naklad / prodej - 26-50 archů
            průjezd strojem CMYK arch naklad / prodej - 51-100 archů
            průjezd strojem CMYK arch naklad / prodej - 101-250 archů
            průjezd strojem CMYK arch naklad / prodej - 251-500 archů
            průjezd strojem CMYK arch naklad / prodej - více než 500 archů

            průjezd strojem Black arch náklad Kč/arch
            průjezd strojem Black arch naklad / prodej - prvních 25 archů
            průjezd strojem Black arch naklad / prodej - 26-50 archů
            průjezd strojem Black arch naklad / prodej - 51-100 archů
            průjezd strojem Black arch naklad / prodej - 101-250 archů
            průjezd strojem Black arch naklad / prodej - 251-500 archů
            průjezd strojem Black arch naklad / prodej - více než 500 archů
            </pre> -->

          </div>



       <div style="opacity:1; background:yellow;width:100%; " class="yellow" >

     </div>
      </el-col>
          </el-row>
</v-card-text></v-card>
        </v-window-item>

        </form>
      </v-window>

      <!-- <v-divider></v-divider> -->

      <!-- <v-card-actions>
        <v-btn
          :disabled="step === 1"
          flat
          color="primary"
          @click="step--"
        >
          Zpet
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 8"
          color="primary"
          depressed
          @click="submitForm('formstep')"
        >
          Uloz a Dalsi
        </v-btn>

      </v-card-actions> -->
    </v-card>



</div>
<list2b-edit></list2b-edit>
 </win-dow>


</template>
<script>

import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListStroj from '../services/ListStrojService'
import List2bEdit from  './List2bEdit.vue'

import f from '@/services/fce'
import moment from 'moment'




//import List2StrojSubSkup from '@/services/List2StrojSubSkupService'
// import List2StrojSkup from '@/services/List2StrojSkupService'

import { setTimeout, clearInterval, setInterval } from 'timers'

export default {
  components: {
    'list2b-edit': List2bEdit,

  },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {



      search: '',
      barevnostNazev: [],
      addMod: false,
      editMod: false,
      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 50,
      rec: {},
      length: 4,
      window: 0,
      step: 2,
      step2: "2",
      Akce: '',
      //stepInfo: 'Resim co jako',
      idefixThis: 0,
      typKalkulace: 'N',
      list:[],
      list_backup: [],
      list0:{},
      labelPosition: 'right',
      strojNazev: '',

    strojmodDefault: {
        idefix: 0,
        idefix_stroj: 0,
        kod: 0,
        idefix_prace: 0,
        nazev: '',
        nazev_text: '',
        rychlost: 0,
        idefix_jednotka: 0,

        idefix_i1: 0 ,
        i1spotreba: 0 ,
        idefix_i2: 0 ,
        i2spotreba: 0 ,
        idefix_i3: 0 ,
        i3spotreba: 0 ,
        idefix_i4: 0 ,
        i4spotreba: 0 ,
        idefix_i5: 0 ,
        i5spotreba: 0 ,
        mod_priorita: false,

        strojmodbarevnost: [],
        rychlost_minuta_m2: 0,
        rychlost_minuta_pocet: 0,


      },
      strojmod: {
        idefix: 0,
        idefix_stroj: 0,
        kod: 0,
        idefix_prace: 0,
        nazev: '',
        nazev_text: '',
        rychlost: 0,
        idefix_jednotka: 0,

        idefix_i1: 0 ,
        i1spotreba: 0 ,
        idefix_i2: 0 ,
        i2spotreba: 0 ,
        idefix_i3: 0 ,
        i3spotreba: 0 ,
        idefix_i4: 0 ,
        i4spotreba: 0 ,
        idefix_i5: 0 ,
        i5spotreba: 0 ,
        mod_priorita: false,

        strojmodbarevnost: [],
        rychlost_minuta_m2: 0,
        rychlost_minuta_pocet: 0,


      },
      strojceny: {
        idefix: 0,

        idefix_stroj: 0,
        idefix_strojmod: 0,
        idefix_inkoust: 0,
        idefix_jednotka: 0,
        nazev: '',
        kod: 0,
        pocet_start: 0,
        pocet_stop: 0,
        cena_naklad: 0,
        cena_prodej: 0,





      },

      strojinkoust: {
        idefix: 0,
        idefix_stroj: 0,
        nazev: '',
        nazev_text: '',
        cena_naklad_m2: 0,
        cena_prodej_m2: 0,
        strojinkoustbarevnost: []
      },

      //
      //

      // links: [],
      form3: {

      },
      lastTime: 0, //posledni cas prichozi udalosti v int
      Sirka: 0,
      SirkaLeva : 0.1,
      SirkaStred : 1,
      SirkaPrava : 0.05,
      LastColHeight: '',
      CitacHeight: 0,
      ID: 0,
      TestovaciCislo: 0 ,


// --  10   enum_strojskup
// --  11   enum_barevnost
// -- 101   enum_nazev_text
// -- 102   enum_nazev

// enum_strojceny_nazev
// -- 103   enum_strojmod
// -- 104   enum_strojmod_text
// -- 109   enum_strojmod_this
// -- 105   enum_strojinkoust
// -- 106   enum_prace
// -- 107   enum_jednotka
// -- 106   enum_inkoust

// -- 200   dotaz_list_strojmod
// -- 201   dotaz_list_strojmodbarevnost
// -- 202   dotaz_list_strojinkoust
// -- 203   dotaz_list_strojinkoustbarevnost
// -- 204   dotaz_list_strojceny


    }
  },

  mounted() {
    const self = this
    self.ID = Math.round(Math.random() * 1983458)

    // this.analyze()
  },


  created () {


    var self=this
    var interv =setInterval(function() {
       self.sirka("seznam")
       //alert(self.Sirka)
    },500)
    eventBus.$off('edit_stroj')
    eventBus.$on('edit_stroj', ( dlgPar ) => {
      self.citac++
      self.getDataEnum()



    })


      eventBus.$off('dlg8210')
      eventBus.$on('dlg8210', ( dlgPar ) => {
            self.rec = dlgPar
             // alert(JSON.stringify(dlgPar))
             try {
             // self.xMyska = event.screenX - 200
             } catch(e) {
               //alert('Mysku nelze')
             }


            //alert(event.pageX)

            //console.log(event)
        if (dlgPar.IsDialog==true) {
          //if (!self.IsDialog1){
            self.IsDialog1 = true
            // self.IsDialog1 = !self.IsDialog1
            if (self.IsDialog1 && dlgPar.Idefix > 0) {
              self.step=2
              try {
                self.getData(dlgPar)
              setTimeout(() => {
                var newObj = f.cp(self.list)
                self.list_backup = newObj
               //console.log( JSON.stringify(self.list_backup).substr(0,20000) == JSON.stringify(self.list).substr(0,20000), JSON.stringify(self.list).substr(0,20000))

              }, 1000);
              } catch(e) {

              }



            }


        }
        //alert(JSON.stringify(dlgPar))
        //self.getData()
                //self.getWhere()

      })

  },

  watch: {
    nazev: function() {
      this.IsDialog1 = true;
      this.RecName='X'
      //alert('x')
    },
    step: function(){
      this.step2 = this.step+''
      if (this.step>3) {
        this.step=2
      }
      if (this.step<1) {
        this.step=2
      }
    },
    strojmod: function () {
       this.sirka("seznam")

    }

  } ,

  methods: {


    _max(iporadi) {
      const self = this
      var neco1 = document.getElementById('RadekS_'+iporadi+'')
      var neco2 = document.getElementById('RadekL_'+iporadi+'')
      var neco3 = document.getElementById('RadekR_'+iporadi+'')
      var newH = ''
      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }



    setTimeout(function(){


      try {
        if (neco1 ) {
        newH = ''+Math.max(neco1.offsetHeight,neco2.offsetHeight,neco3.offsetHeight)+'px'

        neco1.style.height = newH
        neco2.style.height = newH
        neco3.style.height = newH
        }

        //neco2.style.height='12px'
        //neco3.style.height='12px'
      } catch (e) {
        console.log('Chybka','Poradi', iporadi,e)
        setTimeout(function() {
          self._max(iporadi)
        },500)
        //neco1.style.height='12px'
        //neco2.style.height='12px'
        //neco3.style.height='12px'

      }

      //console.log(self.$refs.d2r.offsetHeight)

      if (iporadi > 0 ) {
        //console.log('RadekS_' + iporadi ,r1.offsetHeight , JSON.stringify(r1 ))


      }
      },100)

      //Math.max()
      return 47

    },
    pof(max, proc) {
      var neco = Math.round(max* proc/100) +''
      neco = `width:${neco}px`
      return neco

      //alert(neco)
    },
    _rand(iporadi) {
      var neco = iporadi + '_' +( Math.round(Math.random() *Math.random() * 100000000)) + ''
      return neco
      //console.log(neco)
    },
    sirka(ref) {
      const self= this
      var nret = 0
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          self.Sirka = nret
          //alert(nret)
        } catch(e) {
          return 11
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 100)

      return nret
    },

    //Enums
    ePrace(idefix) {
      var ifx = _.findIndex(this.list.data.enum_prace, function(o) { return o.idefix == idefix; });
      return this.list.data.enum_prace[ifx].nazev
    },
    eJednotka(idefix) {

      var ifx = _.findIndex(this.list.data.enum_jednotka, function(o) { return o.idefix == idefix; });
      if (ifx > -1) {
        return this.list.data.enum_jednotka[ifx].nazev
      } else {
        return ''
      }

    },


    handleClick(tab,x) {
      this.step =   (tab.name * 1)
      //alert(tab.name)

    },
    changeBezOkraj(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.stroj[0].bez_okraj = 1

      } else {
        self.list.data.stroj[0].bez_okraj = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },
    editPriorita( a) {
      if (this.list.data.strojmod[a].mod_priorita == true ) {
        this.list.data.strojmod.forEach((el,idx) => {
          if (idx !== a)  {
            if (el.mod_priorita == true ) {
              el.mod_priorita = false
            }
          }
        })
      }
      console.log( a, this.list.data.strojmod[a].mod_priorita)
    },
    chooseItemMod: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.strojmod.forEach((el,i) =>{
            this.list.data.strojmod[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },
    chooseItemCeny: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.strojceny.forEach((el,i) =>{
            this.list.data.strojceny[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },

    async getDataEnum(){
      const self = this
            //alert('PRED' + JSON.stringify(self.list.data.enum_strojskup))
            //ServerKlice = 7 vlastnosti
            var tmp
            var tmp2

            if (self.$store.state.showModule == 'list2-strojskup') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 10,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,10,''))
                  self.list.data.enum_strojskup = tmp2.data.enum_strojskup
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }

            if (self.$store.state.showModule == 'list2-prace') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 106,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,106,''))
                  self.list.data.enum_prace = tmp2.data.enum_prace
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)

                }
              } catch(e) {
               alert("X 2" + e)
              }
            }
          if (self.$store.state.showModule == 'list2-jednotka') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 107,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,107,''))
                  self.list.data.enum_jednotka = tmp2.data.enum_jednotka
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }
           if (self.$store.state.showModule == 'list2-strojmodthis') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 109,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,109,''))
                  self.list.data.enum_strojmod_this = tmp2.data.enum_jednotka
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }
    },

    async getData(dlgPar) {
          const self = this
          var nT = new Date()
          var curTime= (nT.getMinutes()*60000)+(nT.getSeconds()*1000) + nT.getMilliseconds()
          if (curTime - self.lastTime <100 ) {
            console.log('1 Opacko : ' , curTime )
            // return
          }
        //   console.log('2 Pracuji : ' , curTime , ": " , self.lastTime ," rozdil :", (curTime - self.lastTime))
           self.lastTime = curTime

           // return
          // alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          // alert(dlgPar.Idefix)
           self.list = []



          if (dlgPar.Idefix > 0 ){
            if (dlgPar.Akce=='copy'){
              self.isCopy=true

              //alert(1)
              try {

              self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'copy'))
              //self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'copy'))
              // alert('1')
              console.log('copy 1 : ' + self.idefixThis)
              //self.idefixThis = self.list.data.mat[0].idefix
              self.idefixThis = self.list.data.newId
              console.log('copy 2 : ' + self.idefixThis)
              self.list=[]
              self.list = (await ListStroj.one(this.user,self.idefixThis, -1,'edit'))
              self.rec.Idefix = self.idefixThis
              self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']
              self.barevnostNazev = []
              self.list.data.enum_barevnost.forEach(el => {
              self.barevnostNazev.push(el.nazev)
              })


              } catch (e2) {
                alert('error')
              }
              //alert(self.list.data.newId)
              //alert(self.idefixThis)

            }
            if (dlgPar.Akce=='edit'){
              self.isCopy=false

              try {
                //alert("2 " + self.idefixThis )
                self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'edit'))
                self.idefixThis = self.list.data.stroj[0].idefix
                self.strojNazev = self.list.data.stroj[0].nazev
                self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']

                self.barevnostNazev = []
                self.list.data.enum_barevnost.forEach(el =>{
                  self.barevnostNazev.push(el.nazev)
                })
                self.list.data.strojmod.forEach((el,i)=> {
                  el.idefix_prace*=1
                  el.idefix_jednotka*=1
                  el.idefix_i1*=1
                  el.idefix_i2*=1
                  el.idefix_i3*=1
                  el.idefix_i4*=1
                  el.idefix_i5*=1

                })

                 self.list.data.strojceny.forEach((el,i)=> {
                  el.idefix_strojmod *=1
                  el.idefix_jednotka *=1
                  el.idefix_inkoust  *=1
                })




              } catch (e) {
        //      console.log('chybka ' ,  JSON.stringify(self.list.data.stroj[0].idefix ))
        //      alert( self.list.data.stroj[0].idefix )
                self.idefixThis = self.list.data.stroj[0].idefix
                self.strojNazev = self.list.data.stroj[0].nazev
                self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']

               self.barevnostNazev = []
                self.list.data.enum_barevnost.forEach(el =>{
                  self.barevnostNazev.push(el.nazev)
                })

                self.list.data.strojmod.forEach((el,i)=> {
                  el.idefix_prace*=1
                  el.idefix_jednotka*=1
                  el.idefix_i1*=1
                  el.idefix_i2*=1
                  el.idefix_i3*=1
                  el.idefix_i4*=1
                  el.idefix_i5*=1

                })


              }
            }
            }

          },
    closeMod() {
      const self = this
      self.editMod = false
      self.addMod  = false
      var newObj = f.cp(self.strojmodDefault)
      self.strojmod = newObj
    } ,
    setInsertMod() {

      const self = this

      var prace = self.strojmod.idefix_prace
      var jednotka = self.strojmod.idefix_jednotka

      var newObj = f.cp(self.strojmodDefault)
      self.strojmod = newObj
      self.strojmod.idefix_jednotka = jednotka
      self.strojmod.idefix_prace = prace
      self.editMod = false
      self.addMod  = true

      //self.strojmod.nazev = 'hovno prdel sracka'
    } ,
    setEditMod(i) {
      const self = this
      self.editMod = true
      self.addMod  = false
      var newObj = f.cp(self.list.data.strojmod[i])
      self.strojmod = newObj
      //self.strojmod.nazev = 'hovno prdel sracka'



    } ,
    saveMod(aItem) {
      const self = this
      var ifx = _.findIndex(this.list.data.strojmod, function(o) { return o.idefix == aItem.idefix; });

      if (ifx > -1 ){

        self.list.data.strojmod[ifx] = self.strojmod
        var newObj = f.cp(this.strojmod)
        this.strojmod = newObj

       if (this.list.data.strojmod[ifx].mod_priorita == true ) {
        this.list.data.strojmod.forEach((el,idx) => {
          if (idx !== ifx)  {
            if (el.mod_priorita == true ) {
              el.mod_priorita = false
            }
          }
        })
      }

      }
      //var newObj = f.cp(self.strojmodDefault)
      console.log(aItem.idefix + '::' + ifx )


    },

    insertMod() {
       const self = this
        var lAdd = true

        self.editMod = false
        alert('i')
         alert( self.strojmod.mod_priorita )
      if (self.strojmod.mod_priorita === true ) {
        self.list.data.strojmod.forEach((el,idx) => {
            if (el.mod_priorita == true ) {
               el.mod_priorita = false
            }
        })
      }


      if (this.strojmod.nazev > ''){
        this.strojmod.idefix_stroj =this.idefixThis
        this.list.data.strojmod.forEach((el,i) =>{
          if (el.nazev == this.strojmod.nazev) {
            lAdd = false
            alert('Nelze pridat modstejneho nazvu ke stejnu stroji')
          }
        } );
        if (lAdd == true) {
          let neco= this.strojmod

  //        alert(this.list.data.strojmod.length)
          this.strojmod.idefix = (this.list.data.strojmod.length +10)*-1
          this.strojmod.kod = (this.list.data.strojmod.length +1)
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.strojmod.push(neco)
          var newObj = f.cp(this.strojmod)
          this.strojmod = newObj
          this.strojmod.mod_priorita = false

          console.log(newObj)
          this.list.data.strojmod.forEach((el, idx) => {
            el.kod=idx +1
          })

        }

      }

    },
    insertCeny() {
        var lAdd = true

      // alert('vkladam')
      if (this.strojceny.nazev > ''){
        this.strojceny.idefix_stroj =this.idefixThis
        this.list.data.strojceny.forEach((el,i) =>{
          if (el.nazev == this.strojceny.nazev) {
        //    lAdd = false
           // alert('Nelze pridat stejnou polozku nazvu ke stejnu stroji')
          }
        } );
        if (lAdd == true) {
          let neco= this.strojceny

  //        alert(this.list.data.strojmod.length)
          this.strojceny.idefix = (this.list.data.strojceny.length +10)*-1

          if (this.strojceny.kod <=0){

              this.strojceny.kod = this.list.data.strojceny.length +1
          }

          this.list.data.strojceny.push(neco)

          var newObj = f.cp(this.strojceny)
          this.strojceny = newObj
          this.strojceny.kod = 0



        }

      }

    },
    deleteMod(idx) {
      //alert(JSON.stringify(this.list.data.strojmod[idx]['idefix']))
      try {


      if (this.list.data.strojmod[idx]['idefix'] > 0 ){
        if (confirm("Smazat tento mod ?")){
            this.list.data.strojmod.splice(idx,1)
        }
      } else {
            this.list.data.strojmod.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba',e )
      }

    },
    deleteCeny(idx) {
      try {
      if (this.list.data.strojceny[idx].idefix > 0 ){
        if (confirm("Smazat polozku ?")){
            this.list.data.strojceny.splice(idx,1)
        }
      } else {
            this.list.data.strojceny.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba Ceny',e )
      }


    },

    mySplit(ctxt){
      var neco=(ctxt+'')
      //alert(neco.split(",")[0] )
      return neco.split(",")
    },

    cancelForm() {
       this.IsDialog1 = false
       this.list = []
    },

    async submitForm(formName, znovu = 1) {
      const self = this
      if (formName == 'formnew'){
        // alert(formName+ ' /' + self.idefixThis)
        eventBus.$emit('dlg8210', {
           'IsDialog': true,
           'Akce' : 'copy' ,
           'Idefix' :  self.idefixThis,

      })
        // return
      } else {

      this.list.data.strojmod.forEach((el,i) =>{
            this.list.data.strojmod[i].kod = i+1
      })
      // alert(JSON.stringify(self.list.data.strojceny) + " / "+ self.idefixThis )
      var neco=  (await ListStroj.saveone(self.user,self.idefixThis,{
        data: self.list.data.stroj[0],
        strojmod: self.list.data.strojmod,
        strojceny: self.list.data.strojceny,

          }))
          if (znovu == 0) {
            return
          }
      //    return
        if (formName=='formstep'){
          self.step++
          console.log("REC", self.rec)
          this.list = []
          self.rec.Akce ='edit'
          self.getData(self.rec)
          return
        }

        if (formName=='formstep0'){
          self.step = self.step
          console.log("REC", self.rec)
          this.list = []
          self.rec.Akce ='edit'
          self.getData(self.rec)
          return
        }

        //return
        //alert()
        this.list = []

        eventBus.$emit('dlg8210rec')
        eventBus.$emit('dlg8210', {
         'IsDialog': true,
         'Akce' : 'edit' ,
         'Idefix' :  self.idefixThis
        })

        return


      }
      //this.IsDialog = false

      this.list = []
      eventBus.$emit('dlg8210rec')
    },

    cancelForm() {
     if (confirm("Zahodi zmeny ?")) {
       this.IsDialog = false
       this.list = []
     }

    },

    async resetForm(formName) {
        const self= this
        if (self.isCopy == true) {

          //
          //alert(self.idefixThis,)
          //return
          if (confirm('Zavrit bez ulozeni ?')) {
            this.list = []
            var prd= (await ListStroj.delete(self.user,self.idefixThis))
            this.IsDialog = false
            eventBus.$emit('dlg821rec')
          } else {
            //alert('nedelam')
            return
          }


        } else {
          self.addMod = false
          self.editMod =false
          //alert(JSON.stringify(self.list_backup.data.strojmod))

           if (confirm('Ulozit data ?')) {
            self.submitForm(formName, 0)
            eventBus.$emit('dlg8210rec')
          }

          self.list = []




        }
        // var x
        // for (x in this.formBackup ) {
        //   this.recData[x] = this.formBackup[x]
        // }


    },


    querySearch1(queryString, cb) {  //Nazev
        var n1 = this.list.data.enum_nazev
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

    querySearch2(queryString, cb) {  //Nazev 2
        var n1 = this.list.data.enum_nazev_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

      querySearch3(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

      querySearch4(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch5(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojceny_nazev
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch6(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch7(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch8(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

 createFilter(queryString) {
        return (link) => {
          if (link.value == null ) {
            return ''
          }
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item)
      },
      datum(value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
      ,edit_vlastnosti(cmodul,ctitle){

      const self  = this
      if ( !this.$store.state.showEdit==true ){

        this.$store.dispatch('setshowEdit', true)
        this.$store.dispatch('setshowModule', cmodul)
        this.$store.dispatch('setshowIdefix', self.idefixThis)
        this.$store.dispatch('setshowModuleTitle', ctitle)
        eventBus.$emit('edit_run_stroj')
      } else {
        // alert("Zahadne Zmiznu")
        this.$store.dispatch('setshowEdit', false)
      }
    },

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


    stepInfo () {
      switch (this.step) {
        //case 1: return `Zakladni udaje a rozmery, polozky : ${this.list.data.stroj[0]['typ_kalkulace']}`
        case 1: return `Zakladni udaje a rozmery, polozky : ${this.typKalkulace}`


        case 2: return 'Priprava, mody'
        //case 3: return 'Inkousty a barevnosti'
        //case 4: return 'Rychlosti, prujezdy'
        case 3: return 'Ceny'
        //case 6: return 'Hotovo'

        default: return 'Hotovo'
      }

    }

/*
    datum(){
      return Vue.filter('date')(this.value)
    }
*/

  }
}

</script>
<style scoped>
  tr td {
    height: 32px;
    font-size:12px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-top: 0px;

  }
</style>
<style>

.ok {
  background: #C5E1A5;
  color:black;

}
.bad {
  background: #FFAB40;
  color:black;
}

select  {
  opacity: 1;
  font-size: 14px;
  width:100%;
  height:100%;
  border: solid 1px;
  border-color:#AAAAAA;
  position: relative;
  top:2px;
}

.cisla  {
  opacity: 1;
  font-size: 15px;

  height:90%;
  border: solid 1px;
  border-color:#AAAAAA;
  position: relative;
  top:0px;
}

select:focus  {
  opacity: 1;
  font-size: 14px;
  border: solid 0px black;
  /* box-shadow: 0 0 0pt 0pt #719ECE; */
  box-shadow: 0 0 0pt 0pt #000000;

}
ul {
  z-index: 1305000 !important;
}
li {
  z-index: 1305000 !important;
}

.el-select-dropdown {
  z-index: 1305000 !important;
}
.el-popper {
  z-index: 1305000 !important;
}

el-autocomplete-suggestion el-popper el-select-dropdown__item{
  z-index: 1305000 !important;
}

div[role="region"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
    }
 input[type="text"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
   }





</style>
