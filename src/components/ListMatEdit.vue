<template>
 <v-dialog
      v-model="IsDialog"
        persistent
        max-width="900px"
        scrollable
        v-if="list && list.data && list.data.mat && list.data.mat.length > 0 "
    >
  >
<!-- <div class="white" id="de821" > -->
<div style="opacity:1; background:white;width:100%; " class="white" id="de821" >
  <slot name="a1" :sm="8" :md="8" :lg="8" :xl="8"></slot>
<el-row> <el-col :span="24">
</el-col></el-row>
  <panel :title="((Akce =='edit')?'Zmena':'Nova polozka ') +' ' + list.data.mat[0].nazev1 +' ' + list.data.mat[0].nazev2 +' ' + list.data.mat[0].nazev3  " >

    <!-- Akce +' : ' + mastrpis +': ' + isCopy + ' '+  -->
    <!-- {{list.data.rozmer2}} / {{ idefixThis }} -->
    <div slot="title2">
      <el-button v-if="isCopy == false " type="primary" id="btn_user_new_submit821" @click="submitForm('formnew')" size="mini"
            > Novy Upravou</el-button>
      <el-button v-if="isCopy" type="primary" id="btn_user_submit821" @click="submitForm('form')" size="mini"
        >Vlozit </el-button>
       <el-button v-else type="primary" id="btn_user_submit821" @click="submitForm('form')" size="mini"
        >Ulozit</el-button>

      <el-button v-if="isCopy" @click="resetForm('form')" id="btn_cancel_submit821" size="mini">Zrusit</el-button>
      <el-button v-else @click="resetForm('form')" id="btn_cancel_submit821" size="mini">Zavrit</el-button>
    </div>
    &nbsp;
  </panel>
<!-- <el-row>

  <el-col :span="24">{{ Akce }}  </el-col>
</el-row> -->

<el-form  id="form821" ref="form2" :model="form2" label-width="70px" :label-position="labelPosition"
:rules="rules2" class="demo-ruleForm is-success"

>
   <el-row class="ma-2">

     <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-matskup','Skupina')" style="width:90%">Skupina:</el-button> </el-col>
     <el-col :span="4" >

       <el-select v-model="list.data.mat[0].idefix_matskup"


        default-first-option
        @change="changeSkup"
        placeholder="Hlavni skupina"
        id="start821"
        style="width:100%" size="mini">
            <el-option
            v-for="item2 in list.data.enum_matskup" :key="item2.idefix*1" :label="item2.nazev"
            :value="item2.idefix*1"
            >
          </el-option>
       </el-select>
     </el-col>

     <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-matsubskup','Upresneni')" style="width:90%">Upresneni:</el-button> </el-col>
     <el-col :span="8">
      <el-select v-model="list.data.mat[0].idefix_matsubskup"
       filterable

        default-first-option
        @change="changeSubSkup"
        @blur="base"
        placeholder="Podskupina"
         style="width:100%" size="mini">
            <el-option
            v-for="item3 in list.data.enum_matsubskup" :key="item3.idefix" :label="item3.nazev"
            :value="item3.idefix*1"

            >{{item3.nazev}}</el-option>
       </el-select>
     </el-col>
   </el-row>
   <el-row class="ma-2">
     <el-col :span="3">Nazev </el-col>
     <el-col :span="4">
       <!-- <el-input  v-model="list.data.mat[0].nazev1" size="mini"></el-input> -->

     <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev1"
      :fetch-suggestions="querySearch1"
      placeholder="n1"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>


     </el-col>
     <el-col :span="4">
       <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev2"
      :fetch-suggestions="querySearch2"
      placeholder="n2"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
     </el-col>

     <el-col :span="7">
       <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev3"
      :fetch-suggestions="querySearch3"
      placeholder="n3"
      @select="handleSelect"
      size="mini"
      style="width:100%"
    ></el-autocomplete>
     </el-col>
   </el-row>
   <el-row ><el-col :span="14">


    <el-row class="ma-2">

     <el-col :span="5"><el-button size ="mini" @click="edit_vlastnosti('list2-matvlastnosti','Vlastnosti')" style="width:90%">Vlastnosti:</el-button> </el-col>
      <el-col :span="18">
       <el-select v-model="list.data.vlastnosti" multiple filterable  default-first-option
       @change="changeVlastnosti"
        style="width:100%" size="mini">
            <el-option
            v-for="item4 in list.data.enum_matvlastnosti"
            :key="item4.idefix*1"
            :label="item4.nazev"
            :value="item4.idefix*1"


            >{{item4.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>

     <el-row class="ma-2">
     <el-col :span="5"><el-button size ="mini" @click="edit_vlastnosti('list2-matbarva','Barva')" style="width:90%">Barva:</el-button> </el-col>
     <el-col :span="8">
       <el-select v-model="list.data.barva"  filterable  default-first-option
        @change="changeBarva"
        style="width:100%" size="mini">
            <el-option
            v-for="item9 in list.data.enum_matbarva"
            :key="item9.idefix*1"
            :label="item9.nazev"
            :value="item9.idefix*1"

            >{{item9.nazev}} </el-option>
       </el-select>
     </el-col>
     <el-col :span="6"><el-button size ="mini" @click="edit_vlastnosti('list2-matpotisknutelnost','Potisknutelnost')" style="width:90%">Potisknutelnost:</el-button> </el-col>
     <el-col :span="4">
       <el-select v-model="list.data.potisknutelnost"  filterable  default-first-option
        @change="changePotisknutelnost"
        style="width:100%" size="mini">
            <el-option
            v-for="item91 in list.data.enum_matpotisknutelnost"
            :key="item91.idefix*1"
            :label="item91.nazev"
            :value="item91.idefix*1"

            >{{item91.nazev}} </el-option>
       </el-select>

     </el-col>

     </el-row>


     <el-row class="ma-2">

     <el-col :span="5"><el-button size ="mini" @click="edit_vlastnosti('list2-matvyrobce','Vyrobce')" style="width:90%">Vyrobce:</el-button> </el-col>
     <el-col :span="18">

       <el-select v-model="list.data.mat[0].idefix_vyrobce"  filterable  default-first-option
        @change="changeVyrobce"
        style="width:100%" size="mini">
            <el-option
            v-for="item5 in list.data.enum_matvyrobce"
            :key="item5.idefix*1"
            :label="item5.nazev"
            :value="item5.idefix*1"


            >{{item5.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>
     </el-col>
     <el-col :span="5">
       <div>
       <!-- <barcode value="1234567890" :options="{ lineColor: '#0275d8', text: 'Scan'}"></barcode> -->
       <barcode :value="'0000000'+list.data.mat[0].idefix" :options="{ lineColor: '#0275d8', text: 'Scan'}" height="40"></barcode>
       </div>
     </el-col>
   </el-row>

     <el-row class="ma-2">

     <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-matdodavatel','Dodavatel')" style="width:90%">Dodavatel:</el-button> </el-col>
     <el-col :span="7">

       <el-select v-model="list.data.mat[0].idefix_dodavatel"
            filterable

            default-first-option

            style="width:100%;"
            size="mini">
            <el-option
            v-for="item6 in list.data.enum_dodavatel"
            :key="item6.idefix*1"
            :label="item6.nazev"
            :value="item6.idefix*1"
            >{{item6.nazev}} </el-option>
       </el-select>
     </el-col>
     <el-col :span="3">

       <el-checkbox v-model="list.data.mat[0].dodavatel_priorita"
          :checked="(list.data.mat[0].dodavatel_priorita==1)?true:false"
            size="mini">Prioritni
       </el-checkbox>
     </el-col>
     </el-row>

     <el-row class="ma-2">
     <el-col :span="3">Popis </el-col>
     <el-col :span="12">
       <el-input type="textarea" autosize  v-model="list.data.mat[0].popis" size="mini"  style="width:100%"></el-input>
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list-stroj','Stroje')" style="width:90%">Stroje:</el-button> </el-col>
     <el-col :span="12">
       <el-select v-model="list.data.stroj" multiple filterable
        default-first-option
        @change="changeStroj"
        style="width:100%" size="mini">
            <el-option
            v-for="item81 in list.data.enum_stroj"
            :key="item81.idefix*1"
            :label="item81.nazev"
            :value="item81.idefix*1"

            >{{item81.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>

    <el-row class="ma-2">
     <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-strojskup','Skupiny Stroju')" style="width:90%">Skupiny stroju:</el-button> </el-col>
     <el-col :span="12">
       <el-select v-model="list.data.strojskup" multiple filterable

        default-first-option
       @change="changeStrojKat"
        style="width:100%" size="mini">
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

     <el-col :span="24">
      <el-row>
        <table width="94%">
          <thead>

            <th rowspan="1" style="width:15%">Dostupnost</th>
            <th style="width:18%">Sirka mm</th>

            <th v-if="mastrpis=='R'" style="width:18%" >Navin mm</th>
            <th v-else style="width:18%">Vyska mm</th>
            <th style="width:18%">Sirka Zbytek</th>
            <th style="width:18%">Vyska Zbytek</th>
            <th style="width:5%"></th>
          </thead>
          <tbody>

          <td rowspan="1">
          <el-select v-model="enum_matdostupnost"
            id="id_enum_matdostupnost_821"

            default-first-option
            filterable
            style="width:100%;"
            size="mini">
            <el-option
            v-for="item7 in list.data.enum_matdostupnost"
            :key="item7.idefix*1"
            :label="item7.nazev"
            :value="item7.idefix*1"

            >{{item7.nazev}} </el-option>
          </el-select>
            </td>

            <td>
              <el-autocomplete
              type="text"
              style="background:yellow"
              class="inline-input mr-1 "
              v-model="sirka_mm"
              :fetch-suggestions="querySearch21"
              placeholder="Sirka"
              @select="handleSelect"

              size="mini"
            ></el-autocomplete>
            </td>

            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="vyska_mm"
              :fetch-suggestions="querySearch22"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>
            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="sirka_mm_zbytek"
              :fetch-suggestions="querySearch23"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>
            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="vyska_mm_zbytek"
              :fetch-suggestions="querySearch24"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td><td>

            <!-- <el-button v-if="akceRozmer=='i' || akceRozmer=='e'" icon="el-icon-plus" type="success" @click="insertRozmer" size="mini"></el-button>
            <el-button v-if="akceRozmer=='e' || akceRozmer=='i'" icon="el-icon-edit" type="primary" @click="insertRozmer" size="mini"></el-button> -->
            <button v-if="akceRozmer=='i' || 1==1 "   type="button" style="width:30%;height:8px" class="px-0 " @click="insertRozmer('i')" ><i class="el-icon-plus" size="mini"></i></button>
            <button v-if="akceRozmer=='e' "   type="button" style="width:30%;height:8px" class="px-0 " @click="insertRozmer('e')" ><i class="el-icon-edit"    size="mini"></i></button>
            </td>

          </tr>
          </tbody>
        </table>
      </el-row>

     </el-col>
     </el-row>
     <el-row class="ma-2">
     <el-col :span="24">
       <table width="94%">
         <tr v-for="(ie1 , iedx) in list.data.rozmer2" :key="ie1.idx" v-if="iedx==0">
           <td style="width:8%">S/O</td>
           <td style="width:45%" v-if="mastrpis=='R'">Sirky</td>
           <td v-else style="width:45%">Rozmer</td>
           <td v-if="mastrpis=='R'">Navin</td>
           <td >Zbytek</td>

         </tr>

         <tr v-for="(ie3 ,iedx2 ) in list.data.rozmer2" :key="ie3.idx" >
           <td >{{ ie3.zkratka.replace('X','N')}}</td>

          <td style="text-align:left" >
            <span v-for="(iX, x) in mySplit(ie3.rozmer)" :key="x"
              class="mx-2"
            >

            <el-tag class="pr-4 mr-0  black--text" v-if="ie3.zkratka=='S'" type="success" size="mini" >
            {{myZobr(iX)}}
            <!-- <button type="button" style="width:30%;height:8px" class="px-0 " @click="Zmen(iX,1)" ><i class="el-icon-document" size="mini"></i></button> -->
            <button type="button" style="width:30%;height:8px" class="px-0 " @click="Zmen(iX,0)" ><i class="el-icon-edit"    size="mini"></i></button>
            <button type="button" style="width:30%;height:8px" class="px-0 black--text" @click="Zmiz(iX)"   ><i class="el-icon-close"   size="mini"></i></button>
            </el-tag>

            <el-tag class="pr-4 mr-0 black--text" v-else-if="ie3.zkratka=='O'"   type="warning" size="mini" >
             {{myZobr(iX)}}
            <!-- <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,1)" ><i class="el-icon-document" size="mini"></i></button> -->
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,0)" ><i class="el-icon-edit" size="mini"></i></button>
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmiz(iX)" ><i class="el-icon-close" size="mini"></i></button>
            </el-tag>

            <el-tag class="pr-4 mr-0 black--text" v-else-if="ie3.zkratka=='PP'"   type="success" size="mini"  >
             {{myZobr(iX)}}
            <!-- <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,1)" ><i class="el-icon-document" size="mini"></i></button> -->
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,0)" ><i class="el-icon-edit" size="mini"></i></button>
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmiz(iX)" ><i class="el-icon-close" size="mini"></i></button>
            </el-tag>
            <el-tag class="pr-4 mr-0 black--text" v-else-if="ie3.zkratka=='X'"   type="danger" size="mini"  >
             {{myZobr(iX)}}
            <!-- <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,1)" ><i class="el-icon-document" size="mini"></i></button> -->
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,0)" ><i class="el-icon-edit" size="mini"></i></button>
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmiz(iX)" ><i class="el-icon-close" size="mini"></i></button>
            </el-tag>
            <el-tag class="pr-4 mr-0 black--text" v-else   size="mini"  >
             {{myZobr(iX)}}
            <!-- <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,1)" ><i class="el-icon-document" size="mini"></i></button> -->
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmen(iX,0)" ><i class="el-icon-edit" size="mini"></i></button>
            <button type="button" style="width:30%;height:8px" class="  px-0 " @click="Zmiz(iX)" ><i class="el-icon-close" size="mini"></i></button>
            </el-tag>


            </span>
           </td>
          <td v-if="mastrpis=='R'" style="text-align:left">{{ myZobrZbytek(ie3.delky)/1000 }}m</td>
          <td >{{myZobrZbytek(ie3.rozmer_zbytek)}}</td>

         </tr>
       </table>
     </el-col>
     </el-row>
     <el-row><el-col :span="17">
     <el-row class="ma-2">
        <el-col :span="4">
          koef_naklad
        </el-col>
        <el-col :span="3">
           <el-autocomplete
           class="inline-input mr-1"
           v-model="list.data.mat[0].koef_naklad"
           :fetch-suggestions="querySearch19"
           placeholder="Please Input"
           @select="handleSelect"
           size="mini"
           @change="cena_naklad()"
           @blur="cena_naklad()"
         ></el-autocomplete>
        </el-col>
        <el-col :span="4">
          koef_prodej
        </el-col>
        <el-col :span="3">
           <el-autocomplete
           class="inline-input mr-1"
           v-model="list.data.mat[0].koef_prodej"
           :fetch-suggestions="querySearch20"
           placeholder="Please Input"
           @select="handleSelect"
           size="mini"
       ></el-autocomplete>

        </el-col>
        <el-col :span="4">
          koef_real
        </el-col>
        <el-col :span="3"


       v-bind:class="{ bad : list.data.mat[0].cena_nakup_m2 * list.data.mat[0].koef_naklad*1 > list.data.mat[0].cena_naklad_m2*1
        , ok : this.list.data.mat[0].cena_nakup_m2 * this.list.data.mat[0].koef_naklad*1 <= this.list.data.mat[0].cena_naklad_m2*1 }"
       >
       {{     Math.round(list.data.mat[0].nakup_result*1000)/1000        }}



        </el-col>
     </el-row>

     <el-row class="ma-2">
        <el-col :span="4">
          Tloušťka v mm
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].sila_mm" size="mini"  style="width:100%"></el-input>
        </el-col>
        <el-col :span="4"> Váha v g/m2</el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].vaha_gm2" size="mini"  style="width:100%"></el-input>
        </el-col>
        <el-col :span="4">
          Nakup kg
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_nakup_kg" size="mini"  style="width:100%"     @change="cena_naklad()"></el-input>
        </el-col>
      </el-row>



      <el-row class="ma-2">
        <el-col :span="4">
           Nakup m2
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_nakup_m2" size="mini"  style="width:100%"     @change="cena_naklad()"></el-input>
        </el-col>



        <el-col :span="4">
          Naklad m2
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_naklad_m2" size="mini"  style="width:100%" @change="cena_naklad()" ></el-input>
        </el-col>
          <el-col :span="4">
          Prodej m2
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_prodej_m2" size="mini"  style="width:100%" ></el-input>
        </el-col>

      </el-row>
      <el-row class="ma-2">
        <el-col :span="4">
          Nakup arch
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_nakup_arch" size="mini"  style="width:100%"     @change="cena_naklad()"></el-input>
        </el-col>



        <el-col :span="4">
          Naklad arch
        </el-col>
        <el-col :span="3">
          <el-input v-model="list.data.mat[0].cena_naklad_arch" size="mini"  style="width:100%" ></el-input>
        </el-col>
         <el-col :span="4">


        <!--
         cena_nakup_m2 numeric(10,2),
          numeric(10,2),   --//spolecna polozka
         koef_prodej numeric(10,2),

         cena_nakup_kg numeric(10,2),   --!!!! cena za arch je různá podle gramáží papíru
         cena_nakup_arch numeric(10,2),  --výpočet z ceny za kg, formátu a gr. v db ponecham, prepoctu po ulozeni, nebo prepocitam aplikaci
         cena_naklad_arch numeric(10,2),    -- vypočteno nákupní cena x nákladový koeficient  - tedy postupne , podle zadanych hodnot
         cena_naklad_m2 numeric(10,2),    -- vypočteno nákupní cena x nákladový koeficient  - tedy postupne , podle zadanych hodnot

         cena_prodej_m2 numeric(10,2)   , -- výpočet nákladová cena x prodejní koeficient
         cena_prodej_arch numeric(10,2)  -- výpočet nákladová cena x prodejní koeficient
         -->

          Prodej arch


        </el-col>

        <el-col :span="3">

          <el-input v-model="list.data.mat[0].cena_prodej_arch" size="mini"  style="width:100%" ></el-input>
        </el-col>

      </el-row>
      <el-row><el-col>
        <br>



        </el-col></el-row>

      </el-col>

      <el-col :span="6">
        <el-row><el-col :span="24">
          <el-button size ="mini" @click="edit_vlastnosti('list-mat-projcena','Projektove ceny')" style="width:90%">Projektove ceny</el-button>
          </el-col></el-row>
        <el-row>
          <el-col :span="24">
            <div style="height:200px">
<!--
              <table>
                <thead>
                  <th>Datum</th>
                  <th>Job</th>
                  <th>Cena/m2</th>
                  <th>Mnozstvi</th>
                  <th>FA</th>
                </thead>
                <tbody>
                <tr v-for="(itemCena,iC) in list.data.projcena" :key="iC">
                  <td>{{ datum(itemCena.datum)}}</td>
                  <td>{{itemCena.nabidka}}/{{itemCena.zakazka}}</td>
                  <td>{{itemCena.cena_m2}}</td>
                  <td>{{itemCena.mnozstvi}}</td>
                  <td>{{itemCena.faktura}}</td>
                </tr>
                </tbody>
              </table>


//-->
            </div>
          </el-col>
          </el-row>

      </el-col>
     </el-row>

 <el-row class="mt-4">

 </el-row>
</el-form>
</div>
<list2-edit></list2-edit>

<!-- <win-dow :title="'events'" :id="`events`"
    :x="200"
    :w="700"
    :y="100"
    :z="90"
    :h="351"
    :parent="false"
    :maximize="false"
    >
  i: {{ info }}

  </win-dow>
-->

</v-dialog>

</template>
<script>
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListMat from '@/services/ListMatService'
import List2Edit from  './List2Edit.vue'
import ListMatProjCena from './ListMatProjCena'
import f from '@/services/fce'
import moment from 'moment'



//import List2MatSubSkup from '@/services/List2MatSubSkupService'
// import List2MatSkup from '@/services/List2MatSkupService'

import { setTimeout, clearInterval } from 'timers'

export default {
  components: {
    'list2-edit': List2Edit,
    'list-mat-projcena': ListMatProjCena

  },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      citac: 0,
      info: [],
      neco: 0,
      links: [],
      labelPosition: 'right',
      IsDialog: false,
      Akce: 'NICXXX',
      isCopy: -1,
      recData: {},
      idRecord: 0,
      idefixThis:0,
      list: [],
      akceId: -1,  //Id pro meneny podzaznam
      mastrpis:'X',
      akceRozmer:'i',
      lastmatskup: 0,
      sirka_mm: "0",
      vyska_mm: "0",
      sirka_mm_zbytek: "0",
      vyska_mm_zbytek: "0",

      enum_matdostupnost: null,
      enums:{
        skup: [],
        subskup: [],
      },
      value: '',
        tag: 'svg',
        options: {
            lineColor: '#ff7069',
            fontSize: 32,
            font: 'Courier',
            width: 3,
            height: 60,
            marginBottom: 60,
            format: 'MSI',
            background: '#ccffff'
        },
      form2: {

      },
      formBackup: {

      },
      cols: {},
      rules2:   {

      }

    }
  },
  created() {
    const self=this
    eventBus.$on('edit', ( dlgPar ) => {
      self.citac++

          //var cmodul = $self.$store.state.showModule
          //alert(dlgPar)

          self.getDataEnum()
        //alert('Vracim parametry' + JSON.stringify(dlgPar))
    })
    eventBus.$on('dlg821', ( dlgPar ) => {

      //alert('modulik')
      //alert(JSON.stringify(dlgPar))
      self.IsDialog = true
      self.Akce = dlgPar.Akce
      self.$store.dispatch('setshowEdit', false)
      self.$store.dispatch('setshowIdefix', self.idefixThis)
      //alert(self.citac)



      //alert(JSON.stringify(dlgPar))

      self.getData(dlgPar)
      .then (res => {
          if (document.getElementById('start821')){
            setTimeout(function(){
              //alert(111)
              document.getElementById('start821').focus()
            },200)
          }
      })

  })


  },
  updated (){
    const self =   this
    if (self.list.data && self.list.data.mat[0] && self.list.data.mat[0].idefix_matskup && self.lastmatskup !== (self.list.data.mat[0].idefix_matskup)   ) {
      self.lastmatskup = self.list.data.mat[0].idefix_matskup
      this.MastrPis(self.list.data.mat[0].idefix_matskup)

    }
    // this.MastrPis(self.list.data.mat[0].idefix_matskup)

    if (document.getElementById("de821")){
          document.getElementById("de821").addEventListener('keydown', (function(e) {
            //alert(e.keyCode)

          if (e.keyCode == 13) {
            if (e.target.type=="textarea"){
              return true
            }
              return true
              alert(e.target.type)
              document.getElementById('btn_user_submit821').focus()


          }
            if (e.keyCode == 27) {
               e.stopPropagation()
               e.preventDefault()

              document.getElementById('btn_cancel_submit821').focus()
              //self.cancelForm()

              //  self.IsDialog=false;

          }
        }))
    } else {
             //alert('Slyseti Jiz nebudu vice')

    }



  },
  mounted() {
//    this.mastrpis =  this.list.data.mat[0].idefix_matskup
//    this.mastrpis ="XXXX"
    //alert(this.idefixThis)
    if (this.Akce=='copy'){
      // alert('Hned to tam prdnu')
    }

    //this.cena_naklad()
     // alert('M')
  },
  watch: {
    sirka_mm: function() {
      this.sirka_mm = this.sirka_mm.replace(/,/,'.')
    },
    vyska_mm: function() {
      this.vyska_mm = this.vyska_mm.replace(/,/,'.')
    },
    sirka_mm_zbytek: function() {
      this.sirka_mm_zbytek = this.sirka_mm_zbytek.replace(/,/,'.')
    },
    vyska_mm_zbytek: function() {
      this.vyska_mm_zbytek = this.vyska_mm_zbytek.replace(/,/,'.')
    }


  } ,

  methods: {


  Info(ainfo){
    const self = this
    self.info=[]
    self.info =ainfo


    // ainfo.foereach(el => {
    //   self.info.push(el)
    // })
  },

    async getDataEnum(){
      const self = this
            //alert('PRED' + JSON.stringify(self.list.data.enum_matvlastnosti))
            //ServerKlice = 7 vlastnosti
            var tmp
            var tmp2
            if (self.$store.state.showModule == 'list2-matvlastnosti') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 7,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis , 7,''))
                  self.list.data.enum_matvlastnosti = tmp2.data.enum_matvlastnosti
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
                 alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-matvyrobce') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 6,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis , 6,''))
                  self.list.data.enum_matvyrobce = tmp2.data.enum_matvyrobce
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }
           if (self.$store.state.showModule == 'list2-matsubskup') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 5,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis , 5,''))
                  self.list.data.enum_matsubskup = tmp2.data.enum_matsubskup
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-matskup') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 4,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis , 4,''))
                  self.list.data.enum_matskup = tmp2.data.enum_matskup
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }
           if (self.$store.state.showModule == 'list-stroj') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 11,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,11,''))
                  self.list.data.enum_stroj = tmp2.data.enum_stroj
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-matdodavatel') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 8,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,8,''))
                  self.list.data.enum_dodavatel = tmp2.data.enum_dodavatel
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-matpotisknutelnost') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 14,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,14,''))
                  self.list.data.enum_matpotisknutelnost = tmp2.data.enum_matpotisknutelnost
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-matbarva') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 12,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,12,''))
                  self.list.data.enum_matbarva = tmp2.data.enum_matbarva
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }

            if (self.$store.state.showModule == 'list2-strojskup') {
              try {
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 10,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,10,''))
                  self.list.data.enum_strojskup = tmp2.data.enum_strojskup
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }
           if (self.$store.state.showModule == 'list-mat-projcena') {
              try {
              //  alert('a'+ self.idefixThis)
              tmp =  ( await ListMat.one(this.user,this.idefixThis , 200,''))
                try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,200,''))
                  self.list.data.enum_strojskup = tmp2.data.enum_strojskup
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert(e0)
                }
              } catch(e) {
               alert(e)
              }
            }









    },
    async getData(dlgPar) {
          const self = this
          // alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          // alert(dlgPar.Idefix)
           self.list = []


          if (dlgPar.Idefix > 0 ){
            if (dlgPar.Akce=='copy'){
              self.isCopy=true
              //alert(1)
              self.list = (await ListMat.one(this.user,dlgPar.Idefix, -1,'copy'))
              //alert(2)
              //self.idefixThis = self.list.data.mat[0].idefix
              self.idefixThis = self.list.data.newId
              //alert(self.list.data.newId)
              //alert(self.idefixThis)

            }
            if (dlgPar.Akce=='edit'){
              self.isCopy=false
              self.list = (await ListMat.one(this.user,dlgPar.Idefix, -1,'edit'))
              self.idefixThis = self.list.data.mat[0].idefix

            }
            }
          },
    mySplit(ctxt){
      var neco=(ctxt+'')
      //alert(neco.split(",")[0] )
      return neco.split(",")
    },
    myZobr(ctxt){
      var neco=(ctxt+'')
      var aPart=neco.split("~")[1]+''
      if (this.mastrpis == 'D' || this.mastrpis == 'A'){

        return aPart
      }
      if (this.mastrpis == 'R' ){
        var Sirka = aPart.split('x')[0]+''
        return Sirka

      }

      return '?: '+ aPart
      //alert(neco.split(",")[0] )

    },
    myZobrZbytek(ctxt) {
      var tmp= (ctxt+'').replace(/(\[)|(\])|(\.00)/g,'')
      //var tmp= (ctxt+'').replace(/(00)/g,'')
      return tmp
    },
    Zmiz(par){
      var zmizik = par.split('~')[0]
      const self = this

      if (zmizik*1 > 0) {
         this.deleteRozmer(zmizik)
         // alert(par.split('~')[0])
      }
    },
    edit_vlastnosti(cmodul,ctitle){
      const self  = this
      if ( !this.$store.state.showEdit==true ){

        this.$store.dispatch('setshowEdit', true)
        this.$store.dispatch('setshowModule', cmodul)
        this.$store.dispatch('setshowIdefix', self.idefixThis)
        this.$store.dispatch('setshowModuleTitle', ctitle)
        eventBus.$emit('edit_run')
      } else {
        // alert("Zahadne Zmiznu")
        this.$store.dispatch('setshowEdit', false)
      }

    },
    Zmen(par, priznak){
      var zmizik = par.split('~')[0]
      const self = this

      if (zmizik*1 > 0) {
         //this.deleteRozmer(zmizik)
         //alert(par.split('~')[0])
         self.list.data.rozmer.forEach(el=>{
           if (el.idefix == zmizik){
               self.sirka_mm = el.sirka_mm
               self.vyska_mm = el.vyska_mm
               self.sirka_mm_zbytek = el.sirka_mm_zbytek
               self.vyska_mm_zbytek = el.vyska_mm_zbytek

               self.enum_matdostupnost = el.idefix_dostupnost
               if (priznak == 1){
                 self.akceRozmer='i'
               }
               if (priznak == 0){
                 self.akceRozmer='e'
               }

               self.akceId = zmizik
             return
           }
         })
         //alert('Zmenik' + zmizik)
      }
    },
    base(e) {  //jen tak test, jestli se event projevi
      // alert('Jsme to '+ this.list.data.mat[0].idefix_matsubskup)
    },
    async changeSkup(){
      const self = this
      // alert(self.idefixThis)
    },
    async changeSubSkup(e) {
      var cval= e+''
      var cq=''
      var tmp
      const self = this
       if (cval.match(/[a-z]/ig)) {
         if (confirm('Vlozit   ' + cval  + 'pro typ '+ self.mastrpis + '?')) {
           cq=`insert into list2_matsubskup
          (idefix_matskup,kod,nazev,user_insert_idefix)
          select * from (
          select (select idefix from list2_matskup where zkratka= '${self.mastrpis}' limit 1 ) a,
          (select  max(kod) +10 from list2_matsubskup limit 1 ) b,
	        '${cval}'::text as txt,
	        login2idefix('${self.user}')
          ) aa where not exists (select * from list2_matsubskup b where aa.txt = b.nazev)`

          var tmp =  (await ListMat.one(this.user,this.idefixThis , 7,cq)).data
          self.list.data.enum_matsubskup = tmp.enum_matsubskup
          //alert("pred " + self.list.data.mat[0].idefix_matsubskup)
          tmp.enum_matsubskup.forEach(el=>{
            if (el.nazev == cval){
                self.list.data.mat[0].idefix_matsubskup = el.idefix
                // alert('mam ho')
                return
            }
          })

          setTimeout(function(){
            self.list.data.enum_matsubskup = tmp.enum_matsubskup
            // alert("po " + self.list.data.mat[0].idefix_matsubskup)
          },1000)


          //alert(tmp.enum_matsubskup[tmp.enum_matsubskup.length-1].idefix)

         }

       }
      //alert(e + 'XX')
    },
    async deleteRozmer(zmizik ) {
      const self = this

      //self.list.data.rozmer2 = []
      self.list.data.rozmer=[]
      self.list.data.rozmer2=[]

      var tmp =  (await ListMat.one(this.user,this.idefixThis , 101,`
      delete from list_mat_rozmer where idefix=${zmizik} and idefix_dostupnost = (select idefix from list2_matdostupnost where zkratka='X') ;
      update list_mat_rozmer set idefix_dostupnost = (select idefix from list2_matdostupnost where zkratka='X') where idefix=${zmizik}
       `)).data
      //var tmp =  (await ListMat.one(this.user,this.idefixThis , 101,`delete from list_mat_rozmer where idefix=${zmizik} `)).data
      self.list.data.rozmer  =tmp.rozmer
      var tmp2 =  (await ListMat.one(this.user,this.idefixThis , 105,`select 1`)).data
      //self.list.data.rozmer2 =tmp.rozmer2
      //self.list.data.rozmer  =tmp.rozmer

      self.list.data.rozmer2 =tmp2.rozmer2




    },
    async insertRozmer(akce) {
      const self = this
      //self.list.data.rozmer2 = []
      //enum_matdostupnost
      if (self.sirka_mm > 0 && self.vyska_mm>0 && self.enum_matdostupnost > 0 ){
        if (self.akceRozmer=='i' || akce=='i')  {
          var dotaz_insert = `insert into list_mat_rozmer(idefix_mat,sirka_mm,vyska_mm, sirka_mm_zbytek,vyska_mm_zbytek, idefix_dostupnost)
          values ( ${self.idefixThis},${self.sirka_mm},${self.vyska_mm},${self.sirka_mm_zbytek},${self.vyska_mm_zbytek},${self.enum_matdostupnost} )`
        }
        if (self.akceRozmer=='e' && akce=='e')   {
          var dotaz_insert = `update list_mat_rozmer set
               sirka_mm = ${self.sirka_mm}
              ,vyska_mm = ${self.vyska_mm}
              ,sirka_mm_zbytek = ${self.sirka_mm_zbytek}
              ,vyska_mm_zbytek = ${self.vyska_mm_zbytek}
              ,idefix_dostupnost = ${self.enum_matdostupnost}
            where idefix  = ${self.akceId}  `
        }

      self.list.data.rozmer=[]
      self.list.data.rozmer2=[]
      var tmp =  (await ListMat.one(this.user,this.idefixThis , 101,`${dotaz_insert}`)).data
      self.list.data.rozmer  =tmp.rozmer
      var tmp2 =  (await ListMat.one(this.user,this.idefixThis , 105,`select 1`)).data
      self.list.data.rozmer2 =tmp2.rozmer2
      //alert(self.$refs.enum_matdostupnost)

      //self.$refs.enum_matdostupnost.focus()
      document.getElementById("id_enum_matdostupnost_821").focus();
//      enum_matdostupnost

      } else {
        this.$alert('Neni vybrana dostupnost nebo chybi rozmery', 'Chyba pri vlozeni dostupnosti', {
          confirmButtonText: 'OK',
          callback: action => {

          }
        });
      }

      // --na objednavku vzor
       //self.list.data.rozmer2 = (await ListMat.one(this.user,this.idefixThis , 14,`delete from list_mat_rozmer where idefix=${zmizik}`)).data.rozmer2

    },
    MastrPis(id){
      const self = this
      this.list.data.enum_matskup.forEach(el => {
        if (el.idefix == id){
          self.mastrpis = el.zkratka
          return

        }
      })

    },
    cena_naklad()  {
      //alert((this.list.data.mat[0].cena_nakup_m2*1)+"/" + (this.list.data.mat[0].koef_naklad*1) )
      //this.list.data.mat[0].cena_naklad_m2 = (this.list.data.mat[0].cena_nakup_m2*1) *  (this.list.data.mat[0].koef_naklad*1)
      var nakup_result = 0
      if (this.list.data.mat[0].cena_naklad_m2*1>0){
        nakup_result = (this.list.data.mat[0].cena_nakup_m2 * this.list.data.mat[0].koef_naklad*1)/ this.list.data.mat[0].cena_naklad_m2*1
        this.list.data.mat[0].nakup_result = nakup_result
      }
      if (this.list.data.mat[0].cena_nakup_m2 *1 <= 0 ){
        alert('Cena nakup ! musi byt zadana')
      }
      if (this.list.data.mat[0].cena_nakup_m2 * this.list.data.mat[0].koef_naklad*1 > this.list.data.mat[0].cena_naklad_m2*1){
          alert("Nakup je prislis drahy , zkotrolujte koeficienty nebo podklady zadavaci" + nakup_result)
      }

      this.list.data.mat[0].cena_prodej_m2 = (this.list.data.mat[0].cena_naklad_m2*1) *  (this.list.data.mat[0].koef_prodej*1)
      //this.list.data.mat[0].cena_nakup_m2 * this.list.data.mat[0].koef_nakup
    } ,
    cena_prodej()  {
      //alert((this.list.data.mat[0].cena_nakup_m2*1)+"/" + (this.list.data.mat[0].koef_naklad*1) )

      //this.list.data.mat[0].cena_nakup_m2 * this.list.data.mat[0].koef_nakup
    } ,

    async submitForm(formName) {
      const self = this
      if (formName == 'formnew'){
        alert(formName+ ' /' + self.idefixThis)
        eventBus.$emit('dlg821', {
           'IsDialog': true,
           'Akce' : 'copy' ,
           'Idefix' :  self.idefixThis,

      })
        return
      }


      var neco=  (await ListMat.saveone(self.user,self.idefixThis,{
        data: self.list.data.mat[0],
        barva: self.list.data.barva,
        strojskup: self.list.data.strojskup,
        stroj: self.list.data.stroj,
        vlastnosti: self.list.data.vlastnosti,
        potisknutelnost: self.list.data.potisknutelnost


          }))

      //this.IsDialog = false

      this.list = []
      eventBus.$emit('dlg821rec')
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
            var prd= (await ListMat.delete(self.user,self.idefixThis))
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
    async onSubmitSave(){

    },
    endDlg (){
      this.IsDialog = false


      return true
    },
    //Zmeny obsahu  SELECT
//strojskup
   changeVlastnosti1 (e){


   },
   changeVyrobce (e){


   },
   changeDodavatel (e){


   },
    changeVlastnosti (e) {
      return true

      var xval= e+''
      var cq=''
      var tmp

      const self = this
      var aval = xval.split(',')

      //alert('1')
      //alert(aval.length)
       if (cval.match(/[a-z]/ig)) {
         if (confirm('Vlozit   ' + cval  + 'pro typ '+ self.mastrpis + '?')) {
           cq=`insert into list2_matvlastnosti
          (kod,nazev,user_insert_idefix)
          select * from (

          (select  max(kod) +10 from list2_matvlastnosti limit 1 ) b,
	        '${cval}'::text as txt,
	        login2idefix('${self.user}')
          ) aa where not exists (select * from list2_matvlastnosti b where aa.txt = b.nazev)`

          //var tmp =  (await ListMat.one(this.user,this.idefixThis , 2,cq)).data
          //self.list.data.enum_matvlastnosti = tmp.enum_matvlastnosti

         }
       }


    },


    changeBarva(item ) {
      //alert(item.value)
    //  alert(JSON.stringify(item))
    },
    changePotisknutelnost(item ) {
      //alert(item.value)
      //alert(JSON.stringify(item))
    },



   changeStroj(item ) {
      //alert(item.value)
      //alert(JSON.stringify(item))
    },
    changeStrojKat(item ) {
      //alert(item.value)
      //alert(JSON.stringify(item))
    },
    ////Zmeny obsahu
    //Auto Komplit
    querySearch1(queryString, cb) {
        var n1 = this.list.data.enum_n1
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch2(queryString, cb) {
        var n1 = this.list.data.enum_n2
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch3(queryString, cb) {
        var n1 = this.list.data.enum_n3
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },


      querySearch20(queryString, cb) {
        var n1 = this.list.data.enum_koef_prodej
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch19(queryString, cb) {
        var n1 = this.list.data.enum_koef_naklad
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch21(queryString, cb) {
        var n1 = this.list.data.enum_sirka
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch22(queryString, cb) {
        var n1 = this.list.data.enum_vyska
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch23(queryString, cb) {
        var n1 = this.list.data.enum_sirka_zbytek
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch24(queryString, cb) {
        var n1 = this.list.data.enum_vyska_zbytek
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          console.log(link)
          //return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item)
      },
      datum(value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }

    //Auto Komplit
  },
  beforeDestroy() {
    //alert('Destr')
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
</style>
