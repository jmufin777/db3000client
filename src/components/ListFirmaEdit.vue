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
    v-if="IsDialog1 && list && list.data && list.data.firma && list.data.firma[0]"
    >

<div slot="b1" class="green lighten-4 elevation-2" style="height:40px;font-size:18px">{{ stepInfo}}</div>

<div slot="a1" style="height:40px;font-size:18px;" class="px-2 green lighten-4 elevation-2" >
{{ ((isCopy ==false )?'Zmena':'Nova polozka ') +' ' + list.data.firma[0].nazev  }}
</div>
<div slot="c1" style="height:40px;font-size:18px" class="green lighten-4 elevation-2">
      <el-button v-if="isCopy == false " type="primary" id="btn_user_new_submit8310" @click="submitForm('formnew')" size="mini"> Novy Upravou</el-button>
      <el-button v-if="isCopy" type="primary" id="btn_user_submit8310" @click="submitForm('form')" size="mini"
        >Vlozit </el-button>
       <el-button v-else type="primary" id="btn_user_submit8310" @click="submitForm('formstep0')" size="mini"
        >Ulozit</el-button>
      <el-button v-if="isCopy" @click="resetForm('form')" id="btn_cancel_submit8310" size="mini" class="blue white--text">Zrusit</el-button>
      <el-button v-else @click="resetForm('form')" id="btn_cancel_submit8310" size="mini" class="blue white--text">Zavrit</el-button>
</div>

 <el-row slot="b22" style="height:20px;font-size:14px;">

 <el-tabs v-model="step2" @tab-click="handleClick" class="mx-4">
        <el-tab-pane label=" Prehledy"  name="0"></el-tab-pane>
        <el-tab-pane label=" Adresy"  name="1"></el-tab-pane>
        <el-tab-pane label=" Kontakty "  name="2"></el-tab-pane>
        <el-tab-pane label=" Provozovny"  name="3" ></el-tab-pane>
        <el-tab-pane label=" Prace"  name="4" ></el-tab-pane>
        <el-tab-pane label=" Planovani "  name="5"></el-tab-pane>

      </el-tabs>
  </el-row>
  <span slot="a2" style="height:20px;font-size:18px">
      &nbsp;
  </span>
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

        <!-- Step: {{step2}} / {{ step }}  /{{ idefixThis }} -->


      </v-card-title>

       <v-window v-model="step">


      <form  id="form8310" ref="form3" :model="form3" label-width="70px" :label-position="labelPosition"
        class="demo-ruleForm is-success" >

<v-window-item :value="0">

        <v-card v-show="step2=='0'">
          <v-card-text class="mt-4">
         <el-row class="ma-2 mt-2" >
          <el-col :span="24" style="text-align:left;">Poznamky: {{list.data.firmanotice.length}}<hr></el-col>

<div style="width:100%;max-width:2000px;position:relative;height:510px">
<div style="width:100%;max-width:2000px;position:relative">

    <table style="width:100%;max-width:2000px" class="nb">
     <thead class="c-1 nb tdlr"><th style="width:10%" class="nb tdlr">Datum</th>
     <th class="nb tdlr" style="width:40%">Text</th>
     <th class="nb tdlr" style="width:10%">Zapsal</th>
     <th class="nb tdlr" style="width:5%;text-align:center;nb" colspan="1">
       <i class="el-icon-time" size="mini"></i>

     </th>
     <th  class="nb tdlr" style="width:14%;text-align:center">Kdy</th>
          <th  class="nb tdlr" style="width:15%">Osoba</th>
          <th  class="nb tdlr" style="width:5%">&nbsp;</th>

      </thead>
    </table>
</div>
<div style="width:100%;positon:relative;overflow:auto;height:80%;">
      <table style="width:100%;max-width:2000px">
      <thead  class="h-1 ">
       <th style="width:10%;">Datum</th>
       <th style="width:40%;">Text</th>
       <th style="width:10%;">Zapsal</th>
       <th style="width:5%;text-align:center;" colspan="1">

       </th>
       <th style="width:14%;text-align:center;">Kdy</th>
       <th style="width:15%">Osoba</th>
       <th style="width:5%">nbsp;</th>
      </thead>
    <tbody class="nb tdlr">

    <tr class="nb tdlr">
      <td >
        <el-date-picker
           class="nb tdlr"
          format="dd.MM"
          value-format="yyyy-MM-dd HH:mm"
          size="mini"  type="date" align="right" style="width:100%;border:none"
          v-model="firmanotice.datum "
          readonly
          >
        </el-date-picker>

        </td>
      <td  class="nb tdlr">
        <el-input type="textarea" v-model="firmanotice.txt" rows="1" autosize class="nb" placeholder="Zde vlozte poznamku">
        </el-input>
      </td>
      <td  class="nb tdlr pl-2">{{user}}</td>
      <td class="c-1 pt-2 nb" >
        <input size="mini" style="height:20px;width:20px" v-model="firmanotice.pripominka" type="checkbox" @change="changePripominka" name="Pripominka" value="true"  :checked="(firmanotice.pripominka)">
       </td><td  class="nb tdlr">
          <el-date-picker
           class="nb tdlr"
          format="dd.MM HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          v-if="firmanotice.pripominka" v-model="firmanotice.kdy" size="mini"  type="datetime" align="right" style="width:100%" ></el-date-picker>
          <el-date-picker v-else  v-model="firmanotice.kdy" size="mini"  disabled type="datetime" align="right" style="width:100%" ></el-date-picker>
      </td>
       <td  class="nb tdlr">
        <el-select v-model="firmanotice.idefix_osoba"
        default-first-option

         size="mini"  class="pt-0 pl-1">
            <el-option
            v-for="item8 in list.data.enumosoba"
            :key="item8.idefix"
            :label="item8.nazev"
            :value="item8.idefix*1"
           >{{item8.nazev}} </el-option>
       </el-select>
      </td>
      <td style="width:5%;text-align:left" class="tdlr px-2">
        <button  type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertNotice" ><i class="el-icon-plus" size="mini"></i></button>
      </td>
    </tr>
    <tr v-for="(notice,inotice) in list.data.firmanotice" :key="inotice"  class="nb "

    >
      <td class="nb pt-1 "
      >
       <el-date-picker
          class="h-100 "
          format="dd.MM"
          value-format="yyyy-MM-dd HH:mm"
          size="mini"  type="date" align="right" style="width:100%;border:none"
          v-model="notice.datum"
          readonly
          ></el-date-picker>
        </td>
        <td v-if="notice.isedit" style="text-align:left"
          class="tdlr"
        >
          <el-input
          v-model="notice.txt" type="textarea" rows="1" autosize style="border:none; background-color:green"
          ></el-input>
          </td>
         <td
          class="tdlr pl-2"

         v-else >{{ notice.txt }} <span class="green--text">{{ notice.txt2 }}</span></td>
          <td  style="text-align:left" class="pl-2 tdlr"

          >{{notice.zkratka_login}}</td>
      <td class="c-1 pt-1 tdlr"

      >
        <input size="mini" style="height:20px;width:20px"
        v-model="notice.pripominka" type="checkbox"
        @change="changePripominka(notice)" name="Pripominka" value="true"  :checked="(notice.pripominka)"

        >
      </td><td class="c-1 tdlr pt-1 pb-1" >
         <el-date-picker
          format="dd.MM HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          time-arrow-control

         v-if="notice.pripominka" v-model="notice.kdy" size="mini"  type="datetime" align="right" style="width:100%"></el-date-picker>
         <el-date-picker
          format="dd.MM HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          v-else size="mini" disabled v-model="notice.kdy" type="datetime" align="right" style="width:100%"></el-date-picker>
      </td>
      <td class="tdlr">
        <el-select v-model="notice.idefix_osoba"
        default-first-option

         size="mini"  class="pt-0 pl-1">
            <el-option
            v-for="item8 in list.data.enumosoba"
            :key="item8.idefix"
            :label="item8.nazev"
            :value="item8.idefix"
           >{{item8.nazev}} </el-option>
       </el-select>
      </td>
       <td style="width:5%;text-align:left" class="tdlr px-2">
        <button  v-if="notice.isedit" type="button" style="width:100%;height:26px" class="pl-0 info elevation-3"  @click="editNotice(notice)"
        ><i class="el-icon-circle-check-outline" size="mini"></i></button>
        <span v-else>&nbsp;</span>
      </td>

    </tr>
    </tbody>
    </table>
 </div>
</div>

         </el-row>


         </v-card-text>
        </v-card>
</v-window-item>
  <v-window-item :value="1">

        <v-card v-show="step2=='1'"><v-card-text>


    <el-row class="ma-1">
     <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >

    <el-row class="ma-2">
      <el-col :span="24"><hr></el-col>
    </el-row>
    <el-row class="ma-2">
      <el-col :span="10" style="text-align:left">
       <el-input v-model="list.data.firma[0].nazev" size="mini"  style="width:97%; ">
        <template slot="prepend">Nazev</template>
       </el-input>
    </el-col>

     <el-col :span="5">
     <el-input  v-model="list.data.firma[0].ico" size="mini"  style="width:98%">
        <el-button slot="prepend"  style="color:white" size="mini" type="primary" v-bind:class="{'success': IsIco==1,'info': IsIco==0, 'warning': IsIco==2 }" class="elevation-15" @click="firma_ares(list.data.firma[0].ico)" icon="el-icon-search" >Ico:</el-button>
     </el-input>
     </el-col>

     <el-col :span="5">
     <el-input v-model="list.data.firma[0].dic" size="mini"  style="width:95%">
       <template slot="prepend">DIC</template>
     </el-input>
     </el-col>
    </el-row>
    <el-row class="ma-2">
        <el-col :span="10">
          <el-input v-model="list.data.firma[0].ulice" size="mini"  style="width:100%">
            <template slot="prepend">
              <b>Sidlo&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
              Ulice</template>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-input v-model="list.data.firma[0].obec" size="mini"  style="width:95%">
              <template slot="prepend">Obec</template>
           </el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="list.data.firma[0].psc" size="mini"  style="width:95%">
              <template slot="prepend">Psc</template>
           </el-input>
        </el-col>
        <el-col :span="1">
        <el-button size ="mini" @click="firma_copy" type="primary" class="elevation-15" >= </el-button>
        </el-col>
    </el-row>

    <el-row class="ma-2">
      <el-col :span="2" > </el-col>

        <el-col :span="10">
          <el-input v-model="list.data.firma[0].ulice2" size="mini"  style="width:100%">
            <template slot="prepend" >
            <b>Kancelar :</b>&nbsp;
            Ulice
            </template>
          </el-input>
        </el-col>

        <el-col :span="7">
          <el-input v-model="list.data.firma[0].obec2" size="mini"  style="width:95%">
              <template slot="prepend">Obec</template>
           </el-input>
        </el-col>

        <el-col :span="4">
          <el-input v-model="list.data.firma[0].psc2" size="mini"  style="width:95%">
              <template slot="prepend">Psc</template>
           </el-input>
        </el-col>
    </el-row>
    <el-row class="ma-2">


        <el-col :span="6">
          <el-input v-model="list.data.firma[0].tel" size="mini"  style="width:100%" suffix-icon="el-icon-phone">
            <template slot="prepend">Mobil</template>
          </el-input>
        </el-col>

        <el-col :span="12">
          <el-input v-model="list.data.firma[0].tel2" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
            <template slot="prepend">Tel</template>
          </el-input>
        </el-col>
        </el-row>
        <el-row class="ma-2">

        <el-col :span="9">
          <el-input v-model="list.data.firma[0].mail" size="mini"  style="width:100%" suffix-icon="el-icon-message">
            <template slot="prepend" >Email</template>
          </el-input>
        </el-col>

        <el-col :span="12">
          <el-input v-model="list.data.firma[0].www" size="mini"  style="width:95%" type="url">
             <template slot="prepend">Http://</template>
          </el-input>
        </el-col>

    </el-row>

<el-row><el-col :span="24">

<el-row class="ma-2">
       <el-col :span="3" >
         <div class="mini el-input-group__prepend" style="height:28px;background;width:550px">Splatnost</div>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3" style="text-align:left">
          <el-input-number v-model="list.data.firma[0].splatnost" size="mini"  controls-position="right"  >
          </el-input-number>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
       <el-col :span="4">
         <div class="el-input-group__prepend" style="height:28px;background;width:550px">Hotovost</div>
         </el-col>

        <el-col :span="2">
          <input size="mini" style="height:28px;width:28px" type="checkbox" @change="changeHotovost" name="Hotovost" value="1"  :checked="(list.data.firma[0].hotovost==1)?true:false">
        </el-col>
        <el-col :span="4">
                   <div class="el-input-group__prepend" style="height:28px;background;width:550px">Materialy</div>
          </el-col>

        <el-col :span="2">
          <input style="height:28px;width:28px" type="checkbox" @change="changeMat" name="MatDodavatel" value="1"  :checked="(list.data.firma[0].mat==1)?true:false">
        </el-col>

    </el-row>
    <el-row class="ma-2">

        <el-col :span="4">
         <div class="el-input-group__prepend" style="height:28px;background;width:550px">Vypis dne</div>
         </el-col>
        <el-col :span="7" style="text-align:left">
          <el-date-picker format="dd.MM.yyyy" suffix-icon="el-icon-date" readonly v-model="list.data.firma[0].datum_ares" size="mini" disabled style="width:90%">
             <template slot="prepend">Vypis dne</template>
          </el-date-picker>
        </el-col>

        <el-col :span="11">
            <el-input readonly disabled v-model="list.data.firma[0].aktivni" size="mini"  style="width:100%">
             <template slot="prepend">Stav v registru</template>

            </el-input>
        </el-col>
    </el-row>
    </el-col>



 </el-row>





     </el-col>
    </el-row>

    </v-card-text></v-card>
    </v-window-item>

     <v-window-item :value="2">
        <v-card v-show="step2=='2'">
          <v-card-text>
            <el-row class="ma-4">
                 <el-col :span="24">
                   <el-row class="ma-1">
                     <!-- @end="chooseItemKontakt" -->

                <div style="width:100%;max-width:2000px;position:relative;">
                <div style="width:100%;max-width:2000px;position:relative">
                  <table style="width:100%;max-width:2000px" class="nb">
                        <thead class="c-1  tdline">

                         <th class="tdline" style="width:10%">Jmeno</th>
                         <th class="tdline" style="width:15%">Prijmeni</th>
                         <th class="tdline" style="width:25%" >Mail</th>
                         <th class="tdline" style="width:15%">Tel</th>
                         <th class="tdline" style="width:15%">Funkce</th>
                         <th class="tdline" style="width:7%">Obrat</th>
                         <th class="tdline" style="width:7%">Zakazky</th>
                         <th class="tdline" tyle="width:5%">
                           <!-- <el-checkbox border v-model="kontaktAktivni" size="mini">Aktivni</el-checkbox> -->
                           <button  type="button" style="width:22px;height:22px; font-color:black" class="pl-0 info elevation-3"  @click="kontaktEditInsert=!kontaktEditInsert ; kontaktEdit=(kontaktEditInsert)?false:kontaktEdit ;" ><i class="el-icon-plus" size="mini"></i></button>
                         </th>
                       </thead>
                     </table>
                </div>

               <div style="width:100%;positon:relative;overflow:auto;height:80%;">
                     <table style="width:100%">
                       <thead class="h-1 " style="height:1px">
                         <th  style="width:10%">Jmeno</th>
                         <th  style="width:15%">Prijmeni</th>
                         <th  style="width:25%" >Mail</th>
                         <th  style="width:15%">Tel</th>
                         <th  style="width:15%">Funkce</th>

                         <th  style="width:7%">Obrat</th>
                         <th  style="width:7%">Zak</th>
                         <th  tyle="width:5%">
                           &nbsp;
                         </th>

                       </thead>
                       <tbody class="nb tdlr">
                        <!-- <draggable v-model="list.data.firmaosoba"  :options="{group: 'peoplex' }" @start="drag=true"
                          style="width:100%"
                        > -->
                       <tr v-for="(clovek, i) in list.data.firmaosoba" :key="i"
                         v-if="clovek.aktivni==true || kontaktAktivni == true "
                         class="tdline nb tdlr"
                         v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                       >
                         <td class="tdline "
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                         >{{clovek.jmeno}}</td>
                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline"
                         > {{clovek.prijmeni}}</td>
                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline"
                         >{{clovek.mail}}</td>
                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline"

                         >{{clovek.tel}}</td>
                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline"

                          >{{clovek.funkce}}</td>

                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline c-1"
                         >11</td>

                         <td
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline c-1"
                         >10</td>
                         <td
                           v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline c-1"
                          style="text-align:center">
                           <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="editKontakt(clovek)" ><i class="el-icon-edit" size="mini"></i></button>
                           <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="deleteKontakt(clovek)" ><i class="el-icon-delete" size="mini"></i></button>
                         </td>

                       </tr>
                       <!-- </draggable> -->
                      </tbody>
                     </table>
                </div>
                </div>
                   </el-row>
                 </el-col>
             </el-row>

            <el-row class="ma-1" v-if="kontaktEdit || list.data.firmaosoba.length == 0 || kontaktEditInsert">
              <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >
                <el-row class="ma-1">
                  <el-col :span="2">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Titul</div>
                  </el-col>
                  <el-col :span="2">
                    <el-input v-model="firmaosoba.titul" size="mini"  style="width:100%" >
                      <!-- <template slot="prepend">Titul</template> -->
                   </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="firmaosoba.jmeno" size="mini"  style="width:95%" >
                      <template slot="prepend">Jmeno</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.prijmeni" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Prijmeni</template>
                   </el-input>
                  </el-col>
                 <el-col :span="2">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Titul2</div>
                  </el-col>
                 <el-col :span="2">
                    <el-input v-model="firmaosoba.titulza" size="mini"  style="width:95%" >
                      <!-- <template slot="prepend">Titul2</template> -->
                   </el-input>
                  </el-col>
                 <el-col :span="2" >
                   <button v-if="kontaktEditInsert" type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertKontakt(0)" ><i class="el-icon-plus" size="mini"></i></button>
                   <button v-if="kontaktEdit" type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertKontakt(1)" ><i class="el-icon-edit" size="mini"></i></button>
                 </el-col>

                </el-row>
                <el-row class="ma-2">

                    <el-col :span="2">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Oddeleni</div>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="firmaosoba.oddeleni" size="mini"  style="width:100%" >
                      <!-- <template slot="prepend">Oddeleni</template> -->
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.funkce" size="mini"  style="width:95%" >
                      <template slot="prepend">Funkce</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.tel" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Mobil</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.tel2" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Tel</template>
                   </el-input>
                  </el-col>
                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.mail" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend">Email</template>
                   </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.mail_fakt" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Fakturacni</template>
                   </el-input>
                  </el-col>




                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.ulice" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend" >

            Ulice:
            </template>

                   </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.obec" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Obec</template>
                   </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="firmaosoba.psc" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Psc</template>
                   </el-input>
                  </el-col>

               </el-row>
               <el-row class="ma-2">
                   <el-col :span="3">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Narozeniny</div>
                  </el-col>
                  <el-col :span="4">
                    <el-date-picker v-model="firmaosoba.narozeniny" size="mini"  type="date" align="right" style="width:100%"
                         format="dd.MM.yyyy"
                         value-format="yyyyMMdd"
                    >
                  </el-date-picker>
                  </el-col>
                  <el-col :span="2">
                  <div class="el-input-group__prepend" style="height:28px;background;width:550px">Aktivni</div>
         </el-col>

        <el-col :span="2">
          <input size="mini" style="height:28px;width:28px" v-model="firmaosoba.aktivni" type="checkbox" @change="changeAktivniOsoba" name="Hotovost" value="1"  :checked="list.data.firmaosoba.aktivni==true">
        </el-col>
         <el-col :span="3">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Poznamky</div>
                  </el-col>
                  <el-col :span="8" class="ml-1">
                    <el-input v-model="firmaosoba.poznamka" size="mini" autosize type="textarea" style="width:100%;border: solid 1px #cccccc" suffix-icon="el-icon-message">
                      <template slot="prepend">Poznamky</template>
                   </el-input>
                  </el-col>

               </el-row>


              </el-col>
            </el-row>


          </v-card-text>
        </v-card>
     </v-window-item>

         <v-window-item :value="3">
        <v-card v-show="step2=='3'">
          <v-card-text>
            <el-row class="ma-4">
                 <el-col :span="24">
                   <el-row class="ma-1">
                     <!-- @end="chooseItemKontakt" -->
                     <table style="width:100%">
                       <thead>
                         <th style="width:10%">Nazev</th>
                         <th style="width:20%">Adresa</th>
                         <th style="width:20%">Jmeno</th>
                         <th style="width:20%">Mail</th>
                         <th style="width:10%">Tel</th>
                         <th style="width:10%">Funkce</th>
                         <th style="width:5%">
                           <!-- <el-checkbox border v-model="provozovnaAktivni" size="mini">Aktivni</el-checkbox> -->
                           &nbsp;
                           <button  type="button" style="width:22px%;height:22px" class="pl-0 info elevation-3"  @click="provozovnaEditInsert=!provozovnaEditInsert ; provozovnaEdit=(provozovnaEditInsert)?false:provozovnaEdit ;" ><i class="el-icon-plus" size="mini"></i></button>

                         </th>
                       </thead>
                     </table>
                     <table style="width:100%">

                      <tbody  style="width:100%">
                        <draggable v-model="list.data.firmaprovozovna"  :options="{group: 'peoplex' }" @start="drag=true"
                          style="width:100%"
                        >
                       <tr v-for="(provozovnax, i) in list.data.firmaprovozovna" :key="i"
                       v-if="provozovnax.aktivni==true || provozovnaAktivni == false "

                       >
                         <td style="width:10%">{{provozovnax.nazev}}</td>
                         <td style="width:20%" >{{provozovnax.ulice + ', '+ provozovnax.psc+ ' ' +provozovnax.obec  }}</td>

                         <td style="width:20%">{{provozovnax.jmeno + ' '+ provozovnax.prijmeni}} </td>

                         <td style="width:20%">{{provozovnax.mail}}</td>
                         <td style="width:10%">{{provozovnax.tel}}</td>
                         <td style="width:10%">{{provozovnax.funkce}}</td>
                         <td style="width:5%;text-align:center"
                          v-bind:class="{ 'prvni' : ( provozovnax.aktivni==true && i %2 == 0) , 'prvni' : ( provozovnax.aktivni==true && i %2 != 0) , 'seda' : ( provozovnax.aktivni==false )  }"
                          >
                           <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="editProvozovna(provozovnax)" ><i class="el-icon-edit" size="mini"></i></button>
                           <button  type="button" style="height:22px;width:22px" class="pl-0 elevation-3"  @click="deleteProvozovna(provozovnax)" ><i class="el-icon-delete" size="mini"></i></button>
                         </td>
                       </tr>
                       </draggable>
                      </tbody>
                     </table>
                   </el-row>
                 </el-col>
             </el-row>

            <el-row class="ma-1" v-if="provozovnaEdit || list.data.firmaprovozovna.length == 0 || provozovnaEditInsert">
              <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >
                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaprovozovna.nazev" size="mini"  style="width:100%" >
                      <template slot="prepend">Nazev</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.jmeno" size="mini"  style="width:95%" >
                      <template slot="prepend">Jmeno</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.prijmeni" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Prijmeni</template>
                   </el-input>
                  </el-col>
                 <!-- <el-col :span="4">
                    <el-input v-model="firmaprovozovna.titulza" size="mini"  style="width:95%" >
                      <template slot="prepend">Titul2</template>
                   </el-input>
                  </el-col> -->
                 <el-col :span="2" >
                   <button v-if="provozovnaEditInsert || list.data.firmaprovozovna.length == 0 " type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertProvozovna(0)" >A<i class="el-icon-plus" size="mini"></i></button>
                   <button v-if="provozovnaEdit" type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertProvozovna(1)" ><i class="el-icon-edit" size="mini">B</i></button>
                 </el-col>

                </el-row>
                <el-row class="ma-2">
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.oddeleni" size="mini"  style="width:100%" >
                      <template slot="prepend">Oddeleni</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.funkce" size="mini"  style="width:95%" >
                      <template slot="prepend">Funkce</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.tel" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Mobil</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaprovozovna.tel2" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Tel</template>
                   </el-input>
                  </el-col>
                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaprovozovna.mail" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend">Email</template>
                   </el-input>
                  </el-col>





                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaprovozovna.ulice" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend" >

            Ulice
            </template>

                   </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaprovozovna.obec" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Obec</template>
                   </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="firmaprovozovna.psc" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Psc</template>
                   </el-input>
                  </el-col>

               </el-row>
               <el-row class="ma-2">


                  <el-col :span="2">
                  <div class="el-input-group__prepend" style="height:28px;background;width:550px">Aktivni</div>
         </el-col>

        <el-col :span="2">
          <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.aktivni" type="checkbox" @change="changeAktivniOsoba" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.aktivni==true">
        </el-col>
         <el-col :span="3">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Poznamky</div>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaprovozovna.poznamka" size="mini"  type="textarea" style="width:100%;border:1px" suffix-icon="el-icon-message">
                      <template slot="prepend">Poznamky</template>
                   </el-input>
                  </el-col>

               </el-row>
               <el-row class="ma-2">
                 <el-col :span="5">
                    <el-input v-model="firmaprovozovna.otevreno_od " size="mini"  type="text" style="width:100%" suffix-icon="el-icon-time">
                      <template slot="prepend">Otevreno Od: </template>
                   </el-input>
                 </el-col>
                 <el-col :span="4">
                    <el-input v-model="firmaprovozovna.otevreno_do " size="mini"  type="text" style="width:100%" suffix-icon="el-icon-time">
                      <template slot="prepend">Do: </template>
                   </el-input>
                 </el-col>

                 <el-col :span="1">
                    <div  class="prepend2">Po</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.po" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.po==true">
                </el-col>
                <el-col :span="1">
                    <div  class="prepend2">Ut</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.ut" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.ut==true">
                </el-col>
               <el-col :span="1">
                    <div  class="prepend2">St</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.st" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.st==true">
                </el-col>
                <el-col :span="1">
                    <div  class="prepend2">Ct</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.ct" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.ct==true">
                </el-col>
                <el-col :span="1">
                    <div  class="prepend2">Pa</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.pa" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.pa==true">
                </el-col>
                <el-col :span="1">
                    <div  class="prepend2">So</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.so" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.so==true">
                </el-col>
                <el-col :span="1">
                    <div  class="prepend2">Ne</div>
                </el-col>
                <el-col :span="1">
                  <input size="mini" style="height:28px;width:28px" v-model="firmaprovozovna.ne" type="checkbox" @change="changeZbytek" name="Hotovost" value="1"  :checked="list.data.firmaprovozovna.ne==true">
                </el-col>
               </el-row>
              </el-col>
            </el-row>
          </v-card-text>
        </v-card>
     </v-window-item>

     <v-window-item :value="4">
        <v-card v-show="step2=='4'">
          <v-card-text>
            <el-row class="ma-2 mt-4 pt-4">
             <el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:90%;color:yellow" class="info elevation-5">Prace</el-button>
             </el-row>
            <el-row class="ma-2">
              <el-col :span="24">
                <el-row class="ma-2 mt-4">
                  <el-col :span="20">
            <!-- <el-transfer
              v-model="value_vzor_prava"
              :data="data_vzor_leva"
              :titles="['Pridelene', 'Prace']"
              >
          </el-transfer> -->

          {{ list.data.firmaprace }} zbytek {{ list.data.enumprace[0] }}
          {{ checkedLeft }} / {{ checkedRight}}
          <el-row>
            <el-col :span="7"> <!-- Table 1 //-->
             <ta-ble :list="list.data.enumprace" :h="'300px;width:200px'">
            <thead slot="head" >
              <tr>
              <th>
                <el-checkbox  @change="CheckAllLeft" >
                </el-checkbox>
              </th>
              <th>Prace</th>
                <th>
                  {{list.data.enumprace.length}} / {{list.data.firmaprace.length}}
                </th>
              </tr>
                <tr>
                <th width="100%" colspan="3" style="background:white" class="tdl">
                  <el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchLeft" placeholder="Vse" ></el-input>
                </th>
                </tr>
            </thead>
            <tbody slot="body" >
              <thead slot="head1" class="h-1" colspan="2"><th width="100%">A</th></thead>
              <tr v-for="(itemleft,ileft) in list.data.enumprace.filter(word => searchLeft=='' || (word.label+'').match(RegExp(searchLeft,'i')))" :key="ileft"
              >
                <td class="tdl" style="width:25%" align="center"
                >
                  <input style="height:14px;width:14px" type="checkbox" :id="'check_left_'+itemleft['key']" :value="itemleft['key']" @change="checkLeft(ileft)">
                </td>
                <td  class="tdl" style="width:75%"
                >
                  {{ itemleft.label}}
                </td>

              </tr>
            </tbody>
          </ta-ble>
            </el-col>
           <el-col :span="3" class="mt-4 ml-0">
             <div class="el-transfer__buttons" style="position:relative;left:-10px">
              <button  type="button" @click="moveLeft" class="el-button el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-left"></i><!----></span></button>
              <button  type="button" @click="moveRight" class="el-button el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-right"></i><!----></span></button>
            </div>
           </el-col>
            <el-col :span="7"> <!-- Table 2 //-->
          <ta-ble :list="list.data.firmaprace" :h="'300px;width:200px'">
            <thead slot="head" >
              <tr>
              <th>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkRight" @change="CheckAllRight" >
                </el-checkbox>
              </th>
              <th>Prideleno</th>
                <th>
                  {{list.data.enumprace.length}}
                </th>
              </tr>
                <tr>
                <th width="100%" colspan="3" style="background:white" class="tdl">
                  <el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchRight" placeholder="Vse" ></el-input>
                </th>
                </tr>
            </thead>
            <tbody slot="body" >
              <thead slot="head1" class="h-1" colspan="2"><th width="100%">A</th></thead>
              <tr v-for="(itemright,iright) in list.data.firmaprace.filter(word => searchRight=='' || (word.label+'').match(RegExp(searchRight,'i')))" :key="iright"
              >
                <td class="tdl" style="width:25%" align="center"
                >
                  <input style="height:14px;width:14px" type="checkbox" :id="'check_right_'+itemright['key']" :value="itemright['key']" @change="checkRight(iright)">
                </td>
                <td  class="tdl" style="width:75%"
                >
                  {{ itemright.label}}
                </td>

              </tr>
            </tbody>
          </ta-ble>
            </el-col>
          </el-row>



          </el-col>
            </el-row>
              </el-col>
            </el-row>
          </v-card-text>
        </v-card>
     </v-window-item>
     <v-window-item :value="5">
        <v-card v-show="step2=='5'">
          <v-card-text>
            {{ stepInfo}}
          </v-card-text>
        </v-card>
     </v-window-item>



        </form>
      </v-window>

      <v-divider></v-divider>
<!--
      <v-card-actions>
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

      </v-card-actions>
   //-->
    </v-card>



</div>
<list2b-edit></list2b-edit>
 </win-dow>


</template>
<script>

import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListFirma from '@/services/ListFirmaService'
import Ico from '@/services/IcoService'
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
    const generateData = _ => {
        const data_vzor_leva = [];
        for (let i = 1; i <= 15; i++) {
          data_vzor_leva.push({
            key: i,
            label: `Option ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data_vzor_leva;
      };

    return {
      search: '',
      isIndeterminate: true,
      searchLeft:'',
      searchRight:'',
      checkedLeft: [],
      checkedRight: [],
      checkAll: '',




      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 50,
      rec: {},
      length: 4,
      window: 0,
      step: 0,
      step2: "0",
      Akce: '',
      //stepInfo: 'Resim co jako',
      idefixThis: 0,
      typKalkulace: 'N',
      list:[],
      list0:{},
      labelPosition: 'right',
      firmaNazev: '',
      firmaAres: [],


      kontaktEdit: false,
      kontaktEditInsert: false,
      kontaktAktivni: true,

      provozovnaEdit: false,
      provozovnaEditInsert: false,
      provozovnaAktivni: false,

      firmaosobapomucka: [
        {jmeno: 'Prvni',prijmeni: 'Clovek'},
        {jmeno: 'Druhy',prijmeni: 'Clovek'},
        {jmeno: 'Treti',prijmeni: 'Clovek'},
        {jmeno: 'Ctrvrty',prijmeni: 'Clovek'},
        {jmeno: 'Paty',prijmeni: 'Clovek'},
        {jmeno: 'Sesty',prijmeni: 'Clovek'},
        {jmeno: 'Sedmy',prijmeni: 'Clovek'},
        {jmeno: 'Osmy ',prijmeni: 'Clovek'},
        {jmeno: 'Devaty',prijmeni: 'Clovek'},
        {jmeno: 'Desaty',prijmeni: 'Clovek'},
        ],

      firma: {
        idefix: 0,
         kod:  0,
         ico:'',
         dic: '',
         nazev: '',
         ulice: '',
         obec: '',
         psc: '',
         ulice0: '',
         obec0: '',
         cp1: '',
         cp2: '',

         nazev2: '',
         ulice2: '',
         obec2: '',
         psc2: '',
         tel: '',
         tel2: '',
         mail: '',
         www: '',
         poznamka: '',
         mat: 0,
         splatnost: 0,
         hotovost: 0,
         aktivni: ''
      },

      firmaosoba: {
        idefix: 0,
        idefix_firma: 0,
        kod: 0,
        jmeno: '',
        prijmeni: '',
        titul: '',
        titulza: '',
        funkce: '',
        oddeleni: '',
        prioritni: false,
        tel: '',
        tel2: '',
        tel3: '',
        mail: '',
        www: '',
        poznamka: '',
        narozeniny: null,
        mail_fakt: '',
        psc: '',
        obec: '',
        ulice: '',
        aktivni: true


      },

      firmaprovozovna: {
        idefix: 0,
        idefix_firma: 0,
        kod: 0,
        nazev: '',
        jmeno: '',
        prijmeni: '',
        ulice: '',
        obec: '',
        psc: '',
        titul: '',
        titulza: '',
        funkce: '',
        oddeleni: '',
        prioritni: false,
        aktivni: true,
        tel: '',
        tel2: '',
        tel3: '',
        mail: '',
        www: '',
        poznamka: '',
        otevreno_od: '08:00',
        otevreno_do: '18:00',
        po: true,
        ut: true,
        st: true,
        ct: true,
        pa: true,
        so: false,
        ne: false,
      },

    firmanotice: {
        idefix: 0,
        idefix_firma: 0,
        idefix_osoba: 0,
        txt: '',
        txt2: '', //Result
        isedit: true,
        user_txt: '',
        datum: f.dnes(),
        kdy: null,
        pripominka: false

      },


      //
      //

      // links: [],
      form3: {

      },
      lastTime: 0, //posledni cas prichozi udalosti v int
      IsIco: 0,

      //Vzor

      //  data_vzor_leva: generateData()
       data_vzor_leva:  generateData(),
       value_vzor_prava: [1,2],

       //data_vzor_leva: ListFirma.one(this.user,this.idefixThis, 104,''),
      //  data_vzor_leva: [
      //    {key: 1, label:'aa'},
      //    {key: 2, label:'bb'}
      //  ],
       //firmapracecopy: [10359],
       //firmaenumprace: []


      //Vzor


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

    //this.generateData()
    //this.data_vzor_leva=[1,2,3,4,5,6]
    //this.value_vzor_prava= [1,2,11]


  },
  created () {
    var self=this

    eventBus.$on('edit_stroj', ( dlgPar ) => {
      self.citac++
      self.getDataEnum()

    })
      eventBus.$on('dlg8310', ( dlgPar ) => {
        // alert('EVENT' + JSON.stringify(dlgPar ))
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
              self.step=4
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
      if (this.step>5) {
        this.step=0
      }
      if (this.step<0) {
        this.step=5
      }
    }



  } ,

  methods: {


    checkLeft(ir) {
      const self  = this
      var neco =''
      var nVal= self.list.data.enumprace[ir]['key']
      var objneco
      neco='check_left_'+self.list.data.enumprace[ir]['key']
      if (document.getElementById(neco)){
        objneco = document.getElementById(neco)
        if (objneco.checked){
          self.checkedLeft.push(objneco.value)
        } else {

          self.checkedLeft.forEach((el, idx2) =>{
            if (el == nVal ){
              self.checkedLeft.splice(idx2,1)
              console.log('Left', self.checkedLeft)
              return
            }
          })
        }
    }
       console.log(self.checkedLeft)



      //id="'check_left_'+itemleft['idefix']"

    },

    checkRight(irow) {

    },

    moveLeft(irow){
    alert('doleva')


    },

    moveRight(){
    alert('doprava')
    },


    CheckAllLeft(val) {
      const self = this

      var neco=''

      self.list.data.enumprace.forEach((el,idx) => {
        neco='check_left_'+el['key']
        console.log(neco)
        if (document.getElementById(neco)){
          if (val){
            document.getElementById(neco).checked=true
            self.checkedLeft.push(document.getElementById(neco).value)
            console.log(self.checkedLeft.length)
          } else {
            document.getElementById(neco).checked=false
          }
        }
      })
        //self.isIndeterminate = false;
        if (!val){
          self.checkedLeft=[];
        }
  return true;
},

CheckAllRight(val) {
      const self = this

      var neco=''

      self.list.data.firmaprace.forEach((el,idx) => {
        neco='check_right_'+el['key']
        console.log(neco)
        if (document.getElementById(neco)){
          if (val){
            document.getElementById(neco).checked=true
            self.checkedRight.push(document.getElementById(neco).value)
          } else {
            document.getElementById(neco).checked=false
          }
        }
      })
        //self.isIndeterminate = false;
        if (!val){
          self.checkedRight=[];
        }
  return true;
},


    e_prace() {
      return [10437]
    },

renderFunc(h, option) {
  const self = this

          return <span>{ option.key } - { option.label }</span>;
        },
    filterPrace(query, item) {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        },

    handleClick(tab,x) {
      this.step =   (tab.name * 1)
      //alert(tab.name)

    },
    changeHotovost(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].hotovost = 1

      } else {
        self.list.data.firma[0].hotovost = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },
    changeZbytek(e){

    },
    changeAktivniOsoba(e) {

      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].hotovost = true

      } else {
        self.list.data.firma[0].hotovost = false
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },

     jarda () {
       alert('jarda')
     },
     changePripominka(e) {
       // alert(e.isedit)
       return

       const self = this

       if (e.isedit == true) {



          this.editNotice(e)
       }
       if (e.isedit == false) {
         if (e.pripominka == true) {

         try {
          this.$notify( {
            title: 'Upozorneni',
            message: 'Nelze aktivovat pripominku, jenz jiz vyprsela ',
            type: 'warning',
            offset: 100

            // duration: 0
          })
          e.pripominka =  !e.pripominka
          }  catch(e) {
            console.log('Error pripominka')
          }
          return
         }

          //Prompt

          this.$prompt('Prosim doplnte vysvetleni', '', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Zrusit',
          //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputPattern: /.{1,100}/ ,
          inputValue: e.txt2,

          inputErrorMessage: 'Text nema byt prazdny, zmena nebude provedena'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'Doplnen text:' + value
          });
          e.txt2 = value

          this.editNotice(e)
        }).catch(() => {
          e.pripominka =  !e.pripominka
          this.$notify({
            type: 'info',
            message: 'Pripominka zistava v platnosti'

          });
        });

          //Prompt

         //
       //  this.editNotice(e)
       }

       return


    },

     changeMat(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].mat = 1

      } else {
        self.list.data.firma[0].mat = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },
    chooseItemKontakt: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.firmaosoba.forEach((el,i) =>{
            this.list.data.firmaosoba[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },
    chooseItemCeny: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.firmaprovozovna.forEach((el,i) =>{
            this.list.data.firmaprovozovna[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },
    async firma_ares(ico) {
      this.firmaAres = (await Ico.all(this.user,ico))
      if (this.firmaAres.data.err) {
        alert(JSON.stringify(this.firmaAres.data.err))
        return
      } else {
        // alert(JSON.stringify(this.firmaAres.data))
        var str1=
        this.list.data.firma[0].dic
        + this.list.data.firma[0].nazev
        + this.list.data.firma[0].ulice
        + this.list.data.firma[0].obec
        + this.list.data.firma[0].psc


        var str2=
        this.firmaAres.data.dic
        +this.firmaAres.data.nazev
        +this.firmaAres.data.ulicecela
        +this.firmaAres.data.obec
        +this.firmaAres.data.psc


        if (str2 == str1 ) {
          // alert('stejne')

          this.IsIco = 1
        } else {

          if (str1=='' && str2.replace(/null/g,'')>''){
            this.IsIco = 1
// swagger

          } else {
            this.IsIco = 2

            if (!confirm('Udaje jsou zmeneny , pouzit?')) {
              return
            }

          }

        }

        this.list.data.firma[0].dic        = this.firmaAres.data.dic
        this.list.data.firma[0].nazev      = this.firmaAres.data.nazev
        this.list.data.firma[0].ulice      = this.firmaAres.data.ulicecela
        this.list.data.firma[0].obec       = this.firmaAres.data.obec
        this.list.data.firma[0].psc        = this.firmaAres.data.psc
        this.list.data.firma[0].aktivni    = this.firmaAres.data.aktivni
        this.list.data.firma[0].datum_ares = this.firmaAres.data.datumvypisu
      }

    },

    async editNotice(jPar){
      // return
      jPar.zobrazeno = 0
      const self = this
      var neco2 =  (await ListFirma.saveNotice(self.user,self.idefixThis,jPar,1011))
      var neco3 = (await ListFirma.one(this.user,self.idefixThis, 101,''))
      //console.log(JSON.stringify(jPar),'idefixThis: ', self.idefixThis)

      var neco4 = (await ListFirma.one(this.user,self.idefixThis, 1012,''))
      this.list.data.enumosoba = neco4.data.enumosoba
      //console.log(JSON.stringify(this.list.data.enumosoba) )
      return
    },
    async insertNotice() {
        var lAdd = true
        const self = this

      if (this.firmanotice.txt > ''){

        this.firmanotice.idefix_firma =this.idefixThis
        this.list.data.firmanotice.forEach((el,i) =>{
          if (el.txt == this.firmanotice.txt) {
            lAdd = false
            alert('Nemeli by jste pridavat uplne stejnou poznamku ke stejne firme')
          }
        } );
        if (lAdd == true) {
          let neco= this.firmanotice
          var neco2=  (await ListFirma.saveNotice(self.user,self.idefixThis,this.firmanotice,101))
          //return


  //        alert(this.list.data.strojmod.length)

          this.firmanotice.idefix = (this.list.data.firmanotice.length +10)*-1
          this.firmanotice.kod = (this.list.data.firmanotice.length +1)
          this.firmanotice.user_txt = this.user
          // this.firmanotice.datum =
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.firmanotice.push(neco)
          var newObj = f.cp(this.firmanotice)
          this.firmanotice = newObj
          this.firmanotice.txt = ''
          this.firmanotice.datum = this.dnes()
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 101,''))
          self.list.data.firmanotice = []
          self.list.data.firmanotice =neco3.data.firmanotice
          self.list.data.firmanotice.forEach(el => {
            el.datum  = f.datum2(el.datum)
          })
         var neco4 = (await ListFirma.one(this.user,self.idefixThis, 1012,''))
         this.list.data.enumosoba = neco4.data.enumosoba

          //alert(JSON.stringify(neco3.data.firmanotice))
          //alert('aaa')
        }

      }

    },

    async deleteKontakt(clovek) {
        const self = this

          var neco2=  (await ListFirma.saveOsoba(self.user,self.idefixThis,clovek,1022))
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 102,''))
          var neco4 = (await ListFirma.one(this.user,self.idefixThis, 1012,''))
          this.list.data.enumosoba = neco4.data.enumosoba
          self.list.data.firmaosoba = []
          self.list.data.firmaosoba =neco3.data.firmaosoba

    },
    async insertKontakt(nPar) {
        var lAdd = true
        const self = this
        //alert(this.firmaosoba.idefix)
        // alert(self.firmaosoba.aktivni)
        if (this.firmaosoba.prijmeni > ''){

        self.firmaosoba.idefix_firma =this.idefixThis
        if (nPar == 0){
        //alert(JSON.stringify(this.list.data.firmaosoba))
        this.list.data.firmaosoba.forEach((el,i) =>{
          if (el.prijmeni + el.jmeno == self.firmaosoba.prijmeni + self.firmaosoba.jmeno) {
            lAdd = false
            alert('Nemeli by jste pridavat uplne stejnou osobu kontaktni  ke stejne firme')
          }
        } );
        }
          // alert('iko 2')
        if (lAdd == true) {
          let neco= this.firmaosoba
          if (nPar ==0 ){
            var neco2=  (await ListFirma.saveOsoba(self.user,self.idefixThis,this.firmaosoba,102))
          }
          if (nPar ==1 ){
            var neco2=  (await ListFirma.saveOsoba(self.user,self.idefixThis,this.firmaosoba,1021))
          }



  //        alert(this.list.data.strojmod.length)
       if (nPar ==0 ){
          this.firmaosoba.idefix = (this.list.data.firmaosoba.length +10)*-1
          this.firmaosoba.kod = (this.list.data.firmaosoba.length +1)
          this.firmaosoba.user_txt = this.user
          // this.firmanotice.datum =
          // this.strojmod.prio = (this.list.data.strojmod.length +1)
          if (nPar ==0 ){
            this.list.data.firmaosoba.push(neco)
          }
          var newObj = f.cp(this.firmaosoba)
          this.firmaosoba = newObj
          this.firmaosoba.prijmeni = ''
          this.firmaosoba.jmeno = ''
          this.firmaosoba.mail = ''
          this.firmaosoba.funkce = ''
          this.firmaosoba.oddeleni = ''
          this.firmaosoba.narozeniny = null
       }
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 102,''))
          self.list.data.firmaosoba = []
          self.list.data.firmaosoba =neco3.data.firmaosoba

          var neco4 = (await ListFirma.one(this.user,self.idefixThis, 1012,''))
          this.list.data.enumosoba = neco4.data.enumosoba

          /*
          self.list.data.firmanotice.forEach(el => {
            el.datum  = f.datum2(el.datum)
          })
          */

          //alert(JSON.stringify(neco3.data.firmanotice))
          //alert('aaa')


        }

      }

    },

    async editKontakt(aPar) {
      this.firmaosoba = f.cp(aPar)
      this.kontaktEdit = true
      this.kontaktEditInsert = false


    },
    async savePrace(value,direction,movedKeys)   {
        const self = this
        console.log(value, direction, movedKeys);
      alert(JSON.stringify(self.list.data.firmaprace))
          var neco2  =  ( await ListFirma.savePrace(self.user,self.idefixThis,self.list.data.firmaprace,104))

          var neco3  =  ( await ListFirma.one(this.user,self.idefixThis, 1041,''))

          self.list.data.firmaprace =neco2.data.firmaprace
          self.list.data.enumprace =neco3.data.enumprace

          alert('ahoj'+JSON.stringify(self.firmaprace))



          // self.firmapracecopy = [10156, 10156, 10152, 9015, 10287 ]

    },
    //Provozovny
    async deleteProvozovna(clovek) {
          const self = this

          var neco2  =  ( await ListFirma.saveProvozovna(self.user,self.idefixThis,clovek,1032))
          var neco3  =  ( await ListFirma.one(this.user,self.idefixThis, 103,''))
          self.list.data.firmaprovozovna = []
          self.list.data.firmaprovozovna =neco3.data.firmaprovozovna

    },
    async insertProvozovna(nPar) {
          var lAdd = true
          const self = this
          if (this.firmaprovozovna.nazev > ''){
            self.firmaprovozovna.idefix_firma =this.idefixThis
        if (nPar == 0){
        //alert(JSON.stringify(this.list.data.firmaprovozovna))
           this.list.data.firmaprovozovna.forEach((el,i) =>{
          if (el.nazev + el.prijmeni == self.firmaprovozovna.nazev + self.firmaprovozovna.prijmeni) {
            lAdd = false
            alert('Nemeli by jste pridavat uplne stejnou  provozovnu  ke stejne firme')
          }
        } );
        console.log("sefie ",JSON.stringify(self.firmaprovozovna))
        }
        var  neco= this.firmaprovozovna
          if (nPar ==0 ){
            var neco2=  (await ListFirma.saveProvozovna(self.user,self.idefixThis,this.firmaprovozovna,103))
          }
          if (nPar ==1 ){
            var neco2=  (await ListFirma.saveProvozovna(self.user,self.idefixThis,this.firmaprovozovna,1031))
          }
         }

         //KOnec
         if (nPar ==0 ){
          this.firmaprovozovna.idefix = (this.list.data.firmaprovozovna.length +10)*-1
          this.firmaprovozovna.kod = (this.list.data.firmaprovozovna.length +1)
          this.firmaprovozovna.user_txt = this.user
          // this.firmanotice.datum =
          // this.strojmod.prio = (this.list.data.strojmod.length +1)
          if (nPar ==0 ){
            this.list.data.firmaprovozovna.push(neco)
          }
          var newObj = f.cp(this.firmaprovozovna)
          this.firmaprovozovna = newObj
          this.firmaprovozovna.prijmeni = ''
          this.firmaprovozovna.jmeno = ''
          this.firmaprovozovna.mail = ''
          this.firmaprovozovna.funkce = ''


       }
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 103,''))
          self.list.data.firmaprovozovna = []
          self.list.data.firmaprovozovna =neco3.data.firmaprovozovna

          /*
          self.list.data.firmanotice.forEach(el => {
            el.datum  = f.datum2(el.datum)
          })
          */

          //alert(JSON.stringify(neco3.data.firmanotice))
          //alert('aaa')



         //Konec
          alert(nPar+ lAdd )
         return
    },
    async insertProvozovnaX(nPar) {
        var lAdd = true
        const self = this
         alert(nPar)
         return
        //alert(this.firmaprovozovna)
        // alert(self.firmaprovozovna.aktivni)
        if (this.firmaprovozovna.prijmeni > ''){

        self.firmaprovozovna.idefix_firma =this.idefixThis
        if (nPar == 0){
        //alert(JSON.stringify(this.list.data.firmaprovozovna))
        this.list.data.firmaprovozovna.forEach((el,i) =>{
          if (el.prijmeni + el.jmeno == self.firmaprovozovna.prijmeni + self.firmaprovozovna.jmeno) {
            lAdd = false
            alert('Nemeli by jste pridavat uplne stejnou  provozovnu  ke stejne firme')
          }
        } );
        }
          // alert('iko 2')
        if (lAdd == true) {
          let neco= this.firmaprovozovna
          if (nPar ==0 ){
            var neco2=  (await ListFirma.saveProvozovna(self.user,self.idefixThis,this.firmaprovozovna,103))
          }
          if (nPar ==1 ){
            var neco2=  (await ListFirma.saveProvozovna(self.user,self.idefixThis,this.firmaprovozovna,1031))
          }


  //        alert(this.list.data.strojmod.length)
       if (nPar ==0 ){
          this.firmaprovozovna.idefix = (this.list.data.firmaprovozovna.length +10)*-1
          this.firmaprovozovna.kod = (this.list.data.firmaprovozovna.length +1)
          this.firmaprovozovna.user_txt = this.user
          // this.firmanotice.datum =
          // this.strojmod.prio = (this.list.data.strojmod.length +1)
          if (nPar ==0 ){
            this.list.data.firmaprovozovna.push(neco)
          }
          var newObj = f.cp(this.firmaprovozovna)
          this.firmaprovozovna = newObj
          this.firmaprovozovna.prijmeni = ''
          this.firmaprovozovna.jmeno = ''
          this.firmaprovozovna.mail = ''
          this.firmaprovozovna.funkce = ''
          this.firmaprovozovna.oddeleni = ''
          this.firmaprovozovna.narozeniny = null
       }
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 102,''))
          self.list.data.firmaprovozovna = []
          self.list.data.firmaprovozovna =neco3.data.firmaprovozovna

          /*
          self.list.data.firmanotice.forEach(el => {
            el.datum  = f.datum2(el.datum)
          })
          */

          //alert(JSON.stringify(neco3.data.firmanotice))
          //alert('aaa')


        }

      }

    },

    async editProvozovna(aPar) {
      this.firmaprovozovna = f.cp(aPar)
      this.provozovnaEdit = true
      this.provozovnaEditInsert = false


    },

    //Provozovny




    firma_copy(){
      this.list.data.firma[0].ulice2 = this.list.data.firma[0].ulice
      this.list.data.firma[0].obec2  =this.list.data.firma[0].obec
      this.list.data.firma[0].psc2   =this.list.data.firma[0].psc
    },

    async getDataEnum(){
      const self = this
            //alert('PRED' + JSON.stringify(self.list.data.enum_strojskup))
            //ServerKlice = 7 vlastnosti
            var tmp
            var tmp2

            if (self.$store.state.showModule == 'list2-strojskup') {
              try {
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 10,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,10,''))
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
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 106,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,106,''))
                  self.list.data.enumprace = tmp2.data.enumprace
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
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 107,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,107,''))
                  self.list.data.enum_jednotka = tmp2.data.enum_jednotka
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

              self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'copy'))
              //self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'copy'))
              // alert('1')
              console.log('copy 1 : ' + self.idefixThis)
              //self.idefixThis = self.list.data.mat[0].idefix
              self.idefixThis = self.list.data.newId
              console.log('copy 2 : ' + self.idefixThis)
              self.list=[]
              self.list = (await ListFirma.one(this.user,self.idefixThis, -1,'edit'))
              self.rec.Idefix = self.idefixThis
              self.firmaNazev = self.list.data.firma[0]['nazev']
              self.list.data.firmanotice.forEach(el => {
                el.datum  = f.datum2(el.datum)
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
                self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'edit'))
                self.idefixThis = self.list.data.firma[0].idefix
                self.firmaNazev = self.list.data.firma[0].nazev
                self.list.data.firmanotice.forEach(el => {
                  el.datum  = f.datum2(el.datum)
                })


              } catch (e) {
        //      console.log('chybka ' ,  JSON.stringify(self.list.data.stroj[0].idefix ))
        //      alert( self.list.data.stroj[0].idefix )
                self.idefixThis = self.list.data.firma[0].idefix
                self.firmaNazev = self.list.data.firma[0].nazev


              }
            }
            }

          },

    insertOsoba() {
        var lAdd = true

      if (this.firmaosoba.prijmeni > ''){
        this.firmaosoba.idefix_firma =this.idefixThis
        this.list.data.firmaosoba.forEach((el,i) =>{
          if (el.prijmeni + el.jmeno == this.firmaosoba.prijmeni + this.firmaosoba.jmeno ) {
            lAdd = false
            alert('Nelze pridat 2x stejnou osobu ')
          }
        } );
        if (lAdd == true) {
          let neco= this.firmaosoba

  //        alert(this.list.data.strojmod.length)
          this.firmaosoba.idefix = (this.list.data.firmaosoba.length +10)*-1
          this.firmaosoba.kod = (this.list.data.firmaosoba.length +1)
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.firmaosoba.push(neco)
          var newObj = f.cp(this.firmaosoba)
          this.firmaosoba = newObj
          this.firmaosoba.prioritni = false



        }

      }

    },

    deleteOsobaXX(idx) {
      //alert(JSON.stringify(this.list.data.strojmod[idx]['idefix']))
      try {


      if (this.list.data.firmaosoba[idx]['idefix'] > 0 ){
        if (confirm("Smazat kontakt ?")){
            this.list.data.firmaosoba.splice(idx,1)
        }
      } else {
            this.list.data.firmaosoba.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba Osoby ',e )
      }

    },
    deleteProvozovnaXX(idx) {
      try {
      if (this.list.data.firmaprovozovna[idx].idefix > 0 ){
        if (confirm("Smazat provozovnu ?")){
            this.list.data.firmaprovozovna.splice(idx,1)
        }
      } else {
            this.list.data.firmaprovozovna.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba Provozovny',e )
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
      // alert(formName)
      if (formName == 'formnew'){
        // alert(formName+ ' /' + self.idefixThis)
        eventBus.$emit('dlg8310', {
           'IsDialog': true,
           'Akce' : 'copy' ,
           'Idefix' :  self.idefixThis,

      })
        // return
      } else {

      this.list.data.firmaosoba.forEach((el,i) =>{
            this.list.data.firmaosoba[i].kod = i+1
      })
      // alert(JSON.stringify(self.list.data.strojceny) + " / "+ self.idefixThis )
      var neco=  (await ListFirma.saveone(self.user,self.idefixThis,{
        firma: self.list.data.firma[0],
        firmaosoba: self.list.data.firmaosoba,
        firmaprovozovna: self.list.data.firmaprovozovna,

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
        this.list = []
        alert('aaa')
        eventBus.$emit('dlg8310rec')
        eventBus.$emit('dlg8310', {
         'IsDialog': true,
         'Akce' : 'edit' ,
         'Idefix' :  self.idefixThis
        })

        return


      }
      //this.IsDialog = false

      this.list = []
      eventBus.$emit('dlg8310rec')
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
            var prd= (await ListFirma.delete(self.user,self.idefixThis))
            this.IsDialog = false
            eventBus.$emit('dlg8310rec')
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
      dnes() {
        return f.dnes()
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
        case 1: return `Adresy a nazvy `

        case 2: return 'Kontaktni udaje'
        //case 3: return 'Inkousty a barevnosti'
        //case 4: return 'Rychlosti, prujezdy'
        case 3: return 'Provozovny'
        case 4: return 'Prace'
        case 5: return 'Planovani'
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

.el-textarea__inner {

  border:none;
}
.prepend2 {
  height:28px;
  background:#f5f7fa;
  border:1px solid #cccccc;
  color: #919398;
  font-size: 13px;
  padding-top: 2px;
}


</style>

