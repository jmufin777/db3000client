<template>
  <div style="height:400px" class="obal" >
    <!-- Link:
  <router-link :to="{name: 'col', params: {ktery: 1 }}">Moduly</router-link> -->
    <my-layout>
      <div slot="hlavninew" style="position:fixed;top:4.8em;left:10px;background:#ffffff;text-align:left;width:100%" id="hlavninabidka" class="HlavniNabidka">
    <!-- <div slot="hlavninew" style="position:relative;top:0px;left:10px;background:#fdf0f7;text-align:left;width:100%">   -->
     <div >
      <input type="hidden" id="Zmenad" value="0" class="black white--text" style="width:100px">
      <work-but-menu :ID="ID" ref="w1">
        <span slot="tlacitkazakazky">
          <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
          @click="Nova()"
          >
          Nova
          </button>
          <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
              @click="Ulozit()"
          >
          Ulozit
          </button>
          <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
          >
          Nova upravou
          </button>
          <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
          >
          Smazat
          </button>
          <button  v-if="MAINMENULAST=='kalkulace'" class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="Ulozit('z')"
          >
          Ulozit jako zakazku
          </button>
          <button  v-if="MAINMENULAST=='zakazky'" class="px-4 tlacitkoMenu elevation-2 hoVer"
           @click="Ulozit('n')"
          >
          Ulozit jako nabidku
          </button>
        </span>
      </work-but-menu>
       <!-- JARDA : {{IDEFIXACTIVE}} / Delka kalkulace {{aKalkulace.length}} -->
     </div>
    <span v-if="false">
      {{ KalkulaceThis}} /Last {{ KalkulaceLast }}
      {{ $store.state.KalkulaceThis }} {{ TestRend }}
    </span>
      <!-- <menu-left slot="menuleft"></menu-left>
         <menu-hlavni></menu-hlavni> -->
    </div>
    <!-- {{aKalkulace}} -->
    <!-- <div   slot="kalkulace" style="position:fixed;width:100%;top:40em;overflow:scroll;height:70%;text-align:left;left:40px" id="obalKalkulaceButtons">
    </div> -->
<div  v-if="obrazovka_zak==1 && MAINMENULAST=='zakazky'" slot="kalkulace" style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%;max-height:600px" id="obalKalkulace"  class="stred">

  <div style="position:fixed; top:30em;right:8%;opacity:0.5;z-index:99999999">
      <span style="color:red; font-size:10em">1Z</span>
  </div>
  <div class="leva blue lighten-5" :style="f.pof( Sirka,98)" style="position:relative;" >


    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to2Z(polozka_zak)"
        v-if="!f.isEmpty(polozka_zak)"
        >
        Polozky 2Z
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to3Z(polozka_zak)"
        v-if="!f.isEmpty(polozka_zak)"
        >
        3Z
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden"
     >
        NICKA
    </button>
    <span class="elevation-0 ml-4 pr-2 pb-0 pt-0" style="position:absolute;border-radius:0px 0px 0px 0px;background:#e4eff8;right:30%">
           Rok:<input   v-model="search_zak_rok"   type="number" class="white px-0 "  style="height:15px;font-size:12px;background:white !important;width:4em;border: solid 1px black"  @keyup="Seznam('zak')">
           Cislo:<input v-model="search_zak_cislo" type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black" @keyup="Seznam('zak')">
           Neco:<input  v-model="search_zak"       type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:20em;border: solid 1px black" @keyup="Seznam('zak')" >

           <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
           <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
           </span>

    </span>

</div>

  <ta-ble3  :h="'530px;'+f.pof( Sirka,99)+';top:1px'"  :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'" :TopA="'top:28px'" :TopB="'height:28px'" :id="'tab_'+ID">
  <table slot="head"  :style="f.pof(Sirka,98)"  >
    <thead class="c-1 tdline">

      <th :style="f.pof(Sirka, 5)">Ikony</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','cislozakazky')">Č.zakazky</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','firma')">Klient</th>
      <th :style="f.pof(Sirka,20)" @click="Seznam('zak','','nazev')">Název</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','datumzadani')">Vytvoření</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','time_update')">Změna</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','nakladsum')">Nákladová cena</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('zak','','prodejsum')">Prodej</th>
      <th :style="f.pof(Sirka, 5)" @click="Seznam('zak','','(prodejsum-nakladsum)')">Zisk</th>

    </thead>
  </table>
  <table slot="body"  :style="f.pof(Sirka,98)"  >
    <tbody>
      <tr v-for="(polozka,idx) in seznam_zak" :key="idx"  @dblclick="to2Z(polozka);"  @click="FillFormWait(polozka)" style="cursor:pointer"
        :id="'tr_'+polozka.idefix"
        class="hoVer"
      >
        <td :style="f.pof(Sirka, 5)" ><button class="num green">Ikona</button></td>
        <td :style="f.pof(Sirka,10)"  >{{polozka.cislozakazky}}</td>
        <td :style="f.pof(Sirka,10)" class="leva pl-2" >{{polozka.firma}}</td>
        <td :style="f.pof(Sirka,20)" class="leva pl-2" >{{polozka.nazev}}</td>
        <td :style="f.pof(Sirka,10)" class="stred pl-2" >{{f.datum3(polozka.datumzadani)}}</td>
        <td :style="f.pof(Sirka,10)" class="leva pl-2" >{{f.datum3(polozka.time_update)}}</td>
        <td :style="f.pof(Sirka,10)" class="prava pr-4" >{{polozka.nakladsum}}</td>
        <td :style="f.pof(Sirka,10)" class="prava pr-4" >{{polozka.prodejsum}}</td>
        <td :style="f.pof(Sirka, 5)" class="prava pr-4" >{{polozka.prodejsum - polozka.nakladsum }}</td>

      </tr>
    </tbody>

  </table>
  </ta-ble3>
</div>

<div  v-if="obrazovka_zak==2 && MAINMENULAST=='zakazky'" slot="kalkulace" style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%" id="obalKalkulace"  class="stred">
<!-- {{polozky_zak}} -->
<div style="position:fixed; top:30em;right:30%;opacity:0.5">
      <span style="color:red; font-size:10em">2Z</span>
</div>
<div class="leva pt-0 pb-0">

    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="obrazovka_zak=1"
        >
        Kniha 1Z
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to3Z(polozka_zak)"
        v-if="!f.isEmpty(polozka_zak)"
        >
        3Z
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden"
     >
        NICKA
    </button>
</div>


  <table style="width:70%">
    <thead>
      <th>Ikony</th>
      <th>Práce</th>
      <th>Dodavatel</th>
      <th>Kč/ks</th>
      <th>ks</th>
      <th>Naklady celkem</th>
      <th>Marze</th>
      <th>Text na faktuře</th>

    </thead>
    <tbody>
      <tr v-for="(polozka2,idx2) in polozky_zak" :key="idx2"  @click="to3Z(polozka2)" style="cursor:pointer">
      <td>Ikony</td>
      <td>Práce</td>
      <td>Dodavatel</td>
      <td>{{polozka2.kcks}}</td>
      <td>{{polozka2.ks}}</td>
      <td>{{polozka2.naklad}}</td>
      <td>{{polozka2.marze}}</td>
      <td>{{polozka2.nazev}}</td>
      </tr>
    </tbody>
  </table>

</div>

<div  v-if="obrazovka_nab==1 && MAINMENULAST=='kalkulace'" slot="kalkulace" style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%" id="obalKalkulace">
  <!-- Seznam N {{MAINMENULAST}}
  Seznam Z {{MAINMENULAST}} -->
  <div style="position:fixed; top:30em;right:8%;opacity:0.5;z-index:99999999">
      <span style="color:red; font-size:10em;">1N</span>
  </div>

   <div class="leva cyan lighten-5" :style="f.pof( Sirka,98)" style="position:relative;" >
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to2N(polozka_nab)"
        v-if="!f.isEmpty(polozka_nab)"
        >
        Polozky 2N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to3N(polozka_nab)"
        v-if="!f.isEmpty(polozka_nab)"
        >
        3N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden"
     >
        NICKA
    </button>
        <span class="elevation-0 ml-4 pr-2 pb-0 pt-0 " style="position:absolute;border-radius:0px 0px 0px 0px;background:#e4eff8;right:30%">
           Rok:<input    v-model="search_nab_rok"   type="number" class="white px-0 "  style="height:15px;font-size:12px;background:white !important;width:4em;border: solid 1px black"  @keyup="Seznam('nab')">
           Cislo:<input v-model="search_nab_cislo" type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black" @keyup="Seznam('nab')">
           Neco:<input  v-model="search_nab"       type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:20em;border: solid 1px black" @keyup="Seznam('nab')" >


           <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
           <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
           </span>

    </span>
</div>

  <ta-ble3  :h="'530px;'+f.pof( Sirka,99)+';top:0px'"  :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'" :TopA="'top:28px'" :TopB="'height:28px'" :id="'tab_'+ID">
  <table slot="head"  :style="f.pof(Sirka,98)"  >
    <thead class="c-1 tdline">

      <th :style="f.pof(Sirka, 5)">Ikony</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','cislonabidky')">Č.zakazky</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','firma')">Klient</th>
      <th :style="f.pof(Sirka,20)" @click="Seznam('nab','','nazev')">Název</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','datumzadani')">Vytvoření</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','time_update')">Změna</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','nakladsum')">Nákladová cena</th>
      <th :style="f.pof(Sirka,10)" @click="Seznam('nab','','prodejsum')">Prodej</th>
      <th :style="f.pof(Sirka, 5)" @click="Seznam('nab','','(prodejsum-nakladsum)')">Zisk</th>

    </thead>
  </table>
  <table slot="body"  :style="f.pof(Sirka,98)"  >
    <tbody>
      <tr v-for="(polozka,idx) in seznam_nab" :key="idx"  @dblclick="to2N(polozka);"  @click="FillFormWait(polozka)" style="cursor:pointer"
        :id="'tr_'+polozka.idefix"
        class="hoVer"
      >
        <td :style="f.pof(Sirka, 5)" ><button class="num green">Ikona</button></td>
        <td :style="f.pof(Sirka,10)" >{{polozka.cislonabidky}}</td>
        <td :style="f.pof(Sirka,10)" class="leva pl-2" >{{polozka.firma}}</td>
        <td :style="f.pof(Sirka,20)" class="leva pl-2" >{{polozka.nazev}}</td>
        <td :style="f.pof(Sirka,10)" class="stred pl-2" >{{f.datum3(polozka.datumzadani)}}</td>
        <td :style="f.pof(Sirka,10)" class="leva pl-2" >{{f.datum3(polozka.time_update)}}</td>
        <td :style="f.pof(Sirka,10)" class="prava pr-4" >{{polozka.nakladsum}}</td>
        <td :style="f.pof(Sirka,10)" class="prava pr-4" >{{polozka.prodejsum}}</td>
        <td :style="f.pof(Sirka, 5)" class="prava pr-4" >{{polozka.prodejsum - polozka.nakladsum }}</td>

      </tr>
    </tbody>

  </table>
  </ta-ble3>


</div>
<div  v-if="obrazovka_nab==2 && MAINMENULAST=='kalkulace'" slot="kalkulace" style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%" id="obalKalkulace"  class="stred">
<!-- {{polozky_zak}} -->
<div style="position:fixed; top:30em;right:30%;opacity:0.3">
      <span style="color:red; font-size:10em">2N</span>
</div>
<div class="leva pt-0 pb-0">
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="obrazovka_nab=1"
        >
        Kniha 1N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer"
        @click="to3N(polozka_nab)"
        v-if="!f.isEmpty(polozka_nab)"
        >
        3N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden"
     >
        NICKA
    </button>
</div>

  <table style="width:90%"  >
    <thead>
      <th>Ikony</th>
      <th>Práce</th>
      <th>Dodavatel</th>
      <th>Kč/ks</th>
      <th>ks</th>
      <th>Naklady celkem</th>
      <th>Marze</th>
      <th>Text na faktuře</th>
    </thead>
    <tbody>
      <tr v-for="(polozka2,idx2) in polozky_nab" :key="idx2"  @click="to3N(polozka2)" style="cursor:pointer">
      <td>Ikony</td>
      <td>Práce</td>
      <td>Dodavatel</td>
      <td>{{polozka2.kcks}}</td>
      <td>{{polozka2.ks}}</td>
      <td>{{polozka2.naklad}}</td>
      <td>{{polozka2.marze}}</td>
      <td>{{polozka2.nazev}}</td>
      </tr>
    </tbody>
  </table>
</div>

<div  v-if="(obrazovka_nab==3 && MAINMENULAST=='kalkulace')  || (obrazovka_zak==3 && MAINMENULAST=='zakazky')" slot="kalkulace" style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%" id="obalKalkulace">
  <div class="leva pt-0 pb-2">
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" v-if="MAINMENULAST=='kalkulace'"
        @click="obrazovka_nab=1"
        >
        Kniha 1N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" v-if="MAINMENULAST=='zakazky'"
        @click="obrazovka_zak=1"
        >
        Kniha 1Z
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" v-if="MAINMENULAST=='kalkulace' && !f.isEmpty(polozka_nab)"
        @click="to2N(polozka_nab)"
        >
        2N
    </button>
    <button  class="px-4 tlacitkoMenu elevation-2 hoVer" v-if="MAINMENULAST=='zakazky' && !f.isEmpty(polozka_zak)"
        @click="to2Z(polozka_zak)"
            >
        2Z
    </button>

  <button  class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden"
     >
        NICKA
   </button>
</div>


<div style="position:fixed; top:30em;right:30%;opacity:0.5">
      <span v-if="MAINMENULAST=='zakazky'   && obrazovka_zak == 3" style="color:red; font-size:10em">3Z</span>
      <span v-if="MAINMENULAST=='kalkulace' && obrazovka_nab == 3" style="color:red; font-size:10em">3N</span>
  </div>



   <div v-cloak v-for="(aBefore,iBefore ) in aKalkBefore.filter(e=>{return e.active==false && (e.idefix<IDEFIXACTIVE || IDEFIXACTIVE==0) })" :key="iBefore"
     slot="kalkulace"
     style="position:relative;width:100%;top:0em;overflow:scroll"
     id="obalKalkulace2b"
   >
      <work-but
      :ID="'A_'+aBefore.idefix"
      :dataDB="aBefore"
      :ID2="ID+iBefore"
      :IDEFIX="+aBefore.idefix"
      :key="'AWB_'+iBefore+''+idRend"
      style="position:relative;left:4px"
       ></work-but>
        <!-- / {{aBefore.idefix }} -->
   </div>

  <div v-cloak v-for="idxK in 1" :key="'x'+idxK" slot="kalkulace"  >

        <work v-cloak slot="kalkulace" :typid="1" :kalkulkaceid="iKalk.kalkulkaceid"  :Poradi="0" v-for="(iKalk ,iK) in aKalkulace" :key="iK" class="myska" >
          <span v-if="iK==0"  slot="tlacitka" style="position:relative;left:4px">
            <!-- ||  IDEFIXACTIVE==0 -->
          <work-but  v-cloak v-if="aKalkBefore.length==0 || (IDEFIXACTIVE == 0 && aKalkulace.length >0 ) "
            :ID="'AB_'+iK"
            :ID2="ID+999666"
            :ZobrazMenu="true" :isOpen="true"
            :key="'AWC_'+iK+''+idRend"
            :IDEFIXACTIVE="IDEFIXACTIVE"
            >
          </work-but>

          <!-- && e.idefix==IDEFIXACTIVE -->
          <work-but v-cloak v-for="(aBefore1,iBefore1 ) in aKalkBefore.filter(e=>{return e.active==true  })"
           :ID="'AC_'+aBefore1.idefix"
           :ID2="ID+999666"
           :IDEFIX="+aBefore1.idefix"
           :IDEFIXACTIVE="IDEFIXACTIVE"
           :dataDB="aBefore1"
           :ZobrazMenu="true"
           :isOpen="true"
           :key="'AWD_'+iBefore1+''+idRend+''+900000"
           ></work-but>
            <!-- NAD {{IDEFIXACTIVE}} {{ NAZEVACTIVE }} -->

          </span>

          <span v-else style="position:relative;left:30px" slot="tlacitka" >
          <!-- <work-but-plus  :ID="iK" :ID2="ID+999666"></work-but-plus> -->
          <work-but-plus
          v-cloak
            :ID="iK"
            :ID2="ID+999666"
            :IDEFIX="IDEFIXACTIVE"
            :IDEFIXACTIVE="IDEFIXACTIVE"


            >
          </work-but-plus>
          </span>
          <span slot="leva" :key="'L'+ TestRend" style="position:relative;left:30px" >
          <work-left :typid="1" :ID2="ID" :kalkulaceid="iKalk.kalkulaceid">
                <button slot="akce" type="button" style="height:16px" class="white  px-0 cell pr-1 pl-1"
                :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                @click="removeKalk(iKalk.kalkulaceid)"
                  >
                  <a :name="iKalk.kalkulaceid"></a>
                    <i class="el-icon-delete white" size="mini"
                    :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                    ></i>
                  </button>
                <button slot="add" type="button" style="height:16px" class="white  px-0 cell pr-1 pl-1"
                  :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  @click="copyKalk(iK)"
                >
                    <a :name="iKalk.kalkulaceid"></a>
                    <i class="el-icon-plus white" size="mini"
                    :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                    ></i>
                  </button>
          </work-left>
          </span>

          <div  v-cloak v-for="(iSloupec,i) in iKalk.sloupecid" :key="i" :slot="'sloupec'+(i+1)"  :ref="iSloupec" :style="'backgroundcolor:blue;display:block;position:relative;left:30px'"  >
              <!-- {{iKalk.sloupecid}} -->
              <work-col v-cloak :typid="1" :kalkulaceid="iKalk.kalkulaceid" :sloupecid="iSloupec.id"  v-if="zobrazit==true || true" :key="TestRend" style="z-index:889977">
                  <button v-cloak slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalkCol(iKalk.kalkulaceid, iSloupec)" ><i class="el-icon-delete" size="mini"></i>
                  </button>
              </work-col>
          </div>

        <div slot="mezera" class="red">&nbsp;</div>


      </work>
  </div>
<div  v-for="(aBefore2,iBefore2 ) in aKalkBefore.filter(e=>{return e.active==false && (e.idefix>IDEFIXACTIVE && IDEFIXACTIVE>0 )})" :key="iBefore2+15000"
     slot="kalkulace"
     style="position:relative;width:100%;top:0em;overflow:scroll"
     id="obalKalkulace3b"
   >
      <work-but  :ID="'A_'+aBefore2.idefix" style="position:relative;left:4px"
      :dataDB="aBefore2"
      :ID2="ID+iBefore2"
      :IDEFIX="+aBefore2.idefix"
      :IDEFIXACTIVE="IDEFIXACTIVE"
      :key="'AWE_'+iBefore2+''+idRend"
       ></work-but>
       <!-- POD {{IDEFIXACTIVE}} / {{aBefore2.idefix }} -->
   </div>



  <div style="z-indeX:999999;background:black">
    <!--
    <hr>


    <work-but  :ID="'DX_'+10" style="position:relative;left:4px" ></work-but>
    <hr>
    HUHU

    <work-but  :ID="'EE_'+9" style="position:relative;left:4px" ></work-but>
    <hr>
    <work-but  :ID="'FF_'+8" style="position:relative;left:4px" ></work-but>
    <hr>
    //-->
  </div>

</div>

   <div style="right:1%;;top:216px;z-index:99999;" class="plovouci  grey lighten-1 pt-2 pb-2"  slot="Plovouci2" id="plovoucimapa11">
     <!--2 = prepinac -->
       <v-btn @click="panel(2,$event)" small class="yellow">MAPA</v-btn><br>
       <v-btn @click="panelPrehled(2,$event)" small class="yellow">Kalkulace</v-btn><br>
             <el-dropdown split-button size="small" trigger="click" @command="zmenaType"  :key="$store.state.KalkulaceThis"  class="px-1">
              Typ sloupce
              {{  $store.state.KalkulaceThis }}
            <el-dropdown-menu slot="dropdown" class="grey lighten-5" >
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
   </div>

  <transition name="fade" slot="PlovouciObsah" >
     <vue-draggable-resizable  class="grey lighten-2 pa-0 elevation-12" style="opacity:1;max-width:2000px;max-height:550px"
     :h="20" :w="1000" :x="-1000"
     :parent="false"
     :drag-handle="'.drag00'"
     :handles="[]"
      v-if="zobrazitPanel"

      >
      <div class="drag00 blue lighten-4" style="cursor:pointer;height:20px" :key="'M'+ TestRend">
      <div style="width:10%;float:left" >
        <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button></div>
      <div style="width:70%;float:left" >{{StatusMapy}}</div>
      <div style="width:19%;float:right;text-align:right" >
        <button class="mybutton pr-3 stred pl-3" @click="zobrazitPanel=!zobrazitPanel">x</button>
        </div>
      </div>
      <div class="pa-0 pt-1" style="width:100%;max-height:550px;overflow-y:auto">
        <v-card><v-card-text class="grey  pa-0">
          <draggable v-model="aKalkulace"  :options="{group: 'people2' }"
          @start="pripravRadky2()"
          @end="drag=false;chooseRadky2()"
          :move="chooseRadky"
          style="min-width:500px;">

          <div v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;float:none" class="grey lighten-2 pl-1 pt-1"

               >
              <div style="float:left;border:4px solid #eeeeee"

              >
              <!-- @click="setKalk2(i);f.Alert2('klik2')" -->
               <!-- @mouseover="setKalk2(i)"  -->
               <!-- @mouseenter="setKalk(iK.kalkulaceid)" -->
                <v-card
                 @click="setKalk(iK.kalkulaceid)"
                 ><v-card-text style="width:15em;font-size:12px;min-height:29px;cursor:pointer;text-align:left" class="pb-0 pt-0 grey lighten-3"
                :class="{'green lighten-1': $store.state.KalkulaceThis*1 == iK.kalkulaceid*1 }"
                 >
                 <a :href="'#'+iK.kalkulaceid" @click="setKalk(iK.kalkulaceid)"   :ref="'ref_'+iK.kalkulaceid" :id="'ref_'+iK.kalkulaceid + ID">

                 <span class="pr-2" > {{iK.kalkulaceid}}</span>
                 </a>
                 <span class="pl-0 "
                 >{{Kalkulace[i].data.txtStroj}}</span></span>
                  <span style="position:absolute;top:0px;right:1px" ><button type="button" class="elevation-1 mybutton"   @click="removeKalkAccId(i)">x</button></span>
                  <span style="position:absolute;bottom:0px;left:1px" class="elevation-1 mybutton" ><button type="button" @click="copyKalk(i)" >+</button></span>
                 </v-card-text></v-card>
              </div>
              <!-- <draggable v-model="iK.sloupecid"  :options="{group: 'people11' }"  @start="drag=true" @end="drag=false" :move="chooseSloupce" > -->
                <draggable v-model="iK.sloupecid"  :options="{group: 'people11' }"
                @start="pripravRadky2()"
                @end="drag=false;chooseRadky2()"
                :move="chooseSloupce" >
                <div v-for="(sl, iSloupcex ) in iK.sloupecid" :key="iSloupcex" style="float:left;border:2px solid white;width:8em;text-align:center" >
                  <!-- <v-card><v-card-text style="font-size:12px;height:28px" class="pb-1 pt-1" -->
                  <v-card><v-card-text style="font-size:12px;height:28px" class="pb-1 pt-1"
                  :class="{
                    'blue lighten-4': $store.state.KalkulaceColThis==sl.id,
                    'brown lighten-3': sl.type=='Mat1','green lighten-1': sl.type=='Laminace','orange lighten-1': sl.type=='Kasir','yellow lighten-2': sl.type=='Rezani','   lighten-2': sl.type=='Rezani'
                    , 'pink lighten-5': sl.type =='Baleni', 'red lighten-2': sl.type=='Jine'
                    , 'cyan lighten-3': sl.type =='DTP' , 'lime lighten-3': sl.type =='Externi'

                    }"

                  ><span
                  :class="{'elevation-12':$store.state.KalkulaceColThis==sl.id}"
                  >{{sl.type}} </span>
                  <span style="position:absolute;top:0px;right:1px" ><button type="button" class="elevation-1 mybutton" @click="deleteCol(i, iSloupcex)">x</button></span>
                  <span style="position:absolute;bottom:0px;left:1px" class="elevation-1 mybutton" @click="copyCol(i, iSloupcex)">
                    <button type="button" >+</button></span>
                  </v-card-text>
                  </v-card>
                </div>

              </draggable>
              <div style="width:10%;font-size:1px" >&nbsp;</div>
          </div>
         </draggable>
        </v-card-text></v-card>

      </div>

     </vue-draggable-resizable>
 </transition>

    <!-- <div style="position:absolute;top:20%;right:5%;z-index:99999;overflow:scroll;height:500px;border:solid 2px black" class="grey lighten-5" slot="obsah" v-if="zobrazitPanel" >  -->
  <transition name="fade" slot="PlovouciObsah2">
     <vue-draggable-resizable  class="grey lighten-2 pa-0 elevation-12" style="opacity:1;max-width:2000px;max-height:550px;z-index:1000"
     :h="20" :w="1000" :x="-1000"
     :parent="false"
     :drag-handle="'.drag00'"
     :handles="[]"
      v-if="zobrazitPrehled"
      >
      <div class="drag00 teal lighten-4" style="cursor:pointer;height:20px">
      <div style="width:10%;float:left" >
        <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button>
      </div>
      <div style="width:70%;float:left" >Kalkulace</div>
      <div style="width:19%;float:right;text-align:right" >
        <button class="mybutton pr-3 stred pl-3" @click="zobrazitPrehled=!zobrazitPrehled">x</button>
        </div>
      </div>
      <div class="pink" style="height:800px">
          <v-card v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;position:relative;">
                <v-card style="width:20%;float:auto">
                  <v-card-title style="font-size:12px;height:14px">{{iK.data.txtStroj}}</v-card-title>
                <v-card-text>
                <table>
                  <tr>
                    <td>Format</td><td>{{iK.data.txtFormat}}</td>
                  </tr>
                  <tr>
                    <td>Kusu</td><td>{{iK.data.FormatNakladKs}}</td>
                  </tr>
                </table>
                </v-card-text>
                </v-card>
                <v-card  style="width:60%;float:left">
                <v-card-title>
                  Detail
                </v-card-title>
                <v-card-text>
                <table><tr>
                  <td v-for="(Sloupec, idSloupce) in iK.sloupecid" :key="idSloupce">
                    {{Sloupec.type}}
                  </td>
                  </tr>
                </table>
                </v-card-text>
                </v-card>
            </v-card>
    </div>
     </vue-draggable-resizable>
  </transition>

<!-- <prehled slot="prehled" v-for="(itemP, iP) in aKalkulace" :key="iP"> -->

 <!-- <div style="position:fixed;top:30%;right:1%;z-index:99999" class="grey lighten-5" slot="Plovouci"> -->
   <div style="right:1%;z-index:99999" class="grey lighten-5" slot="Plovouci111">
         <el-dropdown split-button size="small" trigger="click" @command="zmenaType"  :key="$store.state.KalkulaceThis" >
            Typ sloupce {{ $store.state.KalkulaceThis }}
            <el-dropdown-menu slot="dropdown" class="grey lighten-5" >
              <el-dropdown-item  :command="'Mat1'">Materialy</el-dropdown-item>
              <el-dropdown-item  :command="'Laminace'">Laminace</el-dropdown-item>
              <el-dropdown-item  :command="'Kasir'">Kasir</el-dropdown-item>
              <el-dropdown-item  :command="'Rezani'">Rezani</el-dropdown-item>
              <el-dropdown-item  :command="'Baleni'">Baleni</el-dropdown-item>
              <el-dropdown-item  :command="'Jine'">Jine</el-dropdown-item>
              <el-dropdown-item  :command="'Externi'">Externi</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
     </div>

      <span slot="prehled" >
          <!-- <v-btn-toggle v-if="showPrehled==1 && iP==0"> -->
          <v-btn-toggle >
              <v-btn flat value="vyroba">
                Vyroba
              </v-btn>
              <v-btn flat value="expedice">
                Expedice
              </v-btn>
              <v-btn flat value="data">
                Data
              </v-btn>
              <v-btn flat value="vl">
                Vl
              </v-btn>
            </v-btn-toggle>
        <draggable v-model="aKalkulace"  :options="{group: 'people2' }" @start="drag=true" @end="chooseSloupce" >
          <div v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;">
             <div style="width:2%;float:left">
               <v-card><v-card-text>
                  {{iK.kalkulaceid}}
                </v-card-text></v-card>
              </div>
              <div style="float:left">
                 <v-card><v-card-title style="font-size:12px;height:14px">{{Kalkulace[i].data.txtStroj}}</v-card-title><v-card-text>
                    <div class="white" style="float:left">Rozmer {{Kalkulace[i].data.txtFormat}}</div><div>{{Kalkulace[i].data.FormatSirka}}x{{Kalkulace[i].data.FormatVyska}}mm</div>
                    <div class="white" style="float:left">Panelovat</div><div>{{Kalkulace[i].data.FormatPanelovat}}</div>
                    <div class="white" style="float:left">Naklad</div><div>{{Kalkulace[i].data.FormatNakladKs}}</div>
                </v-card-text></v-card>
              </div>
              <draggable v-model="iK.sloupecid"  :options="{group: 'people1' }" @start="drag=true" @end="chooseSloupce" >
              <div v-for="(sl, iSloupce ) in iK.sloupecid" :key="iSloupce" style="float:left">
                 <v-card><v-card-title style="font-size:12px;height:14px">Typ: {{sl.type}}</v-card-title><v-card-text>
                    <div class="white" style="font-size:12px;height:14px">Mat11:{{ getVal(sl.data.mat,"nazev")}}</div>
                    <div class="white" style="font-size:12px;height:14px">Stroj:{{ getVal(sl.data.stroj, "nazev")}}</div>
                    <div class="white" style="float:left">Naklad:</div>
                    <div class="white" style="float:left" >{{sl.data.naklad}}</div>
                </v-card-text></v-card>
              </div>
              </draggable>
              <div style="width:1%">.</div>
          </div>
        </draggable>

        </span>
     </prehled>
     <div slot="odkazy" v-if="aKalkulace.length">
     <!-- <v-pagination
      v-model="Navigace"
      :length="aKalkulace.length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"

    ></v-pagination> -->
    <draggable  v-model="aKalkulace"  :options="{group:{ name:'Kalkulace' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
      <span  v-for="(iKalk0 ,iK0) in aKalkulace" :key="iK0">
      <div style="position:relative;float:left;border: solid 2px white;width:30px;text-align:center;" class="elevation-5">
      <a :href="'#'+iKalk0.kalkulaceid" @click="setKalk(iKalk0.kalkulaceid)" :ref="'ref_'+iKalk0.kalkulaceid" :id="'ref_'+iKalk0.kalkulaceid + ID">
        &nbsp;{{iKalk0.kalkulaceid}}
        </a>
      </div>
      </span>
     </draggable>
      <div :ref="'neco11'"></div>
     </div>
    </my-layout>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'
import {mutations} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import MyLayout from './CalcMyLayout.vue'
//import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue'

import Work from './CalcWork.vue'       // Pracovni cast nahore, obshahuje levou cast a sloupce
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole
import WorkBut from './CalcWorkButton.vue' // Prehledova dole
import WorkButPlus from './CalcWorkButtonPlus.vue' // Prehledova dole
import WorkButMenu from './CalcWorkButtonMenu.vue' // Prehledova dole

import ListStroj from '../../services/ListStrojService'
import f from '@/services/fce'
// import query from '../../services/query'
import Q from '../../services/query'
import queryKalk from '../../services/fcesqlKalkulace'
import SQL from '../../services/fcesql'

//10411

import Prehled from './CalcPrehled.vue' // Prehledova dole
import { stringify } from 'querystring';

// import JQuery from 'jquery'
// let $ = JQuery

export default {

 components: {
   'prehled': Prehled,
    'menu-left': MenuLeft,
    'my-layout': MyLayout,
    'work': Work,
    'work-left': WorkLeft,
    'work-col': WorkCol,
    'work-but': WorkBut,
    'work-but-plus': WorkButPlus,
    'work-but-menu': WorkButMenu,
    // 'menu-hlavni': MenuHlavni,

 },
 data () {

   return {
     zobrazit:true,
     zobrazitPanel:false,
     zobrazitPrehled:false,
     StatusMapy: 'Mapa',
     Navigace: 0,
     Hlavni: 0,
     Left: 0,
     aKalkulace: [],
     lastIdK: -1,
     //KalkulaceThis: -1,
     KalkulaceLast: -1,
     CalcCount: 0,
     ColCount: 0,
     showPrehled: 1,
     qtest: [],
     ID: 0,
     Sirka: 1000,

     TestRend :0,
     idRend: 0,
     timeoutDrag: null,
     $: $,
     f: f,
     w1: WorkButMenu,
     idTmp:0,
     drag: false,
     cTable :'',
     aKalkBefore:[],
     aKalkAfter:[],
     Pocet:0,
     Znovu: 0,
     IDEFIXACTIVE: "0",
     IDEFIXACTIVELAST:0,
     NAZEVACTIVE:'',
     ID2ASK: -1,   //id2 z radky z ktere prepinam, modul vrati id2 na zaklade prideleneho idefixu
     MAINMENULAST:'',
     obrazovka_nab:1,
     obrazovka_zak:1,
     status:0,  //status pro ulozeni 1 = nova
     status_zak:0,  //status pro ulozeni 1 = nova
     status_nab:0,  //status pro ulozeni 1 = nova


     seznam_zak: [],
     seznam_nab:[],
     polozky_zak:[],
     polozky_nab:[],

     aktivni_zak:0,
     aktivni_nab:0,

     polozka_zak:[],
     polozka_nab:[],

     search_zak:"",
     search_nab:"",
     search_zak_rok:"",
     search_nab_rok:"",
     search_zak_cislo:"",
     search_nab_cislo:"",
     order_zak:"",
     order_nab:"",
     desc_zak:"",
     desc_nab:"",


     timeout: false,

   }
 },
 watch: {
  aKalkulace :function(a) {
    console.log("Sleduji kalkulace", a)
    try {
  //    this.$store.dispatch('setKalkulace', this.aKalkulace)
    } catch(err) {
      console.log('jebka')
    }
    //alert('a')
  }
 },

beforeDestroy: function () {
    //this.choicesSelect.destroy()
    //f.Alert('Nazdar bazer dest')
},
deactivated: function () {
     //f.Alert('Nazdar bazer 2 INDEX')
     // eventBus.$off('MenuHlavni')
     // eventBus.$off('MenuLeft')
     // eventBus.$off('SAVETEMPLATE')
     // eventBus.$off('SAVEZAZNAM')
     // eventBus.$off('DELETETEMPLATE')
     // eventBus.$off('AnswerID2')
     //this.$destroy();
      // remove the element from the DOM
     //this.$el.parentNode.removeChild(this.$el);
  // remove any data you do not want to keep alive
},

 async created () {
      const self = this
     self.cTable = 'calc_my_' + self.idefix
      eventBus.$off('MenuHlavni')
      eventBus.$off('MenuLeft')
      eventBus.$off('SAVETEMPLATE')
      eventBus.$off('SAVEZAZNAM')
      eventBus.$off('DELETETEMPLATE')
      eventBus.$off('AnswerID2')
      //alert('Tvorim')
     eventBus.$on('kalkulaceDelete',(serverDel) => {
     eventBus.$off('MatCol')
     eventBus.$off('Rend')
     console.log(serverDel)
     })


     //eventBus.$off()
    eventBus.$on('AnswerID2',(server)=>{
      self.ID2ASK = server.id2
      //f.Alert('Answer Index 1:' , self.ID2ASK , ' / Active : ', self.IDEFIXACTIVE )
    })

    eventBus.$on('MatCol', (server) => {
      console.log('Pridam jej Mt')
      setTimeout(function(){
        self.addColMat(server);
      },1000)
      //self.addColMat(server)
    })
    eventBus.$on('Rend', (server) => {
      self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      self.TestRend++
      //self.addColMat(server)
    })
     await eventBus.$on('SAVETEMPLATE', (server) => {

       if (server.data.nazev=='') {
          f.Alert2('Nazev je nutne vyplnit',self.user)
       } else {
          //f.Alert2('Co tu delas ?', "TEMPLATE!!!" ,server.data.idefix)
          queryKalk.setKalk(server.data,self.aKalkulace)
       }
       //f.Alert(JSON.stringify(server))
     }),
     await eventBus.$on('SAVEZAZNAM', (server) => {
       //f.Alert2('Co tu delas ?', "DATABAZE!! " )

       if (server.data.nazev=='') {
          f.Alert2('Nazev je nutne vyplnit',self.user)
       } else {
           //f.Alert2('Delka kalkulace', self.aKalkulace.length)

          //queryKalk.setVkladUser(server.data,self.aKalkulace,server.idefix, self.cTable)
          var SaveKalkulkace=true
          if (self.aKalkulace.length<1) {
            SaveKalkulkace=false
          }
          if (server.idefix != self.IDEFIXACTIVE){
    //        f.Alert(server.idefix , self.IDEFIXACTIVE , " - kalkulace ne"  )
            SaveKalkulkace = false
            self.saveZaznam(server,1)   // prepis radky
            //queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", false, server.idefix, SaveKalkulkace )

          } else
          if (server.idefix == self.IDEFIXACTIVE && server.idefix > 0 ) {
            //f.Alert(server.idefix , self.IDEFIXACTIVE , " - kalkulace Ano ZDE"  )
            self.saveZaznam(server,2)   //prepis radky a kalkulace
            SaveKalkulkace = true
            //queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", false, server.idefix, SaveKalkulkace )
          } else
          if (server.idefix == 0 && self.IDEFIXACTIVE==0 ) {
            //f.Alert(server.idefix , self.IDEFIXACTIVE , " - kalkulace Ano , VKLAD ANO KOD 3"  )
            self.saveZaznam(server,3) //vklad radky i kalkulace
            SaveKalkulkace = true
            //queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", true, server.idefix, SaveKalkulkace )
          }


       }
       //f.Alert(JSON.stringify(server))
     }),
     eventBus.$on('DELETETEMPLATE', (server) => {
       //f.Alert("SERVER ", JSON.stringify(server), " IDEFIX: ", server.idefix )
       //return
       if (server.idefix=='') {
         f.Alert2('Chyba pri pokusu o smazani',self.user)
       } else {
         // f.Alert('Template bude ulozen pod nazvem  ', server.data.nazev)
         // JSON.stringify(self.aKalkulace)
          queryKalk.deleteTemplate  (server.idefix)
       }
       return
       //f.Alert(JSON.stringify(server))
     }),
     eventBus.$on('MenuHlavni', (server) => {
      self.Hlavni=server.key
       if (server.key == 1999) {  //Polozky hlavniho menu
        if (self.MAINMENULAST==server.item) {
          // f.Alert('Porad jsem ', server.item)
        } else {
          // f.Alert('hlavni - zmena ', server.item)
          self.MAINMENULAST=server.item

          if (self.MAINMENULAST== 'kalkulace'){
            self.Seznam('nab')
            self.FillFormWait(self.polozka_nab)

          } else
          if (self.MAINMENULAST== 'zakazky'){
            self.Seznam('zak')
            self.FillFormWait(self.polozka_zak)
          }


          $("#Zmenad").get(0).value=0
         self.$store.dispatch('cleanKalk')
         self.aKalkulace=[]
         self.setZabalit()



        }
       return
       }
      if (server.key == 666) {  //Guma
         // alert(server.key)
         $("#Zmenad").get(0).value=0
         self.$store.dispatch('cleanKalk')
         self.aKalkulace=[]

         //self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

         this.$store.dispatch('setKalk',-1)
         //alert(self.KalkulaceThis)
         //self.KalkulaceThis = -1
         self.KalkulaceLast = -1
         self.IDEFIXACTIVE=0



         //f.Alert2(self.idefix)
         var q = `
         drop table if exists ${self.cTable} ;drop sequence if exists ${self.cTable}_seq
         ;create sequence ${self.cTable}_seq
         ;create table ${self.cTable} without oids as select * from calc_templates limit 0
         ;alter table ${self.cTable} add poradi serial
         ;alter table ${self.cTable} add active bool default false
         ;alter table ${self.cTable} add idefix_src bigint default 0
         ;alter table ${self.cTable} alter idefix  set default nextval('list2_seq')
         ;alter table ${self.cTable} alter id set default nextval('${self.cTable}_seq')
         `

         Q.post(0,q)
         .then (res => {
           // f.Alert2('Vytvorena nova databaze pro tvorbu VL', JSON.stringify(res))
           f.sleep(20)  //vetez kdyby nahodou neco bylo potreba sem prdnout jeste
           //f.Alert('OK 2')
           //f.Alert2('aaa')
           .then(res=> {
             self.aKalkBefore=[]
             self.aKalkAfter=[]
             f.Alert2('Hotovo')
           })
         })
         .catch(e => {
           f.Alert2('Doslo k chybal pri komunikaci s databazi', q, e )
         })

         setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }
      if (server.key == 667) {  //Aplikuj novy template
         self.$store.dispatch('cleanKalk')
         self.$store.dispatch('saveKalkCela', {data: server.Kalkulace })
         self.aKalkulace = server.Kalkulace
         // self.KalkulaceThis = -1
         this.$store.dispatch('setKalk',-1)

         self.KalkulaceLast = -1

         setTimeout(function(){
            self.TestRend=self.TestRend+1
            eventBus.$emit('enable')
              if (!f.isEmpty(server.id2)){
                $("#seek"+server.id2).focus()
                //f.Alert2('mam ID2', server.id2)
                setTimeout(function() {
                  var press = jQuery.Event("keypress");
                  press.ctrlKey = false;
                  press.which = 9;
                  press.keyCode = 9;
                  ///... any other event properties ...
                  $("#seek"+server.id2).trigger(press);

                },200)
              }

        },200)
      }

      if (server.key == 668) {  //Aplikuj novy template
          self.$store.dispatch('saveKalkCela', {data: server.Kalkulace2 })
          self.RozdelKalkulaci(server)


      }
      if (server.key == 669) {  //Aplikuj novy template
            //f.Alert2("DELETE", server.idefix)
            try {
              self.delVL(server.idefix)
            } catch(e) {
              f.Alert('delErr')
            }

          //self.RozdelKalkulaci(server)
      }
      if (server.key == 670) {  //Aplikuj novy template

            f.Alert2("670", server.idefix)

            self.saveVL(server.idefix)
          //self.RozdelKalkulaci(server)
      }
     if (server.key == 671) {  //Aplikuj novy template
            //f.Alert2("DELETE", server.idefix)


            // if (server.idefix==0 ){
            //   //f.Alert('Vklad by meyl byti ', server.idefix )
            //   alert('2')
            //   self.addVL() //Vlozi prazdny - kalkulaci i obsha  radky

            //   return

            // }
            try {
              self.setVL(server.idefix)
            } catch(e) {
              f.Alert2("HAVARIE")
            }

          //self.RozdelKalkulaci(server)
      }
      if (server.key == 672) {  //Aplikuj novy template
            //f.Alert2("DELETE", server.idefix)
            try {
              self.copyVL(server.idefix)
            } catch(e) {
              f.Alert2("HAVARIE")
            }

          //self.RozdelKalkulaci(server)
      }


      //Ukladani - rozdelena = 668

      if (server.key == 555) {  //Guma sloupce 1
        self.zobrazit=false
        self.TestRend++

        self.$store.dispatch('removeCol',{
            kalkulaceid: server.kalkulaceid,
            idxCol: server.idxCol,
        })

        self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
        setTimeout(function() {
        self.zobrazit=true
             eventBus.$emit('enable')
         },100)
      }

      eventBus.$emit('WorkLeft',{key: self.nRet })

      if (server.key == 777) {
        //self.aKalkulace=[]
        self.showPrehled=1
        //alert("aaa")
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }

      if (server.key < 11) {
        var beforeK = self.KalkulaceLast
        if (server.key == 9) {
          if (f.isZmena()){
            alert("Ulozte neulozena data - zabaleni,rozbaleni")
            return
          }
          self.novaSada()
          //Zabalit

        } else {
          self.addKalk(server.key)
        }

        if (server.key == 3) {
          setTimeout(function(){
           self.addKalkCol("DTP")
          },500)
        }
        if (server.key == 4) {
          //setKalk(iK.kalkulaceid)

          setTimeout(function(){
           // f.Alert(self.aKalkulace.length)
           self.addKalkCol("Externi")
          },500)
        }
        //self.addKalkCol()

        var n = 0

        // setTimeout(function(){

        //   alert(self.KalkulaceLast)
        // },5000)
      }
      if (server.key == 11) {

        self.addKalkCol()
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)

      }

    })

     eventBus.$on('MenuLeft', (server) => {
      self.Left=server.key
      self.ColCount++
      //self.addCol(server.key)

    })

 },
 async mounted () {
 // alert('Tvorim 22')
//   f.Info(queryKalk)

  const self=this
   this.ID = Math.round(Math.random() * 19834581377)
  this.aKalkulace = this.$store.state.Kalkulace

  self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
  await self.setIdefixActive()
  $("*").removeAttr('autocomplete');
  setInterval(function(){
    self.IsZmena()
  },1000)
  var xd = new Date()
  self.search_nab_rok= xd.getFullYear()
  self.search_zak_rok= xd.getFullYear()
/* funguje je potreba domlyslet
   $(document).on('keydown',`#tab_${self.ID} > tbody tr .num`,function (e) {
    if (e.which === 40) {
      $(this).parents("tr").next("tr").find('.num').focus();
    }
     });
*/

  //Po startu se nacte seznam zakazek
  await self.Seznam('zak')
  self.Sirka=  Math.ceil((window.innerWidth ) * 0.9)
//  f.Alert(  self.Sirka)




   //$(document).on('click', function(e){
     $(document).ready(function(){

       $(document).ready(function () {
        var x;
        var y;
        $(document).mousemove(function (e) {
            x = e.pageX;
            y = e.pageY;
        });
      /*
        var $dlg=$("#plovoucimapa11").dialog({
            autoOpen: true,
            show: "blind",
            hide: "explode",
        });
      */


        $(".myska").bind("mouseenter", function () {
          return

          var idObal="obalKalkulace"
          var idVztah="hlavninabidka"

          var vztah= document.getElementById(idVztah)
          //$("#hlavninabidka").hide()
          var poz=$("#hlavninabidka").offset()
          var top=Math.ceil(poz.top)  //konec hlavninabidky
          var thistop=this.offsetTop
          var h= $("#hlavninabidka").height()
          var posun = $("#"+idObal).scrollTop()

            //+ top
            if (posun > 0){
           //   f.Alert2(top+ "  /  "+ h + " / " + (thistop + poz ) , posun )
            }

          //$("#hlavninabidka").css("border","solid 20px blue")
           $("#plovoucimapa11").css("top",(thistop  ) +"px")

        //    $dlg.dialog('open'); // open

            //  $dlg.position({
            //             my: "center",
            //             at: "center",
            //             of: window,
            //             collision: "fit",
            //             // Ensure the titlebar is always visible
            //             using: function (pos) {
            //                 var topOffset = $(this).css(pos).offset().top;
            //                 if (topOffset < 0) {
            //                     $(this).css("top", pos.top - topOffset);
            //                 }
            //             }
            //   });

            //alert(x)
        });


        $(".myska").bind("mouseleave", function () {

            //$dlg.dialog('close'); // open
        });



    });



     })



    //$("#plovoucimapa").css('top', e.pageY);
    //$("#plovoucimapa").css('left', e.pageX);
   //});


   return
   if (this.aKalkulace.length > 0 && this.aKalkulace[0].kalkulaceid >-1 ) {
     this.$store.dispatch('setKalk',this.aKalkulace[0].kalkulaceid)
     this.KalkulaceThis = this.$store.getters.getKalk
     this.KalkulaceLast = this.$store.getters.getKalkLast

     //alert(this.KalkulaceThis )

   } else {
     //alert(2)
   }
 },
 beforeEnter: (to, from, next) => {
 //  this.$destroy()
 },
 methods: {
   async FillFormWait(polozka) {
      const self = this
      await self.FillForm(polozka);

      if (self.timeout){
       clearTimeout(self.timeout)
       self.timeout=false
       return
     }
       self.timeout=setTimeout(function() {
          self.FillForm(polozka);
         //console.log("Render col ", self.TestRend )

     }, 500)


   },
   async FillForm(polozka) {
       const self = this

       self.$refs.w1.aOsoba=   await SQL.getFirmaOsoba(polozka.idefix_firma)
       //self.$refs.w1.aFirma=   await SQL.getFirmaOsoba(polozka.idefix_firma)
       self.$refs.w1.aFirma=   await SQL.getFirma(0,polozka.firma,100000)

       self.$refs.w1.form.osoba =""
       if (self.MAINMENULAST=="zakazky") {
         self.$refs.w1.form.cislo                = polozka.cislozakazky
         self.polozka_zak=polozka
         self.status_zak=2
       } else
       if (self.MAINMENULAST=="kalkulace") {
         self.$refs.w1.form.cislo                = polozka.cislonabidky
         self.polozka_nab=polozka
         self.status_nab=2
       }



       self.$refs.w1.form.nazev                = polozka.nazev
       self.$refs.w1.form.idefix_firma         = polozka.idefix_firma
       self.$refs.w1.form.idefix_firmaosoba    = polozka.idefix_firmaosoba
       self.$refs.w1.form.nazevfirmy           = polozka.firma
       self.$refs.w1.form.idefix_obchodnik     = polozka.idefix_obchodnik
       self.$refs.w1.form.idefix_produkce      = polozka.idefix_produkce
       self.$refs.w1.form.obchodnik            = polozka.obchodnik
       self.$refs.w1.form.produkce             = polozka.produkce
       self.$refs.w1.form.osoba                = polozka.osoba

       self.$refs.w1.form.datumzadani               = f.datum20(polozka.datumzadani)
       self.$refs.w1.form.datumexpedice             = f.datum3(polozka.datumexpedice)

       self.$refs.w1.form.vyrobapopis_print         = (polozka.vyrobapopis_print+'').replace('null','')
       self.$refs.w1.form.poznamky                  = (polozka.poznamky+'').replace('null','')

       if (self.$refs.w1.aOsoba.length>0) {
             if (self.$refs.w1.aOsoba.length==1) {
              self.$refs.w1.form.idefix_firmaosoba = self.$refs.w1.aOsoba[0].idefix
              self.$refs.w1.form.osoba = self.$refs.w1.aOsoba[0].nazev
             }
            // f.Alert(self.$refs.w1.form.idefix_firmaosoba, " ", f.Jstr(self.$refs.w1.aOsoba), f.Jstr(polozka) )
            setTimeout(function(){
               $('#'+self.$refs.w1.fields['osoba']['nazev']).focus()
            },1000)
         }



   },
   async to2Z(polozka) {
     const self = this
      self.$refs.w1.aOsoba=   await SQL.getFirmaOsoba(polozka.idefix_firma)

     if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
       self.status_zak=2
       self.obrazovka_zak=2

       self.polozky_zak=  (await Q.all(self.idefix,`select * from zak_t_items where idefix_zak= ${polozka.idefix}`)).data.data
       await self.FillForm(polozka);
       //self.$refs.w1.form.osoba   = polozka.idefix_firma
       //f.Alert(polozka.idefix, f.Jstr(polozka))


     } else {
       this.$notify( { title: self.MAINMENULAST,  message: `Chyba pri nacteni polozek` , type: 'error', offset: 100, duration: 3000 })

     }



   },
   async to3Z(polozka) {
      const self= this
       self.obrazovka_zak=3



       eventBus.$emit(666)
       //var a = (await Q.post(self.idefix,`drop table if exists ${self.cTable}`))
       var qb=`create table ${self.cTable} without oids  as select * from zak_t_items where idefix_zak = ${polozka.idefix_zak}`
       //var b = (await Q.post(self.idefix,qb))

       //await  self.setZabalit()




      f.Alert2('3Z?', qb)
   },
   async to3N(polozka) {
      const self= this
       self.obrazovka_nab=3
       //eventBus.$emit(666)
       //var a = (await Q.post(self.idefix,`drop table if exists ${self.cTable}`))
       // var b = (await Q.post(self.idefix,`create table ${self.cTable} without oids  asselect * from zak_t_items where idefix_zak = ${polozka.idefix_zak}`))

       //await  self.setZabalit()




      f.Alert('3N?')
   },
  async to2N(polozka) {
  const self = this
      self.$refs.w1.aOsoba=   await SQL.getFirmaOsoba(polozka.idefix_firma)

     if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
       self.status_nab=2
       self.obrazovka_nab=2

       self.polozky_nab=  (await Q.all(self.idefix,`select * from nab_t_items where idefix_nab= ${polozka.idefix}`)).data.data
       await self.FillForm(polozka);
       //self.$refs.w1.form.osoba   = polozka.idefix_firma
       //f.Alert(polozka.idefix, f.Jstr(polozka))


     } else {
       this.$notify( { title: self.MAINMENULAST,  message: `Chyba pri nacteni polozek` , type: 'error', offset: 100, duration: 3000 })

     }

   },
   async Ulozit(kod=''){
     const self = this
     //f.Alert(self.IDEFIXACTIVE, self.aKalkulace.length)
    if (self.obrazovka_nab==3 || self.obrazovka_zak==3){
      await self.setVL(self.IDEFIXACTIVE,1)
    }

     var  data2= self.$refs.w1.form
     var q1=""
     var _idefix = 0
     if (kod=='n') {
       self.MAINMENULAST='kalkulace'
       self.status_nab=1; // Save AS nb - zakazku - zmena statusu na vklad
       eventBus.$emit('setmenu',{setmenu: 'kalkulace'})
     } else
     if (kod=='z') {
       self.MAINMENULAST='zakazky'
       self.status_zak=1; // Save AS nb - zakazku - zmena statusu na vklad
       eventBus.$emit('setmenu',{setmenu: 'zakazky'})

     }
          this.$notify( { title: `Kod kliku: ${kod} ${self.MAINMENULAST}`,  message: `Status kliku : Zak:   ${ self.status_zak } Nab:  ${ self.status_nab } ` , type: 'success', offset: 100, duration: 2000 })
     //f.Alert(kod, ' ',self.status_zak )

     //return
     /*
     insert into nab_t_items ( kod, nazev, obsah, kcks, ks, naklad, marze, prodej, marze_pomer, expedice_datum
     , expedice_cas, datum, poradi, id_src, active, idefix_src, idefix_zak, user_insert_idefix, user_update_idefix )
     select kod, nazev, obsah, kcks, ks, naklad, marze, prodej, marze_pomer, expedice_datum
     , expedice_cas, datum, poradi, id, active, idefix, 64078, 9, 9 from calc_my_9 where obsah::text >''
     */

     if (true ||  self.status_zak==2){

       if (self.status_nab==2 && self.MAINMENULAST=='kalkulace'){  //Tohle domyslet co vlastne vidim

           //self.$refs.w1.form.cislo
   //        f.Alert2(`select * from nab_t_list where cislonabidky= ${self.$refs.w1.form.cislo}`, ' :: ', self.status_zak, ' :: ',self.status_nab)
           var c = (await Q.all(self.idefix,`select * from nab_t_list where cislonabidky= ${self.$refs.w1.form.cislo}`)).data.data[0]

           var qset=(await self.UpdateSet(data2))
           if (!self.ZpravaValidace(data2)) {
            return
           }
           var q= `update nab_t_list ${qset} where idefix = ${c.idefix}`
           var d = (await Q.post(self.idefix,q))


           var iset=(await self.InsertSet(c.idefix))
           var del = (await Q.post(self.idefix,`delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`))

           var qitems = `insert into nab_t_items
             ${iset}
             from ${self.cTable} where obsah::text >''
           `
           qitems=qitems.replace("idefix_zak","idefix_nab")
           //f.Alert2(qitems)
           var e = (await Q.post(self.idefix,qitems))

           this.$notify( { title: self.MAINMENULAST,  message: `Zmeneno   ${ c.cislonabidky}` , type: 'success', offset: 100, duration: 3000 })
           self.Seznam('nab')

           self.status_nab=2;
       }
       if (self.status_zak==2 && self.MAINMENULAST=='zakazky'){
         //f.Alert('ZakTus')
          //self.$refs.w1.form.cislo = c.cislo

          var c = (await Q.all(self.idefix,`select * from zak_t_list where cislozakazky= ${self.$refs.w1.form.cislo}`)).data.data[0]
         if (!self.ZpravaValidace(data2)) {
          return
          }
          var qset=(await self.UpdateSet(data2))
          var q= `update zak_t_list ${qset} where idefix = ${c.idefix}`
          var d = (await Q.post(self.idefix,q))
          //Vlozit (zmenit ) polozky z kalkulace
          // f.Alert(self.cTable)
          var iset=(await self.InsertSet(c.idefix))
          var del = (await Q.post(self.idefix,`delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`))
          var qitems = `insert into zak_t_items
            ${iset}
            from ${self.cTable} where obsah::text >''
          `
          var e = (await Q.post(self.idefix,qitems))
          this.$notify( { title: self.MAINMENULAST,  message: `Zmeneno   ${ c.cislozakazky}` , type: 'success', offset: 100, duration: 3000 })
          self.Seznam('zak')
          self.status_zak=2;

       }
     }
     if (true || self.status==1){

       if (self.status_nab==1 &&  self.MAINMENULAST=='kalkulace'){
         //f.Alert('Vlozim novou', self.MAINMENULAST )

         q1=`select * from nab_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `
        if (!self.ZpravaValidace(data2)) {
          return
        }
        // f.Alert2(q1)
        // return
        var c = (await Q.all(self.idefix,q1)).data.data[0]

        self.$refs.w1.form.cislo = c.cislo
        //self.$refs.w1.form.cislo
        //f.Alert("NAB", f.Jstr(c));
        var qset=(await self.UpdateSet(data2))
        var q= `update nab_t_list ${qset} where idefix = ${c.idefix}`
        var d = (await Q.post(self.idefix,q))


        var iset=(await self.InsertSet(c.idefix, 'idefix_nab'))

        var del = (await Q.post(self.idefix,`delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`))
        var qitems = `insert into nab_t_items
          ${iset}
          from ${self.cTable} where obsah::text >''
        `
        var e = (await Q.post(self.idefix,qitems))
        this.$notify( { title: self.MAINMENULAST,  message: `Ulozeno ${ c.cislo}`, type: 'success', offset: 100, duration: 3000 })
        self.status_nab=2;
        self.Seznam('nab')


        //Vlozit polozky z kalkulace



       } else
       if (self.status_zak==1 && self.MAINMENULAST=='zakazky'){
        q1=`select * from zak_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `
         //f.Alert2(q1)
         //return

        if (!self.ZpravaValidace(data2)) {
          return
        }
        var c = (await Q.all(self.idefix,q1)).data.data[0]  //Pouziju polozky idefix, splatnost, zbytek by mel byt ve formulari spravne
        self.$refs.w1.form.cislo = c.cislo
        var qset=(await self.UpdateSet(data2))
        var q= `update zak_t_list ${qset} where idefix = ${c.idefix}`
        q=q.replace("'undefined'","''")



        var d
        try {
           d = (await Q.post(self.idefix,q))
        } catch (e) {
           this.$notify( { title: `ERROR ${e}`,  message: `${q}`, type: 'error', offset: 100, duration: 5000 })
           f.Alert2(`${q}`, data2.idefix_obchodnik, parseInt(data2.idefix_obchodnik ),data2.idefix_obchodnik*1 )
           return
        }

        //Vlozit (zmenit ) polozky z kalkulace
        //f.Alert(self.cTable)
        var iset=(await self.InsertSet(c.idefix))
        var del = (await Q.post(self.idefix,`delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`))
        var qitems = `insert into zak_t_items
          ${iset}
          from ${self.cTable} where obsah::text >''
        `
        var e = (await Q.post(self.idefix,qitems))
        this.$notify( { title: self.MAINMENULAST,  message: `Ulozeno  ${ c.cislo}` , type: 'success', offset: 100, duration: 3000 })
        self.status_zak=2;
        self.Seznam('zak')



        //Zmena statusu

        //f.Alert2(d)


        //f.Alert("ZAK", f.Jstr(c));

       }

       //f.Alert2(f.Jstr(data2))

    //    var necox = {"cislo":"1900900016","vl_rozsah":"","idefix_firma":"13464","idefix_firmaosoba":0,
    //    "nazev":"neco je to","cisloobjednavky":"petka","datumzadani":"18.08.2019 06:32:21",
    //    "datumexpedice":"28.08.2019","datumsplatnosti":null,"vyrobapopis":"","naklad":0,
    //    "poznamky":"rychle hlavne mez to uvidis to zaplat","zamknuto":null,"idefix_user_lock":0,
    //    "odemknuto":null,"idefix_user_unlock":0,"zamek":false,"uct_rok":2019,"login":"",
    //    "vyrobapopis_print":"uriznout tak aby ve skladu zbylo na dalsi","cislofaktury":"","idefix_obchodnik":0,
    //    "idefix_produkce":"9","idefix_last":0,"idefix_nabidka":0,"dodak0":"","objednavka0":"",
    //    "pdf0":"","informace":"",
    //    "nazevfirmy":"AbbVie s.r.o.",
    //    "osoba":"Belasová Iva","obchodnik":"","produkce":"mares mares "}
      }



   },
   ZpravaValidace(data2) {
     var zpravatxt=""
         if (f.isEmpty(data2.nazevfirmy)) {
           zpravatxt+= ', Firma '
           eventBus.$emit("Focus",{pole: 'firma'})

         }
         if (f.isEmpty(data2.idefix_obchodnik)) {
           zpravatxt+= ', Obchodnik '
        }
        if (f.isEmpty(data2.idefix_produkce)) {
           zpravatxt+= ', Produkce'
        }
        if (f.isEmpty(data2.nazev)) {
           zpravatxt+= ', Nazev zakazky (nabidky) '
        }
        if (f.isEmpty(data2.poznamky)) {
          data2.poznamky=''
        }
        if (f.isEmpty(data2.vyrobapopis_print)) {
          data2.vyrobapopis_print=''
        }
        if (zpravatxt>"" ) {
            this.$notify( { title: 'Upozorneni',  message: `Tyto povinne polozky nejsou vyplneny : ${zpravatxt}`, type: 'error', offset: 100, duration: 5000 })
            return false
        }
        return true
   },
   async InsertSet(idefix_zak, itemIdName='idefix_zak') {
     const self= this

     return `(
            kod,
            nazev,
            obsah,
            kcks,
            ks,
            naklad,
            marze,
            prodej,
            marze_pomer,
            expedice_datum,
            expedice_cas,
            datum,
            poradi,

            id_src,
            active,
            idefix_src,
            ${itemIdName},
            user_insert_idefix,
            user_update_idefix

        )

            select
            kod,
            nazev,
            obsah,
            kcks,
            ks,
            naklad,
            marze,
            prodej,
            marze_pomer,
            expedice_datum,
            expedice_cas,
            datum,
            poradi,


            id,
            active,
            idefix,
            ${idefix_zak},
            ${self.idefix},
            ${self.idefix}
            `
   },
   async UpdateSet(data2 ) {
           const self=this
           var qset= `set `
           if (self.MAINMENULAST=='zakazky') {
//             qset+=`cislozakazky        =  ${data2.cislo},`
           } else
           if (self.MAINMENULAST=='kalkulace') {
  //           qset+=`cislonabidky        =  ${data2.cislo},`
           }

            qset+=`vl_rozsah           =  '',`  // vymenit za funkci
            qset+=`idefix_firma        =  ${data2.idefix_firma},`  // pujde ci nepujde menit ?
            qset+=`idefix_firmaosoba   =  ${data2.idefix_firmaosoba},`  // pujde ci nepujde menit ?
            qset+=`nazev               =  '${data2.nazev}',`  // pujde ci nepujde menit ?
            qset+=`cisloobjednavky     =  '${data2.cisloobjednavky}',`  // pujde ci nepujde menit ?
            qset+=`cislofaktury        =  '${data2.cislofaktury}',`  // pujde ci nepujde menit ?
            //qset+=`datumzadani         =  '${data2.datumzadani}',`  // nebude - je jen proi vlozeni!!!!
            qset+=`datumexpedice       =  '${data2.datumexpedice}',`  // pujde ci nepujde menit ?
            //qset+=`datumsplatnosti     =  '${data2.datumsplatnosti}',`  // na starem datum studio, co to vlastneje
            qset+=`vyrobapopis         =  '${data2.vyrobapopis}',`  // pujde ci nepujde menit ?
            qset+=`odemknuto           =   null,`  // !!!!DULEZITE   - pri zmene zamku
            qset+=`zamknuto            =   null,`  // !!!!DULEZITE   - pri zmene zamku
            qset+=`idefix_user_unlock  =  '${data2.idefix_user_unlock}',`   // !!!!DULEZITE
            qset+=`zamek               =  '${data2.zamek}',`  // pujde ci nepujde menit ?
            qset+=`login               =   idefix2login(${self.idefix}),`  // pujde ci nepujde menit ?
            qset+=`vyrobapopis_print   =  '${data2.vyrobapopis_print}',`  // pujde ci nepujde menit ?
            qset+=`poznamky            =  '${data2.poznamky}',`  // pujde ci nepujde menit ?
            qset+=`idefix_obchodnik    =  '${data2.idefix_obchodnik}',`   // !!!!DULEZITE
            qset+=`idefix_produkce     =  '${data2.idefix_produkce}',`   // !!!!DULEZITE
            qset+=`idefix_last         =  '${data2.idefix_last}',`   // !!!!DULEZITE  - nova uprvou - originalni zakazka
            qset+=`idefix_nabidka      =  '${data2.idefix_nabidka}',`   // !!!!DULEZITE  - Vychozi nabidka (zakazka)
            qset+=`dodak0              =  '${data2.dodak0}',`        // !!!!DULEZITE  PRILOHY
            qset+=`objednavka0         =  '${data2.objednavka0}',`   // !!!!DULEZITE  PRILOHY
            qset+=`pdf0                =  '${data2.pdf0}' `          // !!!!DULEZITE  PRILOHY
            return qset

   },
async Seznam(ceho = 'zak', where ='', orderby=''){
    const self=this
    var desc=""

    var cWhereRow=""
    var cWhereCislo=""
    var cWhereRok=""
    var cislo=""
     var q=`select a.*,b.nazev as firma,c.*, osoba( coalesce(o.idefix,0)) as osoba
            , idefix2fullname(idefix_obchodnik) as obchodnik
            , idefix2fullname(idefix_produkce)  as produkce
            , coalesce(o.idefix,0) as idefix_osoba
          from ${ceho}_t_list a
          join list_dodavatel b on a.idefix_firma= b.idefix
          left join list_firmaosoba o on a.idefix_firmaosoba = o.idefix

          left join (
      	  select idefix_${ceho}, sum(naklad) as nakladsum, sum(prodej) as prodejsum from ${ceho}_t_items  group by idefix_${ceho}
      ) c on a.idefix = c.idefix_${ceho}`

        //order by a.idefix desc limit 100 `
        q= `select * from (${q}) a `

        if (ceho == 'zak') {


          cislo=  "cislozakazky"
          if (self.search_zak >'') {
              cWhereRow= self.search_zak
          }
          if (self.search_zak_rok >'') {
              cWhereRok= self.search_zak_rok
          }
          if (self.search_zak_cislo >'') {
              cWhereCislo= self.search_zak_cislo
          }
          if(f.isEmpty(orderby) && self.order_zak>'' ){
            //f.Alert2("TED",self.order_zak, ' b: ', orderby )
            orderby = self.order_zak
            desc    = self.desc_zak
          }
          else
          if (self.order_zak == orderby){
              if (self.desc_zak==''){
                self.desc_zak='desc'
              } else {
                self.desc_zak=''
              }

          } else {
            self.order_zak=orderby
            self.desc_zak=''
          }

          desc = self.desc_zak
        }
        if (ceho == 'nab') {
          //where podmninka
          cislo=  "cislonabidky"
          if (self.search_nab >'') {
              cWhereRow= self.search_nab
          }
          if (self.search_nab_rok >'') {
              cWhereRok= self.search_nab_rok
          }
          if (self.search_nab_cislo >'') {
              cWhereCislo= self.search_nab_cislo
          }
          if(f.isEmpty(orderby) && self.order_nab>'' ){
            //f.Alert2("TED",self.order_zak, ' b: ', orderby )
            orderby = self.order_nab
            desc    = self.desc_nab
          }
          else
          if (self.order_nab == orderby){

              if (self.desc_nab==''){
                self.desc_nab='desc'
              } else {
                self.desc_nab=''

              }

          } else {
            self.order_nab=orderby
            self.desc_nab=''
          }

          desc = self.desc_nab
        }

        //where to_aascii(row(a.*)::text)  ilike '%ruzi%'

        // f.Alert2(orderby)

        if (orderby >'') {
          if (orderby=="cislozakazky" || orderby=="cislonabidky"){
            q= `select * from (${q}) a order by right(${orderby},5) ${desc}`
          } else {
            q= `select * from (${q}) a order by ${orderby} ${desc}`

          }
        } else {
          q= `select * from (${q}) a order by a.idefix desc`
            //f.Alert2(q)
        }
        if (cWhereRok>''){
           /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
           q= `select * from (${q}) a  where left(${cislo},2) = right(${cWhereRok},2)`
           //f.Alert2(q)
        }
        if (cWhereCislo>''){
           /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
           q= `select * from (${q}) a  where right(${cislo},5)::bigint = right(${cWhereCislo},5)::bigint`
           // f.Alert2(q)
        }
        if (cWhereRow>''){
           /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
           q= `select * from (${q}) a  where to_aascii(row(a.*)::text)  ilike '%${cWhereRow}%'`
           //f.Alert2(q)
        }
        q= `select * from (${q}) a limit 200 `


         //f.Alert2(q)
        if (ceho == 'zak'){
          self.seznam_zak = (await Q.all(self.idefix,q)).data.data
        }
       if (ceho == 'nab'){
          self.seznam_nab = (await Q.all(self.idefix,q)).data.data
        }



   },

   async Nova(){
     const self = this
     var c= 0



    if (self.MAINMENULAST=='zakazky')  {
      self.status_zak=1
        var c = (await Q.all(self.idefix,`select newzak(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce`)).data.data[0]
        // `select newzak(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce`
    }
    if (self.MAINMENULAST=='kalkulace')  {
      self.status_nab=1
        var c = (await Q.all(self.idefix,`select newnab(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce `)).data.data[0]
        //select newnab(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce
    }
    //f.Alert('A',f.Jstr(c));
    c.exp=f.datum3(c.exp)
    c.zadani = f.datum20(c.zadani)

    //f.Alert('B',f.Jstr(c));

       eventBus.$emit('NovaZN', {
         id: self.MAINMENULAST,
         cislo: c.cislo,
         exp: c.exp,
         prod: self.idefix,
         prod_txt : c.produkce,
         zadani:c.zadani

     })


     //await self.setVL(self.IDEFIXACTIVE,1)


     //f.Alert('Nova ', self.MAINMENULAST )
   },
   async setIdefixActive() {
     const self=this
     self.aKalkBefore.forEach(el=>{
      if (el.active==true){
        self.IDEFIXACTIVE =el.idefix
        self.NAZEVACTIVE=el.nazev
        return
      }
    })
   },
   async setIdefixDeActive() {
     const self=this
     self.aKalkBefore.forEach(el=>{
      if (el.active==true){
        self.IDEFIXACTIVE =0
        self.NAZEVACTIVE=''
        el.active=false
        return
      }
    })
   },
   IsZmena() {
     $("input[type=text]").off('change');
      $("input[type=text]").change( function(){
        //$(this).css("{background:white}")
         //this.style.color="yellow"
         // this.className="d3"
         //this.style.
         this.style.fontSize = "120%";

        //$(this).hide(1000)
        $("#Zmenad").get(0).value++
      })

     $("input[type=checkbox]").off('change');
      $("input[type=checkbox]").change( function(){
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++
      })
      $("input[type=radio]").off('change');
      $("input[type=radio]").change( function(){
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++
      })

      $("input[type=number]").off('change');
      $("input[type=number]").change( function(){
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++

      })
      $("textarea").off('change')
      $("textarea").change( function(){
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++
      })
      $("select").off('change')
      $("select").change( function(){
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++
      })
   },

   async RozdelKalkulaci(server){
     const self = this
     var dataRadka={}
     // f.Alert(server.id2)
     dataRadka=f.dataRadkaID(server.id2)
     server.data["expedice_datum"] = dataRadka.expedice_datum
     server.data["expedice_cas"]  =  dataRadka.expedice_cas
     //f.Alert('data2', self.IDEFIXACTIVE)
      //f.Alert('Radka SEND: ', f.Jstr(dataRadka), 'CAS: ', f.Jstr(dataRadka.expedice_cas))

      await queryKalk.VkladUser(dataRadka,server.Kalkulace1 ,self.cTable,dataRadka.nazev , false , self.IDEFIXACTIVE)
      await queryKalk.VkladUser(server.data,server.Kalkulace2 ,self.cTable, "Nová řádka", true,0)


      //self.aKalkBefore=[]
      self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
      self.setIdefixActive()
      setTimeout(function(){
        self.idRend++
      },500)
      //f.Alert2("BEF", f.Jstr(self.aKalkBefore))

      // setTimeout(function(){
      //   self.idRend++
      // },500)
      //f.Alert(server.id2, $("#seek"+server.id2).val())
   },
   async setRender() {
     const self = this

     self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))

      try {
        await self.setIdefixActive()
      } catch (e) {
         f.Alert('Chyba ACTIVE')
         console.log('Chyba ACTIVE')
      }
      await f.sleep(500)
      //setTimeout(function(){
      self.idRend++
      return  self.aKalkBefore.length
   },
    async delVL(idefix){
     const self = this
     try {
      if (idefix>0) {
        await queryKalk.delete(idefix ,self.cTable )
    //    alert('Vymazano 1')
      }

      if (idefix == self.IDEFIXACTIVE) {
        try {
          self.aKalkulace =[]
          self.$store.dispatch('cleanKalk')
        } catch(e) {
          f.Alert('err 33')
        }
      }
//      alert('Vymazano 2')
      await self.setRender()
  //    alert('Vyazano')
      return

      }
      catch (e) {
        f.Alert('Dell Er')
        return
      }

   },

    async copyVL(idefix){
     const self = this

      await queryKalk.CopyUser(idefix ,self.cTable )


      self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
      await self.setZabalit()

      //self.aKalkBefore=[]
      //self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
      //f.Alert(self.IDEFIXACTIVE, " P{RED")
      //await self.setIdefixActive()
      //f.Alert(self.IDEFIXACTIVE, " P O")
      //var tmp = self.IDEFIXACTIVE
      //self.IDEFIXACTIVE = 0
      //f.Alert(self.IDEFIXACTIVE)
      //await self.setVL(tmp)
      return

      setTimeout(function(){
        self.idRend++
        self.TestRend++
      },500)

   },
  async saveZaznam(server,kod){
      const self = this
      var SaveKalkulkace = false


      if (kod == 1 ){
        SaveKalkulkace = false  //Ulozeni radky zavrene kalkulace
        //f.Alert('kod 1 - prepis bez Kalk')
        //saveZaznam(server,SaveKalkulace,1)
        await queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", false, server.idefix, SaveKalkulkace )

        //f.Alert(kod," : ", self.IDEFIXACTIVE)

      }
      if (kod == 2 ){
        SaveKalkulkace = true  //Ulozeni otevrene kalkulace
        //f.Alert('kod 2 - prepis - otevrena Kalkulace')
        //saveZaznam(server,SaveKalkulace,1)
        await queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", false, server.idefix, SaveKalkulkace )
        //self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
        //await self.setIdefixActive()
        //f.Alert(kod," : ", self.IDEFIXACTIVE)
      }
      if (kod == 3){
        //saveZaznam(server,SaveKalkulace,3)
        // f.Alert('kod 3 - Vklad - otevrenakalkulace')
        SaveKalkulkace = true
        await queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", true, server.idefix, SaveKalkulkace )
        .then(res=>{
           this.$message({
                message: 'Vlozeno',
                type: 'error',
                center: true,
                duration: 3000
             })
        })

        //self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
        //await self.setIdefixActive()
        //f.Alert(kod," : ", self.IDEFIXACTIVE)
      }
      if (kod == 4){
        f.Alert('kod 4 - prepis - en kalkulace ne datova radka')
        //Pri prepnuti ulozit kalkulaci a data v radce ponechat
        SaveKalkulkace = true
        await queryKalk.VkladUser(server.data, self.aKalkulace, self.cTable, "", false, server.idefix, SaveKalkulkace, false )
        //self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
        //await self.setIdefixActive()
        //f.Alert(kod," : ", self.IDEFIXACTIVE)
      }
      return
      $("#Zmenad").get(0).value=0
           //var nK=            await(queryKalk.getTemplateUser(idefix,self.cTable))

           self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))
           await self.setIdefixActive()
           // alert(self.IDEFIXACTIVE)


           //self.aKalkulace=[]
         //self.aKalkulace =  f.Jparse(nK[0].obsah)
         //self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
         //await  self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })


         self.IDEFIXACTIVELAST= self.IDEFIXACTIVE
         setTimeout(function(){
            self.idRend++
            self.TestRend++
         },500)

  },

  async addVL(){
    const self=this
    //await eventBus.$emit('AskID2',{idefix:0})
alert(' addVL() 10')

    setTimeout(function(){
      //var dataRadka=f.dataRadka(self.ID2ASK)
      var dataRadka=f.dataRadka(0)
//        f.Alert('Answer Index 2B:' ,  ' / Active : ', self.IDEFIXACTIVE, f.Jstr(dataRadka) )
  //      return

      self.saveZaznam({idefix: self.IDEFIXACTIVE, data: dataRadka   },3)
      .then(res=>{
        //f.Alert('Vlozeno')
      })
//      f.Alert('Answer Index 2B:' , self.ID2ASK , ' / Active : ', self.IDEFIXACTIVE, f.Jstr(dataRadka) )
    },50)

//dataRadka=f.dataRadka(server.id2)
    // f.Alert('jsem add')
  },

    async novaSada() {
     const self = this
     var idefixActive = self.IDEFIXACTIVE
     var objFiluta

     if (idefixActive>0){
        await  self.setRozbalit(idefixActive)
        await  self.setZabalit()
        await  self.addKalk(1)
        await  self.setRender()
        await     f.sleep(500)
        objFiluta=f.getElByIdefix('seek',0)
        if (objFiluta){
          objFiluta.focus()
        }


        return
      }

      if (idefixActive==0 && self.aKalkulace.length > 0 ) {
        // f.Alert('Nova sada = kdyz uz je jedna otevrena')
        var neco11=new Promise((resolve,reject) =>{
          var dataRadka=f.dataRadka(0)
          resolve(dataRadka)
        })
        neco11
        .then((resolve)=>{
            //f.Alert('Otevrena nova kalkulace - vlozim', f.Jstr(resolve))
            //f.sleep(1000)
            if (f.isEmpty(resolve.nazev)){
              f.Alert('Nazev neni vyplnen, oznacuji ')
              objFiluta=f.getElByIdefix('seek',0)
              objFiluta.focus()
              return
            } else {
              self.saveZaznam({idefix: 0, data: resolve   },3)
              .then(()=>{
                self.setRender()
                .then(()=>{
                  self.setZabalit()
                })
                 .then(()=>{
                  self.addKalk(1)
                 })
              })
            }
        })
          // self.addVL()
      //  return
      }
      if (idefixActive==0 && self.aKalkulace.length == 0 ) {
          await self.addKalk(1)
          await    f.sleep(500)
          //alert('mam')
          objFiluta=f.getElByIdefix('seek',0)
        if (objFiluta){
          objFiluta.focus()
        }
      }

   },
  async SaveAll(idefix=0, PreskocChybu=0) {
    const self = this
    var dataRadka={}

    var idefixActive=self.IDEFIXACTIVE
    var neco=$("#Zmenad").get(0).value
    //$('div').css({opacity:'0.8'})

      if (neco < 0 ) {  //neuklada
        return
      }
    self.Pocet=0

//self.Znovu=2
//while(self.Z)
await f.asyncForEach(self.aKalkBefore,async (el)=> {
if (el.idefix > 0 ) {
        dataRadka= f.dataRadka(el.idefix)

        if (f.isEmpty(dataRadka.nazev)){
          dataRadka.nazev+=" ERROR (1) "
          alert('Error' + dataRadka.nazev )
          var objFiluta=f.getElByIdefix('seek',el.idefix)
              objFiluta.focus()
              self.Pocet=-1
              if (PreskocChybu==0){
                 return
              }

        }
        else
        if (self.aKalkulace.length>0 && self.IDEFIXACTIVE == el.idefix ) {

            await self.saveZaznam({idefix: el.idefix, data: dataRadka   },2)
            .then(res=>{
              self.Pocet++
            })
        } else {
            await self.saveZaznam({idefix: el.idefix, data: dataRadka   },1)
            .then(res=>{
              self.Pocet++
            })
        }
        //f.Alert(f.Jstr(dataRadka))
      }

})
if (self.Pocet == - 1) {
  f.Alert('Pochybeni')
  return -1
}
     if (idefixActive==0 && self.aKalkulace.length>0 && f.getElByIdefix('seek','0')){
       //alert('1 Vklad by idefix - zabalit Active 0' )
       dataRadka=  f.dataRadka(idefix)
      try {
        await  self.saveZaznam({idefix: idefixActive, data: dataRadka   },3)
        await  self.setRender()
        await  self.setZabalit()
        // f.Alert('Vkladam prvni')
        self.Pocet++
      } catch (e) {
       f.Alert('Vklad selhal')
      }
     }
     $("#Zmenad").get(0).value=0
     //alert('Pocet ' + self.Pocet)
      return 0


     //$("*").prop("disabled", false);
     //self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))

//Aktualizece

  },
  async setRozbalit(idefix) {
     const self = this
       await queryKalk.setActive(idefix,self.cTable)
        self.IDEFIXACTIVE=idefix
        var nK= await(queryKalk.getTemplateUser(idefix,self.cTable))   //Aktualni kalulkulace
        //f.Alert2(f.Jstr(nK))
        self.aKalkulace =  f.Jparse(nK[0].obsah)
        self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))   //Vsechny kalkulace - seznam
         //self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
         await  self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })
         self.setIdefixActive()

         self.IDEFIXACTIVELAST= self.IDEFIXACTIVE
           setTimeout(function(){
            self.idRend++
            self.TestRend++
         },100)
  },
  async setZabalit() {
    const self=this
       self.aKalkulace =[]
       self.$store.dispatch('cleanKalk')
       await queryKalk.setActive(0,self.cTable,0)  //tj.vypne vse, nezalezina idefixu
       await self.setIdefixDeActive()
  },
  async setVL(idefix, jenUloz=0) {
     const self = this
      var idefixActive=self.IDEFIXACTIVE
      var neco=$("#Zmenad").get(0).value
      if (idefixActive==0 && self.aKalkulace.length>0 && idefix>0) {
            //alert('Je  treba ulozit neulozenou')
          var dataRadka=  f.dataRadka(0)
          try {
            await  self.saveZaznam({idefix: 0, data: dataRadka   },3)
            await  self.setRender()
            await  self.setZabalit()

            self.Pocet++
          } catch (e) {
          f.Alert('Vklad selhal')
          }
//        alert('Bylo  treba ulozit neulozenou')
  //      return
      }
        var necoSave=0
            necoSave = await self.SaveAll(idefix)
            if (jenUloz==1) {
              await  self.setZabalit()
              // alert('Jen jsem to ulozil')
              return
            }
       //alert("Save Result " + necoSave)
       if (necoSave < 0 ) {
         return
       }


      if (idefixActive==0  && idefix>0){
    //      alert(idefixActive +" " + idefix +' Rozbalit ')
         await self.setRozbalit(idefix)
      }
//      f.Alert(idefixActive, " / ", idefix)
      if (idefixActive>0  && idefix == idefixActive ){
    //      alert(idefixActive +" " + idefix +' Rozbalit ')
            // alert('Zabaliti')
          await self.setRozbalit(idefix)
          await self.setZabalit(idefix)
          //await self.setRozbalit(idefix)
      }
      if (idefixActive>0  && idefix != idefixActive && idefix > 0 ){
          await self.setZabalit()
          await self.setRozbalit(idefix)

      }


      return

       self.aKalkulace =[]
       self.$store.dispatch('cleanKalk')
       await queryKalk.setActive(0,self.cTable,0)  //tj.vypne vse, nezalezina idefixu
       self.setIdefixDeActive()

  },

   async setVLOld(idefix) {
     const self = this
      var idefixActive=self.IDEFIXACTIVE

       await self.SaveAll(idefix)
     //  return


//       eventBus.$emit('AskID2',{idefix:idefix})

       //return
     // alert('setVL '+ idefix)

     var neco=$("#Zmenad").get(0).value
     if (idefixActive==0 && self.aKalkulace.length>0){
       // await self.addVL()
        f.Alert('Pridat novou kalkulaci!!!')
       return
     }

      return

       if  (neco*1 >= 0) {


          //self.ID2ASK = -2
        //  await eventBus.$emit('AskID2',{idefix: idefixActive})


             //alert('Answer Index 2A: \n' + idefix + ' \n / Active :'+ idefixActive )
             //var dataRadka= f.dataRadka(self.ID2ASK)

             var dataRadka1= f.dataRadka(idefix)
             var dataRadka2= f.dataRadka(idefixActive)

             if (self.aKalkulace.length > 0 ) {
               if (idefixActive == 0) {
//                 alert('kalkulace otevrena - vlozit novy')
               } else {
  //                alert('kalkulace otevrena - update pro '+ self.IDEFIXACTIVE)
                  self.saveZaznam({idefix: self.IDEFIXACTIVE, data: dataRadka2   },2)
                  if (idefix==self.IDEFIXACTIVE) {
    //                alert('stejne, druhou nedelam')
                  } else {
                    self.saveZaznam({idefix: idefix, data: dataRadka1   },1)
                  }
               }
            $("#Zmenad").get(0).value=0
        } else {
             alert('bez kalkulace')
            //self.saveZaznam({idefix: idefix, data: dataRadka1   },1)   //obe bez kalkulace
            //self.saveZaznam({idefix: idefix, data: dataRadka2   },1)
            $("#Zmenad").get(0).value=0

           //return
        }
        }

     if (idefix == idefixActive) {

       self.aKalkulace =[]
       self.$store.dispatch('cleanKalk')
       await queryKalk.setActive(0,self.cTable,0)  //tj.vypne vse, nezalezina idefixu
       self.setIdefixDeActive()
       return
     }

     //&&  self.IDEFIXACTIVELAST>0



     await queryKalk.setActive(idefix,self.cTable)
     // return
     self.IDEFIXACTIVE=idefix
     //self.IDEFIXACTIVE =  (await queryKalk.getActive(self.cTable))
     // f.Alert2("RETAC", self.IDEFIXACTIVE)
        var nK= await(queryKalk.getTemplateUser(idefix,self.cTable))   //Aktualni kalulkulace

         //self.aKalkBefore=[]
         self.aKalkBefore = await (queryKalk.getTemplatesUser(self.cTable))   //Vsechny kalkulace - seznam


         //self.aKalkulace=[]
         self.aKalkulace =  f.Jparse(nK[0].obsah)
         //self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
         await  self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })
         self.setIdefixActive()

         self.IDEFIXACTIVELAST= self.IDEFIXACTIVE
         setTimeout(function(){
            self.idRend++
            self.TestRend++
         },500)

         // self.KalkulaceThis = -1
         // self.KalkulaceLast = -1
         return
   },

   async saveVL(idefix) {
     const self = this
     f.Alert('Uloz - update saveVL ', idefix)
     //var nK= await(queryKalk.getTemplate(self.form.idefix))
   },
   getVal(obj,klic) {
     var cRet =""

     if (obj){
       if (obj[klic]){
              return obj[klic]
       }
     }
     return "neni "+ klic
   },
   panel(zobraz=1,e=0){
     const self=this
     switch (zobraz){
       case 1:
        self.zobrazitPanel=true
        break;
       case 0:
        self.zobrazitPanel=false;
        break;
       case 2:
        self.zobrazitPanel=!self.zobrazitPanel;
       break;
     }
   },
  panelPrehled(zobraz=1,e=0){
      const self=this
      switch (zobraz){
        case 1:
          self.zobrazitPrehled=true
          break;
        case 0:
          self.zobrazitPrehled=false;
          break;
        case 2:
          self.zobrazitPrehled=!self.zobrazitPrehled;
        break;
      }
    },
    deleteCol(iK,iS) {
      if (!confirm('Smazat sloupec') ) return ;
      eventBus.$emit('MenuHlavni',
        {
          kalkulaceid: iK,
          idxCol: iS,
          key: 555
        })
    },
    async copyCol(iK,iS) {
      const self = this
      await self.pripravRadky2()
      .then(res=>{
        self.$store.dispatch('copyCol',{
          kalkulaceid: iK,
          sloupecid: iS,
      })
      })
      .then(res2=>{
        self.pripravRadky2()
      })
      .then(res3=>{
        self.TestRend++;
      })
      return
    },
    copyKalk(iK) {
      const self = this
      $( ".obal" ).animate({opacity: 0.7}, 200);

      self.$store.dispatch('copyKalk',{
          kalkulaceid: iK,
      })
      setTimeout(function(){

        self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

        setTimeout(function(){
          self.TestRend++;
          $( ".obal" ).animate({opacity: 1}, 200);
        },300)
      },100)

      return

    },
    async removeKalkAccId(idK) {
      const self=this
      if (!confirm('Smazat radek') ) return ;
      //await self.pripravRadky2()
      $( ".obal" ).animate({opacity: 0.7}, 200);
       self.$store.dispatch('removeKalkAccId',{
          kalkulaceid: idK,
      })
      setTimeout(function(){
        self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
        setTimeout(function(){
          self.TestRend++;
          $( ".obal" ).animate({opacity: 1}, 200);
        },300)
      },100)

   },
  async chooseSloupce (event, bEvent) {
    //alert("sloupy")
    const self= this
    return
   },
    async chooseRadky2 () {
          const self= this
          var tmpKalk = JSON.parse(JSON.stringify(self.aKalkulace))
          tmpKalk.forEach((el,idx)=>{
            tmpKalk[idx].kalkulaceid = idx+1
            // el.kalkulaceid =idx +1
          })
          //f.Alert2(tmpKalk[idx].kalkulaceid)
            self.$store.dispatch('saveKalkCela', {data: tmpKalk})
            self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
            self.TestRend++

    },
    async pripravRadky2 () {
          const self= this
           self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
           self.drag=true
          return
    },
   async chooseRadky (event, bEvent) {
     const self= this
     return
    },
    async strojmod(type) {
     const self = this
     var atmp=[]
     var found = true
     var id_query = -0
//     return
     if ( type == 1 )   { id_query=10411 } //Velkoploch
     if ( type == 2 )   { id_query=10410 } //Archovy
     if ( type == 3 )   { id_query=10412 } //Nova Jina
     if ( type == 4 )   { id_query=10411 } //Nova Externi - zatim jako V , nemam zadani
     if ( type == 500 ) { id_query=500   } // Seznam formatu
     if ( type == 501 ) { id_query=501   } // Seznam formatu

    if (type < 500) {
      try {
        atmp=[]
     //   atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_strojmod_full
      //  alert(atmp[0].stroj+ ' '+ id_query )
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 1' )
        eventBus.$emit('enable')

        console.log(JSON.stringify(e.response.data.error))
        alert(JSON.stringify(e.response.data.error))
        //console.log( e)
      }
    }

    if (type == 500) {
      try {
        atmp=[]
  //      atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_format
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 2' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    if (type == 501) {
      try {
        atmp=[]
        atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_matspec
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 3' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    return 0
   },

   async addKalk (KalkType) {
     const self = this
      var newId = 1
     var tmpData = []
     var KalkulaceLast = self.KalkulaceLast
     let oData = {}
     var nTmp = -1
     if (self.aKalkulace.length > 0){
       self.aKalkulace.forEach(el => {
         if (el.kalkulaceid >= newId) {
           newId = el.kalkulaceid + 1
          }
       })
     }

     try{
       tmpData = (await (self.strojmod(KalkType)))   //MOdy pro V nebo A
       oData.Menu2 =  tmpData
       oData.Menu1 = []
       oData.Menu1Value=''
       oData.idefixVidet=0
//       alert(tmpData.length)
       tmpData.forEach((el,idx) => {
        nTmp =  _.findIndex(oData.Menu1, function (o) { return o.text +' '+o.nazev == el.stroj+ ' '+ el.nazev})
        if (nTmp == -1 ) oData.Menu1.push({'text': el.stroj + ' '+ el.nazev })
        if (idx == 0) {
         // oData.Menu1Value = el.stroj + ' '+ el.nazev
           oData.Menu1Value = el.idefix_mod
        }
       })

       try {
        //tmpData = (await (self.strojmod(500)))   //MOdy pro V nebo A


        //oData.Format      =  tmpData
        oData.Format      =  []
        oData.FormatMenu1 =  []
        oData.FormatValue =  ''
        oData.FormatSirka =  0
        oData.FormatVyska =  0
        oData.FormatTisk  =  0   //Jednostranny,oboustranny, oboustranny ruzny
        oData.FormatPanelovat =  0
        oData.FormatSirkaPanel =  0
        oData.FormatNakladKs =  0
        oData.stroj =  [],
        oData.strojmod =  [],
        oData.strojceny =  [],
        oData.ResultM2 =  0.0
        oData.ResultHod =  ''

        self.KalkulaceLast = self.$store.getters.getKalkLast
        setTimeout(function(){
          if (self.KalkulaceLast != KalkulaceLast) {
            eventBus.$emit('enable')
            self.$store.dispatch('setKalk',self.KalkulaceLast)
            //self.KalkulaceThis = self.KalkulaceLast
            // self.defaultStyle(self.KalkulaceThis)
            self.setKalk(self.KalkulaceThis)
            var neco = 'ref_'+self.KalkulaceThis + self.ID
        }
        },150)
     } catch (e) {
       console.log(e)
     }

     try{

       //tmpData = (await (self.strojmod(501)))   //MOdy pro V nebo A

       //oData.Mat      =  tmpData
       oData.Mat      =  []
       oData.MatMenu1 =  []
       oData.MatValue =  ''

       self.$store.dispatch('addKalk', {kalkulaceid: newId,data: oData,type: KalkType, sloupecid:[]})

       self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

       self.setKalk(newId)
       //self.KalkulaceThis = newId
       self.KalkulaceLast = self.$store.getters.getKalkLast
       setTimeout(function(){
         if (self.KalkulaceLast != KalkulaceLast) {
          //alert("ted")
          eventBus.$emit('enable')
       }
       },500)


     } catch (e) {
       console.log(e)
     }

     } catch (e) {
       console.log(e)
     }

     console.log("tmpData ", tmpData  )
     //self.aKalkulace.push({kalkulaceid: newId,sloupecid:[]})
   },

   removeKalk (kalkulaceid) {
      const self = this
     // alert(kalkulaceid)
      self.$store.dispatch('removeKalk', kalkulaceid )
      self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      if (self.aKalkulace.length > 0 ) {
        self.setKalk(self.aKalkulace[0].kalkulaceid)
        //self.KalkulaceThis = self.aKalkulace[0].kalkulaceid
      }

   },

  k_id() {
  var kRet=   this.$store.getters.getId(this.KalkulaceThis)
  return kRet

 },
   addColMat(server) {
     const self =this
     var idK = self.KalkulaceThis-1
     var idK = this.k_id()
     //this.k_id()
      //alert("IDK :" + idK+ ' json :' + JSON.stringify(server))

      idK=server.key

  //  return
     //--self.setKalk(idK)
     //self.$store.dispatch('addColMat', {kalkulaceid: self.KalkulaceThis, type: 'Mat'})
      //self.$store.dispatch('addColMat',  {kalkulaceid: idK, type: 'Mat1'})
      if (self.aKalkulace[idK].sloupecid.length>0) return

      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Mat1', id:(Math.ceil(Math.random()*91000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Laminace', id:(Math.ceil(Math.random()*92000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Kasir', id:(Math.ceil(Math.random()*93000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Rezani', id:(Math.ceil(Math.random()*94000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Baleni', id:(Math.ceil(Math.random()*95000879))})
     //self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Jine-Externi', id:96})
        /////self.addKalkCol("Mat");
     self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
     // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: 9999 })
     // alert("Pridma mat na prvni misto")

   },

   addKalkCol (type="X") {
     const self =this
     //alert('a - vkladam sloupec')
     self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })

     self.$store.dispatch('addKalkCol', {kalkulaceid: self.KalkulaceThis, type: type})
      setTimeout(function(){
        self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

      },1500)

     //self.aKalkulace =  self.$store.state.Kalkulace
     self.TestRend++
     return
        var newKalkColId = -1
        self.CalcCount++
   },
   removeKalkCol(kalkulaceid,sloupecid) {
     console.log('Mazu', JSON.stringify(sloupecid) )
     const self= this
     self.$store.dispatch('removeKalkCol', {kalkulaceid: kalkulaceid, sloupecid: sloupecid} )
     //self.KalkulaceThis = kalkulaceid
     self.setKalk(kalkulaceid)
   },

   dropKalk(kalkulaceid) {
     const self = this
      self.aKalkulace.forEach((element,idx) => {
       if ( element.kalkulaceid == kalkulaceid ) {
                  self.aKalkulace.splice(idx,1)
                  return
            }
       });
   },

  defaultStyle(setkalkId) {
    const self = this
    var neco
         self.aKalkulace.forEach(element => {
            neco = 'ref_'+element.kalkulaceid + self.ID
            if (document.getElementById(neco)){
              document.getElementById(neco).style.color="green"
              f.changeClass(document.getElementById(neco),"elevation-12",'elevation-0')
              //f.addClass("elevation-0",'elevation-12')
            }
         })

         if (setkalkId > 0) {

              //alert('b'+self.ID)
               neco = 'ref_'+setkalkId+self.ID
               setTimeout(function(){
               if (document.getElementById(neco)) {
                      //alert('c'+self.ID)
                 document.getElementById(neco).style.color='red'
                 f.changeClass(document.getElementById(neco),"elevation-0",'elevation-12')
                }
           },100)
         }

  },
   dropCol(kalkulaceid, sloupecid) {
     const self = this
     var ref = self.$refs[sloupecid]
  //this.items.$remove(item)
     self.aKalkulace.forEach(element => {
       if ( element.kalkulaceid == kalkulaceid ) {
          element.sloupecid.forEach((elS,idx) =>{
            if ( elS == sloupecid) {
              element.sloupecid.splice(idx,1)
              return

            }
          })
       }

     });
     //alert("drop" )

   },

   setKalk(idK) {
          this.$store.dispatch('setKalk',idK)
          this.$store.dispatch('KalkulaceColThis',0) //Jen nastavi KalkulaceThis


           var neco = 'ref_'+idK+this.ID
           //document.getElementById(neco).click()
           if (document.getElementById(neco)) {
             document.getElementById(neco).click()

           }
           //
           this.defaultStyle(idK)
          //console.log('setKalk',idK)
   },
   setKalk2(idK) {
     if (self.lastIdK==idK) return
     this.lastIdK=idK
     this.$store.dispatch('setKalk2',idK)
   },
   getKalk() {
     return this.$store.getters('getKalk')
   },


   chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
    zmenaType(cSloup=""){

      const self = this
      /// f.Alert('a')
      self.KalkulaceThis = self.$store.state.KalkulaceThis

      var idK = self.KalkulaceThis-1

      var idK = this.k_id()

      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: cSloup, id:Math.random()})
      self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })

      self.TestRend++


      //self.aKalkulace = []
      //self.$store.dispatch('saveKalkCela', {data: tmpKalk})
      //self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
      //self.chooseRadky2()
      //f.Alert('a')


    }

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
      'user'



    ]),
  },

}

</script>

<style scoped>
button:focus {
    outline: 0px;
    color: red;
}
.plovouci {
  opacity:0.91;
  z-index:10;
  position:absolute;



}

.plovouci:hover {
  opacity:1;
  z-index:1000;

}
.mybutton:hover  {
    outline: 1px;
    color: red;
    padding: 1px;
    border: 1px solid ;
    box-shadow:  -1px 1px #eeeeee
         -2px 2px #eeeeee,
         -3px 3px #eeeeee,
         -4px 4px #eeeeee,
         -5px 5px #eeeeee;
}
.v-list__tile__title {

  font-size:13px;

  padding: 0;
}

.v-list__tile--input .v-select__selection .v-select__selection--comma {
  /*
  font-size:20px !important;
  height: 14px !important;
  */
  font-size:100%;
}
.v-label .theme--light .v-input__slot .v-select__slot .v-label .theme--light .v-select__selections {
  font-size:22px !important;
  height: 14px !important;

}
.v-list__tile {

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    font-weight: 100;
    height: 25px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

}
.v-overflow-btn .v-input__append-inner {
    width: 18px !important;
    height: 18px  !important;
    -ms-flex-item-align: auto;
    align-self: auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0;
    padding: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

div .v-select__slot {
  height: 22px !important;
  background: lightblue;
  padding: 0px 0px 0px 0px ;



}


input {
    width: 100%;
    height: 14px;
    font-size: 12px;

    margin: 0px;
}
.v-overflow-btn .v-select__selections {
    width: 100%;
    height: 12px;
    font-size: 12px;

    margin: 0px;
    padding: 0px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}



</style>


