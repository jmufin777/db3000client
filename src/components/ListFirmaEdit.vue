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
    v-if="IsDialog1 && list && list.data && list.data.firma && list.data.firma[0]"
    >

<div slot="b1" class="green lighten-4 elevation-2" style="height:40px;font-size:18px">{{ stepInfo}} : {{idefixThis}}</div>

<div slot="a1" style="height:40px;font-size:18px;" class="px-2 green lighten-4 elevation-2" >
{{ ((isCopy ==false )?'Zmena':'Nova polozka ') +' ' + list.data.firma[0].nazev  }}
</div>
<div slot="c1" style="height:40px;font-size:18px" class="green lighten-4 elevation-2">
      <el-button v-if="isCopy == false " type="primary" id="btn_user_new_submit8310" @click="submitForm('formnew')" size="mini"> Novy Upravou</el-button>
      <el-button v-if="isCopy" type="primary" id="btn_user_submit8310" @click="submitForm('form')" size="mini"
        >Vlozit </el-button>
       <el-button v-else-if="IsZmena"  type="primary" id="btn_user_submit8310" @click="submitForm('formstep0')" size="mini"
        >Ulozit</el-button>
      <el-button v-if="isCopy" @click="resetForm('form')" id="btn_cancel_submit8310" size="mini" class="blue white--text">Zrusit</el-button>
      <el-button v-else @click="resetForm('form')" id="btn_cancel_submit8310" size="mini" class="blue white--text">Zavrit</el-button>
</div>

 <el-row slot="b22" style="height:20px;font-size:14px;">

 <el-tabs v-model="step2" @tab-click="handleClick" class="mx-4">
        <el-tab-pane label=" Prehledy"  name="0"></el-tab-pane>
        <el-tab-pane label=" Adresy"  name="1" ></el-tab-pane>
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


      <!-- <form  :id="IDForm" ref="form3" :model="form3"  :label-position="labelPosition"
        class="demo-ruleForm is-success" > -->
<form  :id="IDForm" @change="formChange()">

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

        <v-card v-show="step2=='1'"><v-card-text v-if="step2=='1'">


    <el-row class="ma-1">
     <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >
      <!-- <table style="width:99%;border:none;" class="nic bila"  cols="2" @keyup.enter="setFocus('bA'+ID)" @keyup.escape="closeKontakt"> -->
        <br>
      <table style="width:90%;border:none;" class="nic bila"  cols="2" >
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%"><b> Nazev firmy: </b></td>
            <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].nazev" size="mini"  style="width:95%" class="tdl tdn" placeholder="Nazev firmy" :id="'nazev_firmy_'+ID">
            </td>
       </tr>

       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">
            <a style="color:white" size="mini" type="primary" v-bind:class="{'green--text': IsIco==1,'blue--text': IsIco==0, 'warning': IsIco==2 }" class="elevation-0" @click="firma_ares(list.data.firma[0].ico)">IČO:</a>
             <!-- <el-button slot="prepend"  style="color:white" size="mini" type="primary" v-bind:class="{'success': IsIco==1,'info': IsIco==0, 'warning': IsIco==2 }" class="elevation-15" @click="firma_ares(list.data.firma[0].ico)" icon="el-icon-search" >Ico:</el-button> -->
          </td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].ico" size="mini"  style="width:95%" class="tdl tdn" placeholder="Ico"  :id="'ico_'+ID">
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">DIČ:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].dic" size="mini"  style="width:95%" class="tdl tdn" placeholder="DIC"  :id="'dic_'+ID">
          </td>
       </tr>
        <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%"><b>Sídlo</b></td>
          <td class="nic bila pl-3" style="width:70%">
              &nbsp;
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Ulice:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].ulice" size="mini"  style="width:95%" class="tdl tdn" placeholder="Ulice"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Obec:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].obec" size="mini"  style="width:95%" class="tdl tdn" placeholder="Obec"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">PSČ:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].psc" size="mini"  style="width:95%" class="tdl tdn" placeholder="PSČ"  >
          </td>
       </tr>

       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%"><b>Kancelář</b></td>
          <td class="nic bila pl-3" style="width:70%">
              <button type="button" size="mini" @click="firma_copy" style="width:95%" class="elevation-0 blue--text bezramecku leva" > = </button>
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Ulice:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].ulice2" size="mini"  style="width:95%" class="tdl tdn" placeholder="Ulice"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Obec:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].obec2" size="mini"  style="width:95%" class="tdl tdn" placeholder="Obec"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">PSČ:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].psc2" size="mini"  style="width:95%" class="tdl tdn" placeholder="PSČ"  >
          </td>
       </tr>

       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%"><b>&nbsp;</b></td>
          <td class="nic bila pl-3" style="width:70%">
              &nbsp;
          </td>
       </tr>
      <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Mobil:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].tel" size="mini"  style="width:95%" class="tdl tdn" placeholder="mobil"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Tel:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].tel2" size="mini"  style="width:95%" class="tdl tdn" placeholder="telefon"  >
          </td>
       </tr>
      <tr class="bila">


             <td class="nic bila prava pr-2 blue--text " style="width:20%"><a v-if="list.data.firma[0].mail>''" :href="'mailto:'+list.data.firma[0].mail">Email</a><span v-else>Email:</span></td>
            <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].mail" size="mini"  style="width:95%" class="tdl tdn" placeholder="email"  >
          </td>
       </tr>
       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">
            <a :href="'http://'+list.data.firma[0].www.replace('http://','')"  v-if="list.data.firma[0].www>''" target="blank">Web:
            </a>
            <span v-else>Web:</span>
            </td>
          <td class="nic bila pl-3" style="width:70%">
              <input v-model="list.data.firma[0].www" size="mini"  style="width:95%" class="tdl tdn" placeholder="web"  >
          </td>
       </tr>

       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%"><b>&nbsp;</b></td>
          <td class="nic bila pl-3" style="width:70%">
              &nbsp;
          </td>
       </tr>

       <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Splatnost:</td>
          <td class="nic bila pl-3" style="width:70%">
              <input type="number" v-model="list.data.firma[0].splatnost" size="mini"  style="width:95%" class="tdl tdn" placeholder="splatnost"  >
          </td>
       </tr>
      <tr class="bila">
        <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Hotovost:</td>
          <td class="nic bila pl-4 leva" style="width:70%">
          <input size="mini" style="height:18px;width:18px" type="checkbox" @change="changeHotovost" name="Hotovost" value="1"  :checked="(list.data.firma[0].hotovost==1)?true:false">
          </td>
       </tr>
      <tr class="bila">
        <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Materiály:</td>
          <td class="nic bila pl-4 leva" style="width:70%">
            <input style="height:18px;width:18px" type="checkbox" @change="changeMat" name="MatDodavatel" value="1"  :checked="(list.data.firma[0].mat==1)?true:false">
          </td>
       </tr>



      </table>
      <br>

     </el-col>

     <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >

    <el-row class="ma-2">




    </el-row>

<el-row><el-col :span="24" v-if="false">

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
    <el-row>
      <el-col :span="20">
        Prevod: {{ list.data.firma[0].poznamka }}
      </el-col>
    </el-row>

    </v-card-text></v-card>
    </v-window-item>

     <v-window-item :value="2"  >
        <v-card v-show="step2=='2'">
          <v-card-text >
            <el-row class="ma-4" >
                 <el-col :span="24" ref="vyska" style="height:550px">
                   <el-row class="ma-1">
                     <!-- @end="chooseItemKontakt" -->

                <div v-if="step2==2" style="width:100%;max-width:2000px;position:relative;" :id="'t' + objId1" ref="sirka">

                  <!-- <v-btn @click="deleteNeaktivni(list.data.firmaosoba)" small >Smazat neaktivni</v-btn> -->
                  <ta-ble3  :h="'430px;'+pof(Sirka,99)+';top:30px'"  :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'" :TopA="'top:28px'" :TopB="'height:28px'">

                  <!-- <table style="width:100%;max-width:2000px" class="nb" > -->
                   <table slot="head"  :style="pof(Sirka*SirkaStred,98)">
                        <thead class="c-1  tdline">

                         <th class="tdline stred" :style="pof(Sirka*SirkaStred,10)" >Jmeno</th>
                         <th class="tdline stred" :style="pof(Sirka*SirkaStred,15)" >Prijmeni </th>
                         <th class="tdline stred" :style="pof(Sirka*SirkaStred,25)" >Mail</th>
                         <th class="tdline stred" :style="pof(Sirka*SirkaStred,25)" >Tel</th>

                         <th class="tdline stred" :style="pof(Sirka*SirkaStred, 7)" >Obrat</th>
                         <th class="tdline stred" :style="pof(Sirka*SirkaStred, 7)" >Zakazky</th>
                         <th class="tdline stred" :style="pof(Sirka*SirkaStred, 5)" >
                         </th>
                           <button  type="button" style="width:22px;height:22px; font-color:black" class="pl-0 info elevation-3"  @click="kontaktEditInsert=!kontaktEditInsert ; kontaktEdit=(kontaktEditInsert)?false:(kontaktEdit );focus()" ><i class="el-icon-plus" size="mini"></i></button>
                       </thead>
                     </table>



                    <table slot="body"  :style="pof(Sirka*SirkaStred,98)">

                       <tbody class="nb tdlr">
                        <!-- <draggable v-model="list.data.firmaosoba"  :options="{group: 'peoplex' }" @start="drag=true"
                          style="width:100%"
                          .filter(el => el.aktivni = true )
                        > -->
                       <tr v-for="(clovek, i) in list.data.firmaosoba" :key="i"
                         v-if="clovek.aktivni==true || kontaktAktivni == true "
                         class="tdline nb tdlr"
                         v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                         @dblclick="editKontakt(clovek)"
                       >
                         <td class="tdline pl-1 " :style="pof(Sirka*SirkaStred,10)"
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                         >{{clovek.jmeno}}</td>
                         <td :style="pof(Sirka*SirkaStred,15)"
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline pl-1"
                         > {{clovek.prijmeni}}</td>
                         <td :style="pof(Sirka*SirkaStred,25)"
                         class="tdline pl-1"

                         >
                         <a v-if="clovek.mail>''" :href="'mailto:'+clovek.mail">{{clovek.mail}}</a><span v-else>{{clovek.mail}}</span>


                         </td>
                         <td :style="pof(Sirka*SirkaStred,25)"
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline pl-1"

                         >{{clovek.tel}} &nbsp;</td>


                         <td :style="pof(Sirka*SirkaStred,7)"
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline c-1"
                         >11</td>

                         <td :style="pof(Sirka*SirkaStred,7)"
                          v-bind:class="{ 'prvni' : ( clovek.aktivni==true && i %2 == 0) , 'prvni' : ( clovek.aktivni==true && i %2 != 0) , 'seda' : ( clovek.aktivni==false )  }"
                          class="tdline c-1"
                         >10</td>
                         <td :style="pof(Sirka*SirkaStred,5)"
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
                  </ta-ble3>
                </div>
                   </el-row>
                 </el-col>
             </el-row>
      <vue-draggable-resizable :handles="[]"   :x="600" :y="100" :isActive="true" :isResizable="true" :z="411999" :style="pof(Sirka*0.71,100)+';background:white;position;absolute;height:90%;'"   class="elevation-4 " v-if="kontaktEdit || kontaktEditInsert">
        <br>
        <table style="width:99%;border:none;" class="nic bila"  cols="2" @keyup.enter="setFocus('bA'+ID)" @keyup.escape="closeKontakt">
        <tr class="bila">
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Jmeno Prijmeni</td>
            <td class="nic bila pl-3" style="width:70%">
              <input v-model="firmaosoba.titul" size="mini"  style="width:10%" class="tdl tdn" placeholder="Titul" :id="'titul_'+ID">
              <input v-model="firmaosoba.jmeno" size="mini"  style="width:32%" class="tdl tdn" placeholder="jmeno" :id="'fokus2_'+ID">
              <input v-model="firmaosoba.prijmeni" size="mini"  style="width:40%" class="tdl tdn" placeholder="prijmeni">
              <input v-model="firmaosoba.titulza" size="mini"  style="width:10%" class="tdl tdn" placeholder="Titul2">

            </td>
        </tr>

        <!-- <tr><td class="nic bila prava pr-4 blue--text " style="width:30%">Prijmeni</td>        <td colspan="2"class="nic bila pl-3" style="width:30%"><input v-model="firmaosoba.prijmeni" size="mini"  style="width:95%" class="tdl tdn"></td></tr> -->
        <tr class="bila"><td class="nic bila bila prava pr-2 blue--text " style="width:20%">Mobil</td>         <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.tel" size="mini"  style="width:95%" class="tdl tdn"></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Telefon2</td>        <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.tel2" size="mini"  style="width:95%" class="tdl tdn"></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%"><a v-if="firmaosoba.mail>''" :href="'mailto:'+firmaosoba.mail">Email</a><span v-else>Email</span></td><td class="nic bila pl-3" style="width:70%"  ><input v-model="firmaosoba.mail" size="mini"  style="width:95%" class="tdl tdn" ></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%"><a v-if="firmaosoba.mail_fakt>''" :href="'mailto:'+firmaosoba.mail_fakt">Email fakturacni</a><span v-else>Email fakturacni</span></td><td class="nic bila pl-3" style="width:70%"  ><input v-model="firmaosoba.mail_fakt" size="mini"  style="width:95%" class="tdl tdn" ></td></tr>

        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Funkce</td>         <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.funkce" size="mini"  style="width:95%" class="tdl tdn"></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Oddělení</td>       <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.oddeleni" size="mini"  style="width:95%" class="tdl tdn"></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Ulice</td>          <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.ulice" size="mini"  style="width:95%" class="tdl tdn"></td></tr>
        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Obec, Psc</td>      <td class="nic bila pl-3" style="width:70%"><input v-model="firmaosoba.obec" size="mini"  style="width:70%" class="tdl tdn" placeholder="Obec">
        <input v-model="firmaosoba.psc" size="mini"  style="width:25%" class="tdl tdn" placeholder="psc"></td></tr>

        <tr><td class="nic bila prava pr-2 blue--text " style="width:20%">Narozeniny</td>        <td class="nic bila pl-3" style="width:70%">
          <el-date-picker v-model="firmaosoba.narozeniny" size="mini"  type="date" align="right" style="width:30%"
                         format="dd.MM.yyyy"
                         value-format="yyyyMMdd"
          >               </el-date-picker>


           &nbsp;&nbsp;&nbsp;<span class="blue--text">Aktivni</span>&nbsp;  <input size="mini" style="height:18px;width:18px" v-model="firmaosoba.aktivni" type="checkbox" @change="changeAktivniOsoba" :name="'aktivni'+ID" value="1"  :checked="firmaosoba.aktivni==true"  class="pt-1">
          </td>
          </tr>

        <tr><td class="nic bila prava pr-2 blue--text pt-2 " style="width:20%">Poznámka</td>         <td class="nic bila pl-3 pt-2" style="width:70%">
              <el-input v-model="firmaosoba.poznamka" size="mini" autosize type="textarea" style="width:95%;border-bottom: solid 1px #cccccc"  rows="5">
               </el-input>
        </td>
        </tr>
          <tr><td class="stred nic bila pt-4" colspan="2">
            <v-btn v-if="kontaktEditInsert"   @click="insertKontakt(0)" small ref="bA" :id="'bA'+ID"> Vlozit </v-btn>
            <v-btn v-if="kontaktEdit"         @click="insertKontakt(1)"   small ref="bA" :id="'bA'+ID"> Zmena </v-btn>
            <v-btn @click="closeKontakt" small> Zavrit </v-btn>
          </td>
        </tr>


        </table>



<!--
            <button v-if="kontaktEditInsert" type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertKontakt(0)" ><i class="el-icon-plus" size="mini"></i></button>
                   <button v-if="kontaktEdit" type="button" style="width:100%;height:22px" class="pl-0 info elevation-3"  @click="insertKontakt(1)" ><i class="el-icon-edit" size="mini"></i></button> -->


      </vue-draggable-resizable>



          </v-card-text>
        </v-card>
     </v-window-item>

         <v-window-item :value="3">
        <v-card v-show="step2=='3'">
          <v-card-text>
            <el-row class="ma-4">
                 <el-col :span="24">
                   <div v-if="step2==3" style="width:100%;max-width:2000px;position:relative;" :id="'t' + objId1" ref="sirka">
                      <!-- <v-btn @click="deleteNeaktivni(list.data.firmaprovozovna)" small >Smazat neaktivni</v-btn> -->
                     <ta-ble3  :h="'430px;'+pof(Sirka,99)+';top:30px'"  :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'" :TopA="'top:28px'" :TopB="'height:28px'" >

                     <table style="width:100%" slot="head">
                       <thead>
                         <th style="width:15%">Nazev</th>
                         <th style="width:15%">Skupina</th>
                         <th style="width:20%">Adresa</th>

                         <th style="width:15%">Jmeno</th>
                         <th style="width:20%">Mail</th>
                         <th style="width:10%">Tel</th>
                         <th style="width:10%">Tel2</th>
                         <th style="width:5%">
                           <!-- <el-checkbox border v-model="provozovnaAktivni" size="mini">Aktivni</el-checkbox> -->
                           &nbsp;
                           <button  type="button" style="width:22px%;height:22px" class="pl-0 info elevation-3"  @click="provozovnaEditInsert=!provozovnaEditInsert ; provozovnaEdit=(provozovnaEditInsert)?false:provozovnaEdit ;" ><i class="el-icon-plus" size="mini"></i></button>

                         </th>
                       </thead>
                     </table>
                     <table style="width:100%" slot="body">

                      <tbody  style="width:100%">
                        <draggable v-model="list.data.firmaprovozovna"  :options="{group: 'peoplex' }" @start="drag=true"
                          style="width:100%"
                        >
                       <tr v-for="(provozovnax, i) in list.data.firmaprovozovna" :key="i"
                       v-if="provozovnax.aktivni==true || provozovnaAktivni == false "
                       @dblclick="editProvozovna(provozovnax)"

                       >
                         <td style="width:15%">{{provozovnax.nazev}}</td>
                         <td style="width:15%">{{provozovnax.nazev_txt}}</td>
                         <td style="width:20%" >{{provozovnax.ulice + ', '+ provozovnax.psc+ ' ' +provozovnax.obec  }}</td>

                         <td style="width:15%">{{provozovnax.jmeno + ' '+ provozovnax.prijmeni}} </td>

                         <td style="width:20%">{{provozovnax.mail}}</td>
                         <td style="width:10%">{{provozovnax.tel}}</td>
                         <td style="width:10%">{{provozovnax.tel2}}</td>
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
                     </ta-ble3>
                    </div>


                 </el-col>
             </el-row>
          <vue-draggable-resizable :handles="[]" :x="600" :y="100"    :isActive="true" :isResizable="true" :z="411999" :style="pof(Sirka*0.71,100)+';background:white;position;absolute;height:90%;'"   class="elevation-4 " v-if="provozovnaEdit || provozovnaEditInsert">
            <br>
            <table style="width:99%;border:none;" class="nic"  cols="2" @keyup.enter="setFocus('bA'+ID)" @keyup.escape="closeProvozovna">
            <tr>
            <td class="nic bila prava pr-2 blue--text " style="width:20%">Nazev</td>
              <td class="nic bila pl-3" style="width:70%">
                <input v-model="firmaprovozovna.nazev" size="mini"  style="width:95%" class="tdl tdn" placeholder="Nazev" :id="'fokus1_'+ID" >
              </td>
            </tr>
                        <tr>
            <td class="nic bila prava pr-2 blue--text " style="width:20%">Skupina</td>
              <td class="nic bila pl-3" style="width:70%">
                <el-autocomplete
                class="inline-input mr-1 tdl tdn"
                v-model="firmaprovozovna.nazev_txt"
                :fetch-suggestions="querySearch501"
                placeholder="Skupina"
                @select="handleSelect"
                size="mini "
                style="width:95%;"
                min
                ></el-autocomplete>

                <input v-if="false" v-model="firmaprovozovna.nazev_txt" size="mini"  style="width:95%" class="tdl tdn" placeholder="Skupina provozoven"  >
                
              </td>
            </tr>
          <tr>
            <td class="nic bila prava pr-2 blue--text " style="width:20%">Kontakt</td>
            <td class="nic bila pl-3" style="width:70%">
              <input v-model="firmaprovozovna.jmeno" size="mini"  style="width:40%" class="tdl tdn" placeholder="jmeno">
              <input v-model="firmaprovozovna.prijmeni" size="mini"  style="width:55%" class="tdl tdn" placeholder="prijmeni">
          </td>
        </tr>
        <tr>
          <td class="nic bila prava pr-2 blue--text " style="width:20%">Adresa</td>
          <td class="nic bila pl-3" style="width:70%">
            <input v-model="firmaprovozovna.ulice" size="mini"  style="width:42%" class="tdl tdn" placeholder="Ulice">
            <input v-model="firmaprovozovna.obec" size="mini"  style="width:37%" class="tdl tdn" placeholder="Obec">
            <input v-model="firmaprovozovna.psc" size="mini"  style="width:16%" class="tdl tdn" placeholder="psc">
          </td>
        </tr>
        <tr>
        <td class="nic bila prava pr-2 blue--text " style="width:20%">Mobil, Telefon</td>
          <td class="nic bila pl-3" style="width:70%">
            <input v-model="firmaprovozovna.tel" size="mini"  style="width:40%" class="tdl tdn" placeholder="Mobil">
            <input v-model="firmaprovozovna.tel2" size="mini"  style="width:55%" class="tdl tdn" placeholder="Tel1,Tel2.....">
          </td>
        </tr>
         <tr>
         <td class="nic bila prava pr-2 blue--text " style="width:20%">Oddeleni, Funkce</td>
          <td class="nic bila pl-3" style="width:70%">
            <input v-model="firmaprovozovna.oddeleni" size="mini"  style="width:40%" class="tdl tdn" placeholder="Oddeleni">,
            <input v-model="firmaprovozovna.funkce" size="mini"  style="width:54%" class="tdl tdn" placeholder="Funkce">
          </td>
        </tr>
        <tr>
         <tr><td class="nic bila prava pr-2 blue--text " style="width:20%"><a v-if="firmaprovozovna.mail>''" :href="'mailto:'+firmaprovozovna.mail">Email</a><span v-else>Email</span></td><td class="nic bila pl-3" style="width:70%"  ><input v-model="firmaprovozovna.mail" size="mini"  style="width:95%" class="tdl tdn" ></td></tr>
         <tr>
         <td class="nic bila prava pr-2 blue--text " style="width:20%" rowspan="3">Provozni doba</td>
          <td class="nic bila pl-3" style="width:70%" >
                         Po&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.po" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.po==true" >
             &nbsp;&nbsp;Ut&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.ut" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.ut==true">
             &nbsp;&nbsp;St&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.st" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.st==true">
             &nbsp;&nbsp;Ct&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.ct" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.ct==true">
             &nbsp;&nbsp;Pa&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.pa" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.pa==true">
             &nbsp;&nbsp;So&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.so" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.so==true">
             &nbsp;&nbsp;Ne&nbsp;<input size="mini" style="height:15px;width:18px" v-model="firmaprovozovna.ne" type="checkbox" @change="changeZbytek"  value="1"  :checked="list.data.firmaprovozovna.ne==true">
        </td>
         </tr>
         <tr>
           <td class="nic bila pl-3" style="width:70%" >
              Prac.dny: <input type="time" v-model="firmaprovozovna.otevreno_od" size="mini"  style="width:35%;text-align:center" class="tdl tdn" placeholder="Od">
                   &nbsp;&nbsp;Do:&nbsp; <input type="time" v-model="firmaprovozovna.otevreno_do" size="mini"  style="width:35%;text-align:center" class="tdl tdn" placeholder="Do" >
           </td>
         </tr>
         <tr>
           <td class="nic bila pl-3" style="width:70%" >
              Vikendy : <input type="time" v-model="firmaprovozovna.otevreno_w_od" size="mini"  style="width:35%;text-align:center" class="tdl tdn" placeholder="Od">
                   &nbsp;&nbsp;Do:&nbsp; <input type="time" v-model="firmaprovozovna.otevreno_w_do" size="mini"  style="width:35%;text-align:center" class="tdl tdn" placeholder="Do" >
           </td>
         </tr>
        <tr>
         <td class="nic bila prava pr-2 blue--text ">Aktivni</td>
          <td class="nic bila pl-3" style="width:70%">
          <input size="mini" style="height:18px;width:18px" v-model="firmaosoba.aktivni" type="checkbox" @change="changeAktivniOsoba" :name="'aktivni'+ID" value="1"  :checked="firmaprovozovna.aktivni==true"  class="pt-1">
         </td>
       </tr>

       <tr>
          <td class="stred nic bila pt-4" colspan="2">
            <v-btn v-if="provozovnaEditInsert"   @click="insertProvozovna(0)" small ref="bA" :id="'bA'+ID"> Vlozit </v-btn>
            <v-btn v-if="provozovnaEdit"         @click="insertProvozovna(1)"   small ref="bA" :id="'bA'+ID"> Zmena </v-btn>
            <v-btn @click="closeProvozovna" small> Zavrit </v-btn>
          </td>
       </tr>

      </table>


          </vue-draggable-resizable>
          </v-card-text>
        </v-card>
     </v-window-item>

     <v-window-item :value="4">
        <v-card v-show="step2=='4'">
          <v-card-text>
            <v-spacer></v-spacer>
            <!-- <el-row class="ma-2 mt-4 pt-4">
             <el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:90%;color:yellow" class="info elevation-5">Prace</el-button>
             </el-row> -->
            <el-row class="ma-2">
              <el-col :span="24">
                <el-row class="ma-2 mt-4">
                  <el-col :span="20">

          <!-- {{ list.data.firmaprace }} zbytek {{ list.data.enumprace[0] }}
          {{ checkedLeft }} / {{ checkedRight}} -->
          <el-row>
            <el-col :span="24">&nbsp;</el-col>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="7"> <!-- Table 1 //-->
             <ta-ble :list="list.data.enumprace" :h="'360px;width:200px'">
            <thead slot="head" >
              <tr>
              <th class="tdrn">
                <el-checkbox  @change="CheckAllLeft" >
                </el-checkbox>
              </th>
              <th border="0" class="tdln tdrn">
                <el-button size ="mini" @click="edit_vlastnosti('list2-prace','Prace')" style="width:90%;color:yellow" class="info elevation-5">Prace</el-button>
              </th>
              <th class="tdln">
                   {{ checkedLeft.length }}/{{ list.data.enumprace.length }}
              </th>
              </tr>
              <tr>
               <th width="100%" colspan="3" style="background:white" class="tdl">
                 <el-input class="my-0" prefix-icon="el-icon-search"  style='width:100%; border:none' autofocus clearable size="mini" v-model="searchLeft" placeholder="Vse" ></el-input>
              </th>
              </tr>
          </thead>
          <tbody slot="body" >
              <thead slot="head1" class="h-1" colspan="2"><th width="100%">A</th></thead>
              <tr v-for="(itemleft,ileft) in list.data.enumprace.filter(word => searchLeft=='' || (word.label+'').match(RegExp(searchLeft,'i')))" :key="ileft"
              >
                <td class="tdl" style="width:25%" align="center"
                >
                <input style="height:14px;width:14px" :ref="'l_' + itemleft['key']" type="checkbox" :id="'check_left_'+itemleft['key']" :value="itemleft['key']"
                  @change="checkLeft('l_' + itemleft['key'],0)">
                </td>
                <td  class="tdl" style="width:75%"
                  @click="checkLeft('l_' + itemleft['key'],1)"

                >
                 <a> {{ itemleft.label}}</a>
                </td>

              </tr>
          </tbody>
          </ta-ble>
            </el-col>
           <el-col :span="3" class="mt-4 ml-0">
             <div class="el-transfer__buttons" style="position:relative;left:-10px">
              <button  v-if="checkedRight.length==0" disabled="disabled" type="button" @click="moveLeft(list.data.enumprace,list.data.firmaprace)" class="el-button is-disabled el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-left"></i><!----></span></button>
              <button  v-else  type="button" @click="moveLeft(list.data.enumprace,list.data.firmaprace)" class="el-button  el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-left"></i><!----></span></button>

              <button  v-if="checkedLeft.length==0"  disabled="disabled" type="button" @click="moveRight(list.data.enumprace,list.data.firmaprace)" class="el-button is-disabled el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-right"></i><!----></span></button>
              <button  v-else type="button" @click="moveRight(list.data.enumprace,list.data.firmaprace)" class="el-button el-button--primary  el-transfer__button"><!----><!----><span><i class="el-icon-arrow-right"></i><!----></span></button>
            </div>
           </el-col>
            <el-col :span="7"> <!-- Table 2 //-->

          <ta-ble v-if="list.data.firmaprace.length>0 " :list="list.data.firmaprace" :h="'360px;width:200px'">
            <thead slot="head" >
              <tr>
                <th class="tdrn">
                <el-checkbox  @change="CheckAllRight" >
                </el-checkbox>
              </th>
              <th    class="tdrn tdln">Prideleno</t>
                <th class="tdln">
                  {{ checkedRight.length }}/{{ list.data.firmaprace.length }}
                </th>
              </tr>
                <tr>
                <th width="100%" colspan="3" style="background:white" class="tdln">
                  <el-input class="my-0" prefix-icon="el-icon-search"  style='width:100%' autofocus clearable size="mini" v-model="searchRight" placeholder="Vse" ></el-input>
                </th>
                </tr>
            </thead>
            <tbody slot="body" >
              <thead slot="head1" class="h-1" colspan="2"><th width="100%">A</th></thead>
              <tr v-for="(itemright,iright) in list.data.firmaprace.filter(word => searchRight=='' || (word.label+'').match(RegExp(searchRight,'i')))" :key="iright"
              >
                <td class="tdl" style="width:25%" align="center"
                >
                  <input style="height:14px;width:14px" :ref="'r_' + itemright['key']" type="checkbox" :id="'check_right_'+itemright['key']" :value="itemright['key']"
                  @change="checkRight('r_' + itemright['key'],0)">

                </td>
                <td  class="tdl" style="width:75%"
                  @click="checkRight('r_' + itemright['key'],1)">

                  <a>{{ itemright.label}}</a>
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

      firmaosobaDefault: {
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
        otevreno_w_od: '08:00',
        otevreno_w_do: '12:00',
        po: true,
        ut: true,
        st: true,
        ct: true,
        pa: true,
        so: false,
        ne: false,
      },

      firmaprovozovnaDefault: {
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
        otevreno_w_od: '08:00',
        otevreno_w_do: '12:00',
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

//Table 3 - zatim spolecne- uvidime co to udela

      Sirka : 0,
      Sirka2 : 0,
      Vyska : 1000,
      SirkaLeva : 0.1,
      SirkaStred : 1,
      SirkaPrava : 0.05,
      LastColHeight: '',
      CitacHeight: 0,
      ID: 0,
      TestovaciCislo: 0,

      //Pager
       Zobrazit: 15,
       Zobrazit1: 15,
       Stranka: 1,
       IDForm: "",
       IsZmena: false

    }
  },


  mounted() {

    //this.generateData()
    //this.data_vzor_leva=[1,2,3,4,5,6]
    //this.value_vzor_prava= [1,2,11]

    const self = this
    var tmp2
    self.ID = Math.round(Math.random() * 1983458)
    self.IDForm = "Form_" + self.ID;
    self.objId1+=''+self.ID
    self.objId2+=''+self.ID
    self.objSearchBar+=''+self.ID
    var interv =setInterval(function() {
       self.sirka("sirka")
       self.sirka2("sirka2")
       self.vyska("vyska")

       // self.TestovaciCislo++
//       alert(self.Sirka)
    },500)
    //self.handleResize()


  },
  async created () {
    var self=this

    eventBus.$on('edit_stroj', ( dlgPar ) => {
      self.citac++
      self.getDataEnum()

    })
      eventBus.$off('dlg8310')
      eventBus.$on('dlg8310', ( dlgPar ) => {
        // alert('EVENT' + JSON.stringify(dlgPar ))
            self.rec = dlgPar
             // alert(JSON.stringify(dlgPar))
             try {
             // self.xMyska = event.screenX - 200
             } catch(e) {
               //alert('Mysku nelze')
             }
               // alert(self.IsDialog1 + " / " +  dlgPar.IsDialog + " " + self.idefixThis + " / " + self.firmaosoba.idefix_firma + " / " + self.IsZmena )
               if (self.IsZmena) {
                 if (confirm("Ulozit predchozi zmeny ?")) {
                     self.Save()
                 }
                 self.IsZmena = false

               }
              //V alertu vyse prommenne je mozne rozponat zmenu firmu a optati na uloze na zaklade IsZmena



            //alert(event.pageX)

            //console.log(event)
        if (dlgPar.IsDialog==true) {
          //if (!self.IsDialog1){
            self.IsDialog1 = true
            self.kontaktEdit = false
            self.kontaktEditInsert = false

            self.provozovnaEdit = false
            self.provozovnaEditInsert = false


            // self.IsDialog1 = !self.IsDialog1
            if (self.IsDialog1 && dlgPar.Idefix > 0) {
              //self.step=0
              //self.step=4
              // alert(self.firmaosoba.idefix_firma)

              if (self.idefixThis != self.firmaosoba.idefix_firma) {
                  self.kontaktEdit = false
                  self.kontaktEditInsert = false
                  self.provozovnaEdit = false
                  self.provozovnaEditInsert = false
                  self.closeProvozovna()
                  self.closeKontakt()


                  //alert('aaa')

                //alert('Zmena firmy' + JSON.stringify(self.firmaosoba))
/*
                self.firmaosoba = {}
                self.firmaosoba = {
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
              }
              */

       // alert('Zmena firmy' + JSON.stringify(self.firmaosoba))
              }
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
closeKontakt() {
      const self = this
      self.kontaktEditInsert = false
      self.kontaktEdit = false

      var newObj = f.cp(self.firmaosobaDefault)
      self.firmaosoba = newObj
} ,

closeProvozovna() {
      const self = this
      self.provozovnaEditInsert = false
      self.provozovnaEdit = false

      var newObj = f.cp(self.firmaprovozovnaDefault)
      self.firmaprovozovna = newObj
} ,

deleteNeaktivni(aDel) {
     const self = this
  if (!confirm("Smazat neaktivni  polozky ?")) {
      return
  }
  aDel.forEach((el,idx) =>{
    if (el.aktivni == false ) {
      aDel.splice(idx,1)
      setTimeout(function(){
        self.Save()
      },1000)


      // alert("guma" + idx)
    }
  })



},
checkLeft(ir, bclick = 0) {
  const self  = this
  if (!this.$refs[''+ir]) {
    return
  }
  var nVal = this.$refs[''+ir][0].value
  if (bclick == 1) {
    this.$refs[''+ir][0].checked = !this.$refs[''+ir][0].checked
  }

    if (this.$refs[''+ir][0].checked ){
          self.checkedLeft.push(nVal)
        } else {
          self.checkedLeft.forEach((el, idx2) =>{
            if (el == nVal ){
              self.checkedLeft.splice(idx2,1)
              console.log('Left', self.checkedLeft)
              return
            }
          })
  }

  console.log(this.$refs[''+ir][0].checked  )
  //console.log(this.$refs.l_10153)
},

  checkRight(ir, bclick = 0) {
  const self  = this

  if (!this.$refs[''+ir]) {
    return
  }
  var nVal = this.$refs[''+ir][0].value
  if (bclick == 1) {
    this.$refs[''+ir][0].checked = !this.$refs[''+ir][0].checked
  }

    if (this.$refs[''+ir][0].checked ){
          self.checkedRight.push(nVal)
        } else {
          self.checkedRight.forEach((el, idx2) =>{
            if (el == nVal ){
              self.checkedRight.splice(idx2,1)
              console.log('Left', self.checkedRight)
              return
            }
          })
  }

  console.log(this.$refs[''+ir][0].checked  )
  //console.log(this.$refs.l_10153)
},



    async moveRight(arrLeft, arrRight){

      const self = this
      var idxLeft = -1
      self.checkedLeft.forEach(el => {
        arrLeft.forEach((el2,i2)=>{
          if (el2.key == el) {
            self.$refs['l_'+el][0].checked = false
            arrRight.push(el2)
//            el2.key=-1
  //          el2.label='xxx'
            self.$refs['l_'+el][0].checked = false
            console.log('l_'+el)
            arrLeft.splice(i2,1)
            return
          }

        })
      })
        self.checkedLeft = []
         arrRight = _.sortBy(arrRight,'label')
        // arrRight = _.orderBy([arrRight => neco.label.toLowerCase()],['desc'])
        var neco2 =  (await ListFirma.savePrace(self.user,self.idefixThis,arrRight,104))


    },

    async moveLeft(arrLeft, arrRight){
      const self = this
      var idxLeft = -1
      self.checkedRight.forEach(el => {
        arrRight.forEach((el2,i2)=>{
          if (el2.key == el) {
            self.$refs['r_'+el][0].checked = false
            arrLeft.push(el2)
//            el2.key=-1
  //          el2.label='xxx'
            self.$refs['r_'+el][0].checked = false
            console.log('r_'+el)
            arrRight.splice(i2,1)
            return
          }

        })
      })
        self.checkedRight = []
        arrLeft = _.sortBy(arrLeft,'label')
        var neco2 =  (await ListFirma.savePrace(self.user,self.idefixThis,arrRight,104))
    },


    CheckAllLeft(val) {
      const self = this
      var neco=''

      self.list.data.enumprace.forEach((el,idx) => {
        neco='l_'+el['key']
        console.log(neco)
        if (self.$refs[neco] && self.$refs[neco][0] ){
          if (val){
            self.$refs[neco][0].checked=true

            self.checkedLeft.push(self.$refs[neco][0].value)
            console.log(self.checkedLeft.length)
          } else {
            self.$refs[neco][0].checked=false
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
        neco='r_'+el['key']
        console.log(neco)
        if (self.$refs[neco] && self.$refs[neco][0] ){
          if (val){
            self.$refs[neco][0].checked=true

            self.checkedRight.push(self.$refs[neco][0].value)
            console.log(self.checkedRight.length)
          } else {
            self.$refs[neco][0].checked=false
          }
        }
      })
        //self.isIndeterminate = false;
        if (!val){
          self.checkedRight=[];
        }
  return true;
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
      if (this.step == 1) {
        this.focus()
      }
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
      return true

      const self = this
      if (e.target.checked) {
        //self.list.data.firma[0].hotovost = true

      } else {
        // self.list.data.firma[0].hotovost = false
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
      const self = this
      this.firmaosoba = f.cp(aPar)

      this.kontaktEdit = true
      this.kontaktEditInsert = false

      self.focus()
      return


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
          // alert(nPar)
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
        console.log("sefie ",JSON.stringify(self.firmaprovozovna))
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
//          alert(nPar+ lAdd )
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
      const self = this
      this.firmaprovozovna = f.cp(aPar)
      this.provozovnaEdit = true
      this.provozovnaEditInsert = false

      self.focus()


    },
    focus() {
      const self = this

      setTimeout(function(){


        if (document.getElementById("fokus_"+self.ID)) {
            document.getElementById("fokus_"+self.ID).focus()
        }
        if (document.getElementById("fokus1_"+self.ID)) {
            document.getElementById("fokus1_"+self.ID).focus()
        }
        if (document.getElementById("fokus2_"+self.ID)) {
            document.getElementById("fokus2_"+self.ID).focus()
        }


      },500)

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
              //tmp =  ( await ListFirma.one(this.user,this.idefixThis , 106,''))
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 1041,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,1041,''))
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
                self.firmaosoba = {}
                self.firmaosoba = {
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

    async  Save() {
      const self = this
      self.IsZmena = false
      this.list.data.firmaosoba.forEach((el,i) =>{
            this.list.data.firmaosoba[i].kod = i+1
      })
      // alert(JSON.stringify(self.list.data.strojceny) + " / "+ self.idefixThis )
      var neco=  (await ListFirma.saveone(self.user,self.idefixThis,{
        firma: self.list.data.firma[0],
        firmaosoba: self.list.data.firmaosoba,
        firmaprovozovna: self.list.data.firmaprovozovna,

          }))

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

      await self.Save()

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
          // alert(self.rec.Idefix + " /" + self.idefixThis )
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
            this.IsDialog1 = false
            eventBus.$emit('dlg8310rec')
          } else {
            // submitForm('formstep0')
            //alert('nedelam')
            return
          }


        } else {
          if (self.IsZmena) {
            if (confirm("Ulozit zmeny ?"))  {
              self.IsDialog1 = false
              self.IsZmena = false
              self.submitForm('formstep0')
            }
            // alert('nedelam')
          }
          //  submitForm('formstep0')

         setTimeout(function(){
          self.list = []
          self.IsDialog1 = false
          self.IsZmena = false
          // alert('aaa')
         },200)


        }
        // var x
        // for (x in this.formBackup ) {
        //   this.recData[x] = this.formBackup[x]
        // }


    },


  querySearch501(queryString, cb) {  //Nazev
        var n1 = this.list.data.enumprovozovna_txt
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
  querySearch100(queryString, cb) {  //Nazev
        var n1 = this.list.data.enum_
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
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
    // Table 3
     _max(iporadi) {
      const self = this
      var neco1 = document.getElementById('RadekS_'+iporadi+'')
      var neco2 = document.getElementById('RadekL_'+iporadi+'')
      var neco3 = document.getElementById('RadekR_'+iporadi+'')
      var newH = ''
      var konec = false
      try {


      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }
      } catch (e) {
        konec = true
      }
      if (konec) {
        return
      }
    setTimeout(function(){
      try {
        if (neco1 ) {
        newH = ''+Math.max(neco1.offsetHeight,neco2.offsetHeight,neco3.offsetHeight)+'px'
        neco1.style.height = newH
        neco2.style.height = newH
        neco3.style.height = newH
        }

      } catch (e) {
        console.log('Chybka','Poradi', iporadi,e)
        setTimeout(function() {
          self._max(iporadi)
        },500)

      }

      },100)
      //Math.max()
      return 47
    },

    _max2(iporadi) {
      const self = this
      var neco1 = document.getElementById('Radek2S_'+iporadi+'')
      var neco2 = document.getElementById('Radek2L_'+iporadi+'')
      var neco3 = document.getElementById('Radek2R_'+iporadi+'')
      var newH = ''
      var konec = false
      try {


      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }
      } catch (e) {
        konec = true
      }
      if (konec) {
        return
      }
    setTimeout(function(){
      try {
        if (neco1 ) {
        newH = ''+Math.max(neco1.offsetHeight,neco2.offsetHeight,neco3.offsetHeight)+'px'
        neco1.style.height = newH
        neco2.style.height = newH
        neco3.style.height = newH
        }

      } catch (e) {
        console.log('Chybka','Poradi', iporadi,e)
        setTimeout(function() {
          self._max(iporadi)
        },500)

      }

      },100)
      //Math.max()
      return 47
    },

  _max3(iporadi) {
      const self = this
      var neco1 = document.getElementById('Radek3S_'+iporadi+'')
      var neco2 = document.getElementById('Radek3L_'+iporadi+'')
      var neco3 = document.getElementById('Radek3R_'+iporadi+'')
      var newH = ''
      var konec = false
      try {


      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }
      } catch (e) {
        konec = true
      }
      if (konec) {
        return
      }
    setTimeout(function(){
      try {
        if (neco1 ) {
        newH = ''+Math.max(neco1.offsetHeight,neco2.offsetHeight,neco3.offsetHeight)+'px'
        neco1.style.height = newH
        neco2.style.height = newH
        neco3.style.height = newH
        }

      } catch (e) {
        console.log('Chybka','Poradi', iporadi,e)
        setTimeout(function() {
          self._max(iporadi)
        },500)

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
    sirka(ref, znovu = true) {
      const self= this
      var nret = 0
      self.Sirka = self.Sirka
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          if (nret != self.Sirka || true ) {
            self.Sirka = nret
            self.TestovaciCislo++
          }

          //alert(nret)
        } catch(e) {
          return 11
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 100)

      return nret
    },
    sirka2(ref, znovu = true) {
      const self= this
      var nret = 0
      self.Sirka = self.Sirka
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          if (nret != self.Sirka2 || true ) {
            self.Sirka = nret
            self.TestovaciCislo++
          }

          //alert(nret)
        } catch(e) {
          return 11
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 100)

      return nret
    },
    sirka3(ref, znovu = true) {
      const self= this
      var nret = 0
      self.Sirka = self.Sirka
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          if (nret != self.Sirka3 || true ) {
            self.Sirka = nret
            self.TestovaciCislo++
          }

          //alert(nret)
        } catch(e) {
          return 11
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 100)

      return nret
    },
    vyska(ref, znovu = true) {
      const self= this
      var nret = 0
      self.Vyska = self.Vyska
      //alert(ref)
       setTimeout(function() {
         // alert(self.$refs[ref].offsetHeight)
        try {
          nret = self.$refs[ref].clientHeight
          if (nret != self.Vyska || true ) {
            self.Vyska = nret
            self.TestovaciCislo++
          }

          //alert(nret)
        } catch(e) {
          return 1100
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 1000)

      return nret
    },

    formChange() {
      this.IsZmena = true
      // alert("Zmena")
      //Otazka

    },
    setFocus(cId) {
      document.getElementById(cId).focus()
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

    },
    checkLeftx(ir, bclick = 0) {
      const self  = this
      var neco =''
      var nVal= self.list.data.enumprace[ir]['key']
      var objneco
      neco='check_left_'+self.list.data.enumprace[ir]['key']
      alert(neco)
      //alert(ir+ "/ "+ bclick)
      if (document.getElementById(neco)){

        objneco = document.getElementById(neco)
        if ( bclick==1)  objneco.checked = !objneco.checked
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
table tr:nth-child(odd) td{
  background:white;


}
table tr:nth-child(even) td{
  background: #E3F2FD;

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
<style scoped>
textarea:focus, input:focus, .bezramecku:focus {
    outline: none;
}
a:focus  {
    outline: dotted 1px silver;
}
::placeholder {
  color: peachpuff;
  font-size: 12px;
}

.el-input__inner {
  border:none;
}

.el-date-editor, .el-input, .el-input--mini, .el-input--prefix, .el-input--suffix, .el-date-editor--date {
border:none;
}

.bila {
  background: white;
}


.el-autocomplete, .inline-input, .el-input__inner, .el-input, .el-input--mini  {
  
}
</style>


