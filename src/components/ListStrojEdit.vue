<template>
 <win-dow :title="'events'" :id="`events`"

    :x="xMyska"
    :w="1024"
    :y="100"
    :z="0"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="true"
    :forgetWH="true"
    :forgetAll="true"
    v-if="IsDialog1 && list && list.data && list.data.stroj && list.data.stroj[0]"

    >
<!-- <span slot="a1">A1</span>
<span slot="a2">A2</span>
<span slot="a3">A3</span> -->


<div slot="b1" class="green lighten-4 elevation-2" style="height:40px;font-size:18px">{{ stepInfo}}</div>
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
        <!-- <el-tab-pane label=" Inkousty "  name="3"></el-tab-pane> -->

        <!-- <el-tab-pane label=" Prace, ceny "  name="5"></el-tab-pane> -->
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
      <el-row class="ma-2">
     <!-- <el-col :span="6">Priprava minuta - Naklad</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_minuta_naklad" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">Priprava minuta - Prodej</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_minuta_prodej" size="mini"  style="width:100%"></el-input-number>
     </el-col> -->

     </el-row>
      <el-row class="ma-2">


     <!-- <el-col :span="6">Priprava Celkem - Naklad</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_celkem_naklad" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">Priprava Celkem - Prodej</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_celkem_prodej" size="mini"  style="width:100%"></el-input-number>
     </el-col> -->



    </el-row>



    <el-row class="ml-1 mt-3 mb-0 blue-grey lighten-4">
     <table>
       <thead>
         <tr>
           <th style="border:none" >
             <el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:90%;color:yellow" class="info elevation-5">Prace</el-button>
           </th>
           <th style="border:none" >
             Nazev
           </th>
           <th style="border:none" >
             Rozliseni
           </th>
           <th style="border:none" >
             Rychlost
           </th>
           <th style="border:none" >
             <el-button size ="mini" @click="edit_vlastnosti('list2-jednotka','Jednotka')" style="width:90%;color:yellow" class="info elevation-2"> Jednotka</el-button>
           </th>
           <th style="border:none"  >&nbsp;</th>
           <th style="border:none"  >&nbsp;</th>
         </tr>
       </thead>
      <tbody>
        <tr>
          <td style="border:none" >
            <el-select v-model="strojmod.idefix_prace"
        default-first-option
        size="mini"  class="pt-0 pl-1"
        >
            <el-option
            v-for="item82 in list.data.enum_prace"
            :key="item82.idefix*1"
            :label="item82.nazev"
            :value="item82.idefix*1"
            >{{item82.nazev}} </el-option>
       </el-select>
          </td>
         <td style="border:none" >
          <el-autocomplete
        class="inline-input mr-1"
        v-model="strojmod.nazev"
        :fetch-suggestions="querySearch3"
        placeholder="Nazev tisk.modu"
        @select="handleSelect"
        size="mini"
        style="width:90%"
       ></el-autocomplete>
        </td>
        <td style="border:none" >
          <el-autocomplete
      class="inline-input mr-1 "
      v-model="strojmod.nazev_text"
      :fetch-suggestions="querySearch4"
      placeholder="Rozliseni "
      @select="handleSelect"
      size="mini"
      style="width:90%"
     ></el-autocomplete>

        </td>
       <td style="border:none" >
         <el-input-number v-model="strojmod.rychlost" size="mini"  style="width:100%"></el-input-number>
       </td>
       <td style="border:none" >
         <el-select v-model="strojmod.idefix_jednotka"
        default-first-option
        size="mini"  class="pt-0 pl-1 mx-1"
        >
            <el-option
            v-for="item83 in list.data.enum_jednotka"
            :key="item83.idefix*1"
            :label="item83.nazev"
            :value="item83.idefix*1"
            >{{item83.nazev}} </el-option>
       </el-select>

       </td>
       <td style="border:none" >
         <el-checkbox v-model="strojmod.mod_priorita" class="mx-1 px-1 mt-1"
            size="mini">Prioritni
       </el-checkbox>
       </td>
       <td style="border:none" >
          <button  type="button" style="width:100%;height:26px" class="pl-4" @click="insertMod" ><i class="el-icon-plus" size="mini"></i></button>
       </td>

        </tr>

      </tbody>

     </table>
    </el-row>


    <el-row   class="ma-0 mt-1">
    <el-col :span="24" :offset="0" style="position:relative;left:9px">
      <table style="width:100%">
        <!-- <thead >
          <tr>
          <th colspan="5" class="blue-grey lighten-4">Inkoust / spotreba</th>
          </tr>
        </thead> -->
        <tbody>
       <tr class="blue-grey lighten-5"><td style="text-align:left" class="blue-grey lighten-5">
         i1<el-select v-model="strojmod.idefix_i1"
          size="mini"
          class="pt-1 pl-1 ml-2"
          style="width:50%"
          >
        <el-option
            v-for="item90 in list.data.enum_inkoust"
            :key="item90.idefix*1"
            :label="item90.nazev"
            :value="item90.idefix*1"
            >{{item90.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="strojmod.i1spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"


       >
 </td>
 <td class="blue-grey lighten-4">i2<el-select v-model="strojmod.idefix_i2"  size="mini" class="pt-1 pl-1 ml-2 blue-grey lighten-4"  style="width:50%"  >
            <el-option
            v-for="item91 in list.data.enum_inkoust"
            :key="item91.idefix*1"
            :label="item91.nazev"
            :value="item91.idefix*1"
            >{{item91.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="strojmod.i2spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
       >
       </td>
     <td class="blue-grey lighten-5">i3
       <el-select v-model="strojmod.idefix_i3"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
          <el-option
            v-for="item92 in list.data.enum_inkoust"
            :key="item92.idefix*1"
            :label="item92.nazev"
            :value="item92.idefix*1"
            >{{item92.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="strojmod.i3spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
       >
       </td>
       <td class="blue-grey lighten-4">
       i4
       <el-select v-model="strojmod.idefix_i4"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
          <el-option
            v-for="item93 in list.data.enum_inkoust"
            :key="item93.idefix*1"
            :label="item93.nazev"
            :value="item93.idefix*1"
            >{{item93.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="strojmod.i4spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
       >
       </td>
       <td class="blue-grey lighten-5">
       i5
       <el-select v-model="strojmod.idefix_i5"  size="mini" class="pt-1 pl-1 ml-2 blue-grey lighten-5"  style="width:50%"  >
          <el-option
            v-for="item94 in list.data.enum_inkoust"
            :key="item94.idefix*1"
            :label="item94.nazev"
            :value="item94.idefix*1"
            >{{item94.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="strojmod.i5spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
       >
       </td>
      </tr>
    </tbody></table>

<!--- radek s tabulkou EOF //-->



    </el-col>
    </el-row>




<!-- <draggable v-model="list.data.strojmod"  :options="{group: 'people' }" @start="drag=true" @end="drag=false" :move="chooseItemMod"> -->
  <draggable v-model="list.data.strojmod"  :options="{group: 'people' }" @start="drag=true" @end="chooseItemMod" >

    <el-row  v-for="(itemmod, imod) in list.data.strojmod" :key="itemmod.idefix" class="ma-2 mt-0 "
      v-bind:class="{ 'white lighten-5' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
     >
     <table style="width:100%" border="0" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
       <tr v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
         <el-select v-model="list.data.strojmod[imod].idefix_prace"
        default-first-option
        size="mini"  class="pt-1 pl-1"

        >
            <el-option
            v-for="item82 in list.data.enum_prace"
            :key="item82.idefix*1"
            :label="item82.nazev"
            :value="item82.idefix*1"
            >{{item82.nazev}} </el-option>
       </el-select>
       </td>
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
         <el-autocomplete
        class="inline-input mr-1"
        v-model="list.data.strojmod[imod].nazev"
        :fetch-suggestions="querySearch3"
        placeholder="Nazev tisk.modu"
        @select="handleSelect"
        size="mini"
        style="width:100%"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
      ></el-autocomplete>
       </td>
      <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.strojmod[imod].nazev_text"
      :fetch-suggestions="querySearch4"
      placeholder="Popis modu "
      @select="handleSelect"
      size="mini"
      style="width:90%"
     ></el-autocomplete>
       </td>
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
           <el-input-number v-model="list.data.strojmod[imod].rychlost" size="mini"  style="width:100%"></el-input-number>
       </td>
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
         <el-select v-model="list.data.strojmod[imod].idefix_jednotka"
        default-first-option
        size="mini"  class="pt-1 pl-1 ml-2"
        >
            <el-option
            v-for="item83 in list.data.enum_jednotka"
            :key="item83.idefix*1"
            :label="item83.nazev"
            :value="item83.idefix*1"
            >{{item83.nazev}} </el-option>
       </el-select>
       </td>
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
        <el-checkbox v-model="list.data.strojmod[imod].mod_priorita"
            size="mini">Prioritni
       </el-checkbox>
       </td>
       <td style="border:none" v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
         <button  type="button" style="width:100%;height:26px;z-index:1900000" class="px-0 " @click="deleteMod(imod)" ><i class="el-icon-delete" size="mini"></i></button>
       </td>
      </tr>
     </table>



<!--- radek s tabulkou //-->
    <el-row   class="ma-0 mt-1">
    <el-col :span="24" :offset="0" style="position:relative;left:2px">
      <table style="width:100%;border:none">
        <!-- <thead>
          <tr>
          <th colspan="5" v-bind:class="{ 'green lighten-4' : ( imod % 2 == 0) , 'blue lighten-4' : ( imod % 2 != 0)  }" >Inkoust / spotreba</th>
          </tr>
        </thead> -->
        <tbody>
       <tr v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }">
         <td style="text-align:left"
         v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
         >
         i1<el-select v-model="list.data.strojmod[imod].idefix_i1"
          size="mini"
          class="pt-1 pl-1 ml-2"
          style="width:50%"
          >
        <el-option
            v-for="item190 in list.data.enum_inkoust"
            :key="item190.idefix*1"
            :label="item190.nazev"
            :value="item190.idefix*1"
            v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
            >{{item190.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="list.data.strojmod[imod].i1spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"


       >
 </td>
 <td
 v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
 >i2<el-select v-model="list.data.strojmod[imod].idefix_i2"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
            <el-option
            v-for="item191 in list.data.enum_inkoust"
            :key="item191.idefix*1"
            :label="item191.nazev"
            :value="item191.idefix*1"
            >{{item191.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="list.data.strojmod[imod].i2spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >
       </td>
     <td v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
     >i3
       <el-select v-model="list.data.strojmod[imod].idefix_i3"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
          <el-option
            v-for="item192 in list.data.enum_inkoust"
            :key="item192.idefix*1"
            :label="item192.nazev"
            :value="item192.idefix*1"
            >{{item192.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="list.data.strojmod[imod].i3spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >
       </td>
       <td v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >i4
       <el-select v-model="list.data.strojmod[imod].idefix_i4"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
          <el-option
            v-for="item193 in list.data.enum_inkoust"
            :key="item193.idefix*1"
            :label="item193.nazev"
            :value="item193.idefix*1"
            >{{item193.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="list.data.strojmod[imod].i4spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >
       </td>
       <td v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >i5
       <el-select v-model="list.data.strojmod[imod].idefix_i5"  size="mini" class="pt-1 pl-1 ml-2"  style="width:50%"  >
          <el-option
            v-for="item194 in list.data.enum_inkoust"
            :key="item194.idefix*1"
            :label="item194.nazev"
            :value="item194.idefix*1"
            >{{item194.nazev}} </el-option>
       </el-select>
       <input type="number" v-model="list.data.strojmod[imod].i5spotreba"
        class="mb-0 px-0 cell cisla"
        style="width:30%;"
        v-bind:class="{ 'white' : ( imod % 2 == 0) , 'blue lighten-5' : ( imod % 2 != 0)  }"
       >
       </td>
      </tr>
    </tbody></table>
<!--- radek s tabulkou EOF //-->

    </el-col>
    </el-row>
   </el-row>
</draggable>
   <el-col :span="24">
 <!--// {{  list.data.strojmod }} -->
</el-col>

    </el-col>
    </el-row>

    </v-card-text></v-card>

      </v-window-item>

        <v-window-item :value="3">

         <v-card v-show="step2=='3'"><v-card-text>
          <el-row class="ma-2 ">
          <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >

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
        <el-select v-model="strojceny.idefix_jednotka"  size="mini" class="pt-1 pl-1 ml-2"  style="width:90%"  >
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
        <el-select v-model="list.data.strojceny[iceny].idefix_jednotka"  size="mini" class="pt-0 pl-1 ml-2 mt-2 "  style="width:90%"  >
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
import ListStroj from '@/services/ListStrojService'
import List2bEdit from  './List2bEdit.vue'

import f from '@/services/fce'
import moment from 'moment'



//import List2StrojSubSkup from '@/services/List2StrojSubSkupService'
// import List2StrojSkup from '@/services/List2StrojSkupService'

import { setTimeout, clearInterval } from 'timers'

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
      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 50,
      rec: {},
      length: 4,
      window: 0,
      step: 6,
      step2: "1",
      Akce: '',
      //stepInfo: 'Resim co jako',
      idefixThis: 0,
      typKalkulace: 'N',
      list:[],
      list0:{},
      labelPosition: 'right',
      strojNazev: '',


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



  },
  created () {


    var self=this
    eventBus.$on('edit_stroj', ( dlgPar ) => {
      self.citac++
      self.getDataEnum()

    })
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
              self.step=1

              self.getData(dlgPar)



            }


          //}


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
        this.step=1
      }
      if (this.step<1) {
        this.step=3
      }
    }




  } ,

  methods: {

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
           console.log('2 Pracuji : ' , curTime , ": " , self.lastTime ," rozdil :", (curTime - self.lastTime))
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

    insertMod() {
        var lAdd = true

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

//        console.log(newObj)
/*
        this.strojmod =  {

          idefix: 0,
          idefix_stroj: 0,
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

      }
      */


        /*
          this.strojmod.idefix =  0
          this.strojmod.idefix_stroj =  0
          this.strojmod.idefix_prace =  0
          this.strojmod.nazev =  ''
          this.strojmod.nazev_text =  ''
          this.strojmod.rychlost =  0
          this.strojmod.idefix_jednotka =  0
          this.strojmod.idefix_i1 =  0
          this.strojmod.i1spotreba =  0
          this.strojmod.idefix_i2 =  0
          this.strojmod.i2spotreba =  0
          this.strojmod.idefix_i3 =  0
          this.strojmod.i3spotreba =  0
          this.strojmod.idefix_i4 =  0
          this.strojmod.i4spotreba =  0
          this.strojmod.idefix_i5 =  0
          this.strojmod.i5spotreba =  0
          this.strojmod.mod_priorita =  false
          this.strojmod.strojmodbarevnost =  []
          this.strojmod.rychlost_minuta_m2 =  0
          this.strojmod.rychlost_minuta_pocet =  0
          */


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

    async submitForm(formName) {
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
          this.list = []
          this.IsDialog = false

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
    currentTitle () {
      switch (this.step) {
        case 1:   return 'Sign-up'
        case 2:   return 'Create a password'
        default:  return 'Account created'
      }
    },
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
