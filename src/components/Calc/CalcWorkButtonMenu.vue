<template>
<div style="position:relative;top:0px;background:#e4eff8;text-align:left;font-size:14px;" >
      <div style="position:relative;top:0px;background:#e4eff8;text-align:left">
        <button v-for="(item,i) in aMain" :key="i" class="px-4 tlacitkoMenu elevation-2 hoVer"
          @click="setMenu(item.id)"
          :class="{'tlacitkoMenuActive':setmenu==item.id}"
          >
         {{item.txt}}
        </button>
        <span class="tlacitkoMenu elevation-0 ml-4 pr-2 pb-1 pt-1" style="border-radius:0px 0px 0px 0px;background:#e4eff8">
           <input type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;widht:30em;border: solid 1px black">
           <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
           <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
           </span>
        </span>
          <div v-for="(item,i) in whoin" :key="i+'whoin'"
          class="orange lighten-4 px-1 mt-1 mx-1 "
          style="float:right;position:relative;right:2%;border-radius:10px !important;border: solid 0px black !important"
          :title="item._login1"
          >
          {{ item._user1==idefix?'JA':item._zkratka1}}
          </div>
        <span>
        </span>
        <!-- {{ LastMain }} / {{ID}} -->
      </div>

      <div v-if="setmenu==''" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3em;font-size:12px;">
          Nic neni vybrano
      </div>
      <div v-if="setmenu=='kalkulace' || setmenu=='zakazky'" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3.2em;font-size:14px;">
        <table v-if="(setmenu=='kalkulace' && obrazovka_nab==3) || (setmenu=='zakazky' && obrazovka_zak==3)"><tr>
          <td v-for="(item2,i2) in aSubKalkulace" :key="i2"   style="max-width: 8em;background:#e4eff8;font-size:14px;">
          <button
          class="px-1  pt-2 hoVer"
          @click="send(item2.id)"
          :class="{'blue--text':item2.set==1}"
         >
         <table style="background:#e4eff8"><tr><td style="background:#e4eff8;width:20px;
         ">
          <i class="el-icon-plus white--text d3" style="font-weight:bold;height:25px;zoom:120%;"></i>
         </td><td style="background:#e4eff8;"
                :class="{'blue--text': item2.id==LastMain}"
         >
            <b class="hoVer"
            >{{item2.txt}}</b>
        </td></tr></table>
       </button>
        </td>

        </tr></table>

         <table v-if="(setmenu=='kalkulacexx' && obrazovka_nab==2) || (setmenu=='zakazky' && obrazovka_zak==2)" class="ml-4"><tr>
          <td v-for="(item2,i2) in aSub2Z" :key="i2"   style="max-width: 18em;background:#e4eff8;font-size:14px;" class="pt-3 pl-0">
          <button  class="px-4 ma-0  elevation-1 hoVer " style="background:#dddcdc"
          @click="sendZ2(item2.id)"
          >
          {{ item2.txt}}
          </button>
          <button v-if="false"
          class="px-1  pt-2 hoVer"
          @click="sendZ2(item2.id)"
          :class="{'blue--text':item2.set==1}"
         >
         <table style="background:#e4eff8"><tr><td style="background:#e4eff8;width:20px;
         ">
          <i class="el-icon-plus white--text d3" style="font-weight:bold;height:25px;zoom:120%;"></i>
         </td><td style="background:#e4eff8;"
                :class="{'blue--text': item2.id==LastMain}"
         >
            <b class="hoVer"
            >{{item2.txt}}</b>
        </td></tr></table>
       </button>
        </td>

        </tr></table>
        <!-- {{ aSubKalkulace}} -->

      </div>
      <div v-else-if="setmenu=='Prevod' " style="position:relative;top:0px;background:#e4eff8;text-align:left;height:13.2em;font-size:14px;">
        <prevod-dat></prevod-dat>
        <!-- Prevadim data ze stare db -->
      </div>

      <div v-else style="position:relative;top:0px;background:#e4eff8;text-align:left;height:4.05em;font-size:11px;" >
          Aktualne v procesu
    </div>

      <div style="position:relative;top:0px;background:#ffffff;text-align:left;border-top: solid 1px #cacade;height:10em;font-size:12px;">
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava"  :title="form.idefix" >
               <v-btn @click="seekzaknab(setmenu=='kalkulace'?'nab':'zak' )"
               :class="{'white lighten-5':setmenu=='kalkulace','white lighten-5':setmenu=='zakazky'} "
               class="pl-2 pr-1  ma-0 elevation-0 white blue--text"
               small
               style="zoom:80%"
               >
               <b>
                Číslo {{setmenu=='zakazky'?'zakázky ':'nabidky '}}
               </b>
                </v-btn>:
                </td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="leva pl-4 tdn">
              <input type="hidden" size="mini"   class="tdl tdn"
              :id="'cislo' + ID "
              v-model="form.cislo"

              >
              <input type="text" size="mini"  style="width:3.1em;border:none;text-align:right" class="tdl tdn pl-1"
              :id="'cislo' + ID "
              :value="form.cislo >'0'?form.cislo.substr(0,5):'00000'"
              readonly
               >&nbsp;
               <input v-if="setmenu=='zakazky'"
               type="text" size="mini"  style="width:6em;font-weight:bold;font-size:110%" class="tdl tdn pl-0"
               :id="'cislo2' + ID "

               :value="status_zak==1?'Nova Zakazka':(
               form.cislo >'0'?parseInt(form.cislo.substr(5,5)):'00000'
                ) "
               ><input v-else-if="setmenu=='kalkulace'"
               type="text" size="mini"  style="width:6em;font-weight:bold;font-size:110%" class="tdl tdn pl-0"
               :id="'cislo2' + ID "
               :value="status_nab==1?'Nova Nabidka':(
                form.cislo >'0'?parseInt(form.cislo.substr(5,5)):'00000'
                ) "
               >
               <!-- &nbsp;
               <v-btn @click="seekzaknab(setmenu=='kalkulace'?'nab':'zak' )"
               :class="{'green lighten-5':setmenu=='kalkulace','blue lighten-5':setmenu=='zakazky'} "
               class="pl-0 pr-0"
               small
               style="zoom:65%"

               > ?
               {{setmenu=='kalkulace'?pocet_nal_nab:pocet_nal_zak}}
               </v-btn> -->
              </td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%;" class="prava"><a @click="editF(form.idefix_firma)" ><b >Název firmy:</b></a></td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4">
              <el-select v-model="form.idefix_firma"
              v-if=" (aFirma.length>0 ||  true)"
              filterable
              no-match-text="Nenalezeno"
              no-data-text="Cekam na data"
              default-first-option
              size="mini"  class="pt-0 pl-1"
              :style="'width:92%;'"
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              @change="setKontakt();
              f.setFocus('nazev'+ID,100);

              "





              >
              <el-option
                v-for="item9 in aFirma"
                :key="item9.idefix"
                :label="item9.nazev"
                :value="item9.idefix"
                @keydown.enter="Uloz()"
              >
              <span style="float: left">{{item9.nazev}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{item9.ico}}</span>


              </el-option>
            </el-select>
            <input v-else
              type="text" size="mini"  style="width:90%;display:none"
              class="tdl tdn"
              @focus="fokus('osoba');fields['osoba'].ZobrazMenu=true"
              @blur="Opust('osoba');"
              @click="getOsoba()"


              :id="fields['osoba']['nazev']"
              v-model="form.nazevfirmy"
              READONLY
              >

              <input v-if="false"
              type="text"
              :id="fields['firma']['nazev']"
              size="mini"
              style="width:90%"
              class="tdl tdn"
              @focus="fokus('firma');fields['firma'].ZobrazMenu=true"
              @blur="Opust('firma');"
              @click="fields['firma'].ZobrazMenu=true"
              @keydown="aktFirma();fields['firma'].ZobrazMenu ? seznam(fields['firma']['nazev']+'_list_'+0,1,$event) : false"
              v-model="form.nazevfirmy"
              ></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Název zakázky:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input
              v-model="form.nazev"
              :id="'nazev'+ID"
              @keydown.enter="Uloz()"
              type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Datum expedice:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4">
                <input
                  v-model="form.datumexpedice"
                  :id="'datumexpedice'+ID"
                  type="text" size="mini"  style="width:90%" class="tdl tdn datum"
                  @keydown.enter="Uloz()"
                >
              </td>
            </tr>
          </table>


        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
                    <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyrobni listy:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr style="height:2.5em">
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">
                <a @click="editK(form.idefix_firma);getOsoba()" >
                Kontaktni osoba:
                </a>
                </td>
              <!-- <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"> -->
                <td style="position:relative;top:0px;color:#000000;width:70%;" class="leva pl-4">

              <el-select v-model="form.idefix_firmaosoba"
              v-if="aOsoba.length>0 ||  true"
              filterable
              no-match-text="Nenalezeno"
              no-data-text="Cekam na data"
              default-first-option
              size="mini"  class="pt-0 pl-0 pa-0 ma-0"
              :style="'width:92%; '"
              popper-class="silver lighten-5"
              placeholder="Osoba"
              @change="f.setFocus('doprava'+ID,100);"

              >
                <el-option
                v-for="item8 in aOsoba"
                :key="item8.idefix"
                :label="item8.nazev"
                :value="item8.idefix"
                style="font-size:13px"
              >{{item8.nazev}}</el-option>
            </el-select>

            <input v-else
              type="text" size="mini"  style="width:90%"
              class="tdl tdn"
              @focus="fokus('osoba');fields['osoba'].ZobrazMenu=true"
              @blur="Opust('osoba');"
              @click="getOsoba()"

              :id="fields['osoba']['nazev']"
              v-model="form.osoba"
              READONLY
              >


             <!-- {{ aOsoba}} -->
              <!-- <input v-else
              type="text" size="mini"  style="width:90%"
              class="tdl tdn"
              @focus="fokus('osoba');fields['osoba'].ZobrazMenu=true"
              @blur="Opust('osoba');"
              @click="fields['osoba'].ZobrazMenu=true"
              @keydown="fields['osoba'].ZobrazMenu ? seznam(fields['osoba']['nazev']+'_list_'+0,1,$event) : false"
              :id="fields['osoba']['nazev']"
              v-model="form.osoba"
              disabled="true"
              > -->
              </td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Doprava:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4" >
                <input
                type="text"
                :id="'doprava'+ID"
                size="mini"  @keydown.enter="Uloz()" style="width:90%" class="tdl tdn"
              ></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Datum zadani:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn datum2"
              :id="'datumzadani_'+ID"
              v-model="form.datumzadani"

              readonly
              ></td>
            </tr>
          </table>

        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Faktury:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input
              v-model="form.cislofaktury"
              @keydown.enter="Uloz()"
              type="text" size="mini"  style="width:90%" class="tdl tdn"></td>

            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Splatnost:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="leva pl-4">

                {{form.hotovost==1?'Hotovost':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+form.splatnost}}
                <!-- <input type="text" size="mini"  style="width:90%" class="tdl tdn"> -->
                </td>

            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Account:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4">
           <el-select v-model="form.idefix_obchodnik"
              v-if="aObchodnik.length>0 ||  true"
              filterable
              no-match-text="Nenalezeno"
              no-data-text="Cekam na data"
              default-first-option
              size="mini"  class="pt-0 pl-0 pa-0 ma-0"
              :style="'width:92%; '"
              popper-class="silver lighten-5"
              placeholder="Osoba"


              >
                <el-option
                v-for="item81 in aObchodnik"
                :key="item81.idefix"
                :label="item81.fullname"
                :value="item81.idefix"
                style="font-size:13px"
              >{{item81.fullname}}</el-option>
            </el-select>



                <input v-if="false" type="text" size="mini"  style="width:90%" class="tdl tdn"

                @focus="fokus('obchodnik');fields['obchodnik'].ZobrazMenu=true"
                @blur="Opust('obchodnik');"
                @click="fields['obchodnik'].ZobrazMenu=true"
                @keydown="fields['obchodnik'].ZobrazMenu ? seznam(fields['obchodnik']['nazev']+'_list_'+0,1,$event) : false"
                :id="fields['obchodnik']['nazev']"
                v-model="form.obchodnik"

                ></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Produkce:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4">
             <el-select v-model="form.idefix_produkce"
                v-if="aProdukce.length>0 ||  true"
                filterable
                no-match-text="Nenalezeno"
                no-data-text="Cekam na data"
                default-first-option
                size="mini"  class="pt-0 pl-0 pa-0 ma-0"
                :style="'width:92%; '"
                popper-class="silver lighten-5"
                placeholder="Osoba"
              >
                <el-option
                v-for="item82 in aProdukce"
                :key="item82.idefix"
                :label="item82.fullname"
                :value="item82.idefix"
                style="font-size:13px"
              >{{item82.fullname}}</el-option>
            </el-select>

                <input v-if="false" size="mini"  style="width:90%" class="tdl tdn"
                @focus="fokus('produkce');fields['produkce'].ZobrazMenu=true"
                @blur="Opust('produkce');"
                @click="fields['produkce'].ZobrazMenu=true"
                @keydown="fields['produkce'].ZobrazMenu ? seznam(fields['produkce']['nazev']+'_list_'+0,1,$event) : false"
                :id="fields['produkce']['nazev']"
                v-model="form.produkce"

              ></td>
            </tr>
          </table>
        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Zisk:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyfakturovano:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="leva pl-4">
                <!-- <input type="text" size="mini"  style="width:90%" class="tdl tdn "> -->
                {{form.stav}}
                </td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Cislo obj:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input v-model="form.cisloobjednavky" @keydown.enter="Uloz()" type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">??:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input v-model="form.vyrobapopis_print" type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
          </table>
        </div>

    </div>
    <hr style="color:#cacade">
    <hr>
    <div style="position:relative;top:0px;color:#258bce;float:left;background:#ffffff;height:2.5em" class="leva pr-2">
    <slot name="tlacitkazakazky">
       <div >nic tu neni</div>
    </slot>
    </div>


    <div style="position:relative;top:0px;color:#258bce;float:left;background:#ffffff;height:2.5em" class="leva pr-2">


              <div v-if="(setmenu=='kalkulace' && obrazovka_nab>1) || (setmenu=='zakazky' && obrazovka_zak>1)" style="position:relative;top:0px;color:#258bce;float:left;background:#ffffff;" class="leva pl-4 pr-4 pt-2">Text na fakturu:</div>
              <div v-if="(setmenu=='kalkulace' && obrazovka_nab>1) || (setmenu=='zakazky' && obrazovka_zak>1)" style="position:relative;top:0px;color:#000000;float:left;background:#ffffff;width:25em" class="prava pr-4">
                <!-- <input v-model="form.vyrobapopis_print" type="text" size="mini"  style="width:25em" class="tdl tdn"> -->
                <textarea-autosize type="text"
                class="tdl tdn"
                v-model="form.poznamky"
                size="mini"
                style="width:100%; height:3em;max-height:3em;border:bottom: solid 10px red;font-size:100%;padding-left:5px;">
                </textarea-autosize>
                </div>
              <div v-if="(setmenu=='kalkulace' && obrazovka_nab>1) || (setmenu=='zakazky' && obrazovka_zak>1)" style="position:relative;top:0px;color:#258bce;float:left;background:#ffffff;" class="leva pl-4 pr-4 pt-2">Vyroba popis:</div>
              <div v-if="(setmenu=='kalkulace' && obrazovka_nab>1) || (setmenu=='zakazky' && obrazovka_zak>1)" style="position:relative;top:0px;color:#000000;float:left;background:#ffffff;width:25em" class="prava pr-4">
                <textarea-autosize type="text"
                class="tdl tdn"
                v-model="form.vyrobapopis_print"
                size="mini"
                style="width:100%; height:3em;max-height:3em;border:bottom: solid 10px red;font-size:100%;padding-left:5px;">
                </textarea-autosize>
              </div>



              <div style="position:relative;top:0px;color:#000000;float:left;background:#ffffff;width:5em" class="leva pl-1">
                <label :for="'pdf0'+ID" style="cursor:pointer"><span></span>PDF&nbsp;</label>
                  <input type="file" value="0"
                  :name="'dodak0'+ID"
                  :id="'pdf0'  +ID"
                  class="tdl tdn elevation-0 pr-0" @change="true"/>

              </div>

             <div style="position:relative;top:0px;color:#000000;float:left;background:#ffffff;width:5em" class="leva pl-1">
                <label :for="'pdf0'+ID" style="cursor:pointer"><span></span>Dodak&nbsp;</label>
                  <input type="file" value="0"
                  :name="'pdf0'+ID"
                  :id="'pdf0'  +ID"
                  class="tdl tdn elevation-0 pr-0" @change="true"/>

              </div>
              <div style="position:relative;top:0px;color:#000000;float:left;background:#ffffff;width:5em" class="leva pl-1">
                <label :for="'objednavka0'+ID" style="cursor:pointer"><span></span>Objednavka&nbsp;</label>
                  <input type="file" value="0"
                  :name="'pdf0'+ID"
                  :id="'pdf0'  +ID"
                  class="tdl tdn elevation-0 pr-0" @change="true"/>

              </div>






   </div>



       <div style="min-height:0px;max-height:20em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px;display:none"
          v-if="false && aFirma.length > 0 "
          class="elevation-12 teal"
          :id="fields['firma'].nazev+'_list'"
          :style="fields['firma'].ZobrazMenu &&  FilterFirma()  ? 'display:block' : 'display:none'"
          >

        <span style="display:none">FF {{ aFirma.length}}</span>

          <table  width="100%" v-if="true " >
            <tr v-if="false"><td>{{ fields['firma'].ZobrazMenu }}</td></trv->
             <tr class="mt-0 pa-0 grey lighten-4"
             v-for="(item1, i1) in
             aFirma.filter(
                    el =>
                    ( true ||
                      ( (el.nazev+el.ico).toUpperCase().match((form.nazevfirmy+'').toUpperCase()) && form.nazevfirmy+'' > '' && form.nazevfirmy !== el.nazev )
                      || (form.nazevfirmy+'').trim() == ''
                    ) && (form.nazevfirmy+'').trim() != (el.nazev+'').trim()

                    ).slice(0,50)" :key="i1"
              >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="fields['firma'].nazev+'_list_'+i1"
              @keydown="
                seznam(fields['firma'].nazev +'_list_'+i1,1,$event)"
                @click="setF(item1)"
                @focus="lastFocus=fields['firma'].nazev"
              >
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%"
                 @click="form['nazevfirmy']= item1['nazev'];setF(item1);
                 fields['firma'].ZobrazMenu=false;
                 form['idefix_firma']=item1['idefix_firma']"
                 :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                 class="ma-0 pa-0 pl-1"
                >
                  <table width="100%" cols="100"><tr><td style="width:80%">{{ item1['nazev'] }}</td><td style="width:20%">{{item1.ico}}</td></tr></table>
                 </v-card-text>
                 </td></tr></table>
              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>

       <!-- <div style="min-height:0px;max-height:20em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px;display:none" -->
       <div style="min-height:0px;max-height:20em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px;display:block"
          v-if="false && aOsoba.length > 0 "
          class="elevation-12 teal"
          :id="fields['osoba'].nazev+'_list'"
          :style="fields['osoba'].ZobrazMenu &&  FilterFirma()  ? 'display:block' : 'display:block'"
          >
        <span style="display:none">FF {{ aOsoba.length}}</span>

          <table  width="100%" v-if="true " >
            <tr v-if="false"><td>{{ fields['osoba'].ZobrazMenu }}</td></trv->
             <tr class="mt-0 pa-0 grey lighten-4"
             v-for="(item1, i1) in
             aOsoba.filter(
                    el =>
                    (
                      ( (el.nazev).toUpperCase().match((form.osoba+'').toUpperCase()) && form.osoba+'' > '' && form.osoba !== el.nazev )
                      || (form.osoba+'').trim() == ''
                    ) && (form.osoba+'').trim() != (el.nazev+'').trim()
                    )" :key="i1"
              >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="fields['osoba'].nazev+'_list_'+i1"
              @keydown="
                seznam(fields['osoba'].nazev +'_list_'+i1,1,$event)"
                @click="setOsoba(item1)"
                @focus="lastFocus=fields['osoba'].nazev"
              >
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%"
                 @click="form['osoba']= item1['nazev'];setOsoba(item1['idefix'])
                 fields['osoba'].ZobrazMenu=false;
                 form['idefix_firmaosoba']=item1['idefix']"
                 :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                 class="ma-0 pa-0 pl-1"
                >
                  <table width="100%" cols="100"><tr><td style="width:40%">{{ item1['nazev'] }}</td>
                  <td style="width:20%">{{item1.aktivni?'A':'N'}}&nbsp;</td>
                  <td style="width:20%">{{item1.tel}}&nbsp;</td>
                  <td v-if="false" style="width:20%">{{item1.mail}}&nbsp;</td>
                  </tr></table>
                 </v-card-text>
                 </td></tr></table>
              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>

         <div style="min-height:0px;max-height:20em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px;display:none"
          v-if="false && aObchodnik.length > 0 "
          class="elevation-12 teal"
          :id="fields['obchodnik'].nazev+'_list'"
          :style="fields['obchodnik'].ZobrazMenu &&  FilterFirma()  ? 'display:block' : 'display:none'"
          >
        <span style="display:none">FF {{ aObchodnik.length}}</span>

          <table  width="100%" v-if="true " >
            <tr v-if="false"><td>{{ fields['obchodnik'].ZobrazMenu }}</td></trv->
             <tr class="mt-0 pa-0 grey lighten-4"
             v-for="(item1, i1) in
             aObchodnik.filter(
                    el =>
                    (
                      ( (el.fullname).toUpperCase().match((form.obchodnik+'').toUpperCase()) && form.obchodnik+'' > '' && form.obchodnik !== el.fullname )
                      || (form.obchodnik+'').trim() == ''
                    ) && (form.obchodnik+'').trim() != (el.fullnamee+'').trim()
                    )" :key="i1"
              >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="fields['obchodnik'].nazev+'_list_'+i1"
              @keydown="
                seznam(fields['obchodnik'].nazev +'_list_'+i1,1,$event)"
                @click="setObchodnik(item1)"
                @focus="lastFocus=fields['obchodnik'].nazev"
              >
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%"
                 @click="form['obchodnik']= item1['nazev'];setObchodnik(item1)
                 fields['obchodnik'].ZobrazMenu=false;
                 form['idefix_obchodnik']=item1['idefix']"
                 :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                 class="ma-0 pa-0 pl-1"
                >
                  <table width="100%" cols="100"><tr><td style="width:40%">{{ item1['fullname'] }}</td>
                  <td style="width:20%">{{item1.plati?'A':'N'}}&nbsp;</td>
                  <td v-if="false" style="width:20%">{{item1.telefon}}&nbsp;</td>
                  <td v-if="false" style="width:20%">{{item1.email}}&nbsp;</td>
                  </tr></table>
                 </v-card-text>
                 </td></tr></table>
              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>

        <div style="min-height:0px;max-height:20em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px;display:none"
          v-if="aProdukce.length > 0 "
          class="elevation-12 teal"
          :id="fields['produkce'].nazev+'_list'"
          :style="fields['produkce'].ZobrazMenu &&  FilterFirma()  ? 'display:block' : 'display:none'"
          >
        <span style="display:none">FF {{ aProdukce.length}}</span>

          <table  width="100%" v-if="true " >
            <tr v-if="false"><td>{{ fields['produkce'].ZobrazMenu }}</td></trv->
             <tr class="mt-0 pa-0 grey lighten-4"
             v-for="(item1, i1) in
             aProdukce.filter(
                    el =>
                    (
                      ( (el.fullname).toUpperCase().match((form.produkce+'').toUpperCase()) && form.produkce+'' > '' && form.produkce !== el.fullname )
                      || (form.produkce+'').trim() == ''
                    ) && (form.produkce+'').trim() != (el.fullnamee+'').trim()
                    )" :key="i1"
              >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">
              <a :href="'#'" :id="fields['produkce'].nazev+'_list_'+i1"
              @keydown="
                seznam(fields['produkce'].nazev +'_list_'+i1,1,$event)"
                @click="setProdukce(item1)"
                @focus="lastFocus=fields['produkce'].nazev"
              >
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%"
                 @click="form['produkce']= item1['nazev'];setProdukce(item1)
                 fields['produkce'].ZobrazMenu=false;
                 form['idefix_produkce']=item1['idefix']"
                 :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                 class="ma-0 pa-0 pl-1"
                >
                  <table width="100%" cols="100"><tr><td style="width:40%">{{ item1['fullname'] }}</td>
                  <td style="width:20%">{{item1.plati?'A':'N'}}&nbsp;</td>
                  <td v-if="false" style="width:20%">{{item1.telefon}}&nbsp;</td>
                  <td v-if="false" style="width:20%">{{item1.email}}&nbsp;</td>
                  </tr></table>
                 </v-card-text>
                 </td></tr></table>
              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>


      <div id="jqwin"  style="display:none" >
        Ulozeni template
      </div>

</div>




  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->

 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, setInterval } from 'timers'
import f from '@/services/fce'
import SQL from '../../services/fcesql'
import Q from '../../services/query'
import Prevod from './CalcPrevodDat.vue'






export default {
   components: {
       'prevod-dat': Prevod,


 },
  props: {
    ID:{default: 0,
    required: false
    },
    obrazovka_zak: {
      default:0,
      required: false,
    },
    obrazovka_nab: {
      default:0,
      required: false,
    }
  },
 data () {
   return {
     ID0: this.ID,
    // setmenu:"kalkulace",
     setmenu:"zakazky",
     setsub:0,
     f:f,

     showTemplates: true,
     showFirma: true,
     ZobrazMenu: true,
     loading: false,





     LastMain: 0,
     aMain : [
        {id: "kalkulace",txt: "Nabídky"},
        {id: "zakazky",  txt: "Zakázky"},

        {id: "vyroba",  txt:  "Výroba"},
        {id: "studio",  txt:  "Studio"},
        {id: "doprava", txt:  "Dopravy"},
        {id: "Prevod", txt:  "Prevod"},
       ],
       aSubKalkulace:[
        {id:9,   txt: "Nová sada",set: 0},
        {id:1,   txt: "Velkoplošná",set: 0},
        {id:2,   txt: "Archová" ,set: 0},
        {id:3,   txt: "Jiná",set: 0},
        {id:4,   txt: "Externí",set: 0},
        {id:5,   txt: "Baleni",set: 0},
        {id:777, txt: "Ulozit",set: 0},
        {id:666, txt: "Vycistit",set: 0},
       ],
       aSub2Z:[
         {id: "faktury",  txt: "Faktury"},
         {id: "zalohy",   txt: "Zálohy"},
         {id: "hotovost", txt: "Hotovost"},
         {id: "kosiky",   txt: "Košíky"},
         {id: "prehledy", txt: "Přehledy"},
       ],
       form:{
         cislo             : 0,   //zakazky . nabidky - vyresit pri ulozeni
         vl_rozsah         : '',
         idefix_firma      : null,
         idefix_firmaosoba : null,
         nazev             : '',
         cisloobjednavky   : '',
         datumzadani       : null,
         datumexpedice     : null,
         datumsplatnosti   : null,
         vyrobapopis       : '',
         naklad            : 0,   //Asi smazat
         poznamky          : '',
         zamknuto          : null, //datum
         idefix_user_lock  : 0,
         odemknuto         : null,//datum
         idefix_user_unlock: 0,
         zamek             : false,
         uct_rok           : 2019, //nevim ,asi smazt
         login             : '', // pomucka 0- vypise se
         vyrobapopis_print : '',
         cislofaktury      : '',
         idefix_obchodnik  : null,
         idefix_produkce   : null,
         idefix_last       : 0,
         idefix_nabidka    : 0,
         dodak0            : '',  //pdf soubory - nazvy
         objednavka0       : '',
         pdf0              : '',
         informace         : '',
         nazevfirmy        : '',  //pridaner texty co nejsou ve strkture
         osoba             : '',  //osoba
         obchodnik         : '',  //obchodnik - text
         produkce          : '',  //produkce - text
         splatnost         : 0,
         hotovost          : 0,
         stav              : 'Nova',
         idefix            : 0,


       },
       aFirma: [],
       aOsoba: [],
       aObchodnik: [],
       aProdukce: [],
       status_zak:0,
       status_nab:0,
       pocet_nal_zak     :0,
       pocet_nal_nab     :0,
       //MAINMENULAST:'',

      fields: {
        'firma': {
          ZobrazMenu: false,
          nazev: ''
        },
        'osoba': {
          ZobrazMenu: false,
          nazev: ''
        },
        'obchodnik': {
          ZobrazMenu: false,
          nazev: ''
        },
        'produkce': {
          ZobrazMenu: false,
          nazev: ''
        }
      },
      whoin:[{
        zkratka1:'NI'
      }]

   }
 },
  beforeDestroy: function () {
    //this.choicesSelect.destroy()
    const self=this
   // f.Alert('dea')
     for(let key in self.fields) {
       if (document.getElementById(self.fields[key].nazev+'_list')) {
         //f.Alert('Nazdar bazer 2', key, self.fields[key].nazev)
         $("#"+self.fields[key].nazev+'_list').remove()
       }
     }
},
deactivated: function () {
//     const self=this
    return


  // remove any data you do not want to keep alive
},
 async created() {
     const self=this
     //alert(11111)

        self.aFirma =  await SQL.getFirma(0,'',10)

        self.aObchodnik  =  await SQL.getOsoba(0,'obchod')
        self.aProdukce = self.aObchodnik
        eventBus.$off('NovaZN')
        eventBus.$on("NovaZN", (server)=>{
        //f.Alert('zalozim', server.id)
        self.cleanForm()
        self.form.cislo = server.cislo
        self.form.datumexpedice = server.exp
        self.form.produkce= server.prod_txt
        self.form.idefix_produkce = server.prod
        self.form.datumzadani = server.zadani
        self.status_zak = server.status_zak
        self.status_nab = server.status_nab

        //f.Alert(f.Jstr(server))

      })
     eventBus.$off('NovaZNU')
     eventBus.$on("NovaZNU", (server)=>{
        //f.Alert('zalozim', server.id)
        self.form.cislo = server.cislo
        self.form.datumexpedice = server.exp
        self.form.produkce= server.prod_txt
        self.form.idefix_produkce = server.prod
        self.form.datumzadani = server.zadani
        self.status_zak = server.status_zak
        self.status_nab = server.status_nab
        //f.Alert(f.Jstr(server))


      })
     eventBus.$off('SavedZN')
     eventBus.$on("SavedZN", (server)=>{
        //f.Alert('SavedZN', server.id)
          // id: self.MAINMENULAST,
       if (!f.isEmpty(server.cislo)){
         //f.Alert('SavedZN', server.id,f.Jstr(server))

        self.form.cislo = server.cislo
        self.form.datumexpedice = server.exp
        self.form.produkce= server.prod_txt
        self.form.idefix_produkce = server.prod
        self.form.datumzadani = server.zadani
       }

       if (!f.isEmpty(server.idefix_obchodnik)){
          self.form.obchodnik= server.obchodnik
          self.form.idefix_obchodnik = server.idefix_obchodnik

        }

        self.status_zak = server.status_zak
        self.status_nab = server.status_nab
        //f.Alert(f.Jstr(server))


      })



     eventBus.$off('Focus')
     eventBus.$on("Focus", (server)=>{
       if (!f.isEmpty(self.fields[server.pole])){
          if (document.getElementById(self.fields[server.pole]['nazev'])) {
            document.getElementById(self.fields[server.pole]['nazev']).focus()
          }
       }
      })
     eventBus.$off('setmenu')
     eventBus.$on("setmenu", (server)=>{
          self.setmenu = server.setmenu
     })






     //f.Alert("aOsoba", f.Jstr(self.aObchodnik))
  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })

 },
 async mounted() {
    const self = this
    self.fields.firma.show=false
    self.fields.firma.nazev='nazevfirmy_'+self.ID
    self.fields.osoba.show=false
    self.fields.osoba.nazev='osoba_'+self.ID
    self.fields.obchodnik.show=false
    self.fields.obchodnik.nazev='obcodnik_'+self.ID
    self.fields.produkce.show=false
    self.fields.produkce.nazev='produkce_'+self.ID


   // alert('nazevfirmy_'+self.ID)
  //setTimeout(function(){
    //alert(document.getElementById('nazevfirmy_'+self.ID))
  //},2000)
  //
//       return
    setInterval(function(){
       for(let key in self.fields) {
           try {
            if  ($(':focus')[0].id){
              if ($(':focus')[0].id.split("_")[0] == self.fields[key].nazev.split("_")[0]) {
              } else {
                self.fields[key].ZobrazMenu =false
                //$("#"+self.fields[key].nazev).hide(1000).show(1000)
                $("#"+self.fields[key].nazev+'_list').hide(250)

              }
            }
           } catch(e) {

           }
        }
    },350)
    setTimeout(function() {
      eventBus.$emit('MenuHlavni',{key:1999, item: self.setmenu})
     },100)
     setInterval(function(){
       //form.cislo

       if (!f.isEmpty(self.ID) && document.getElementById('cislo'+self.ID)
       && document.getElementById('cislo'+self.ID).value*1>0
       ){
         var obrazovka = (self.setmenu=='zakazky')?self.obrazovka_zak:self.obrazovka_nab
         var qWho=`select * from
            set_open(
              ${self.idefix}
            ,'${self.user}'
            ,'${self.setmenu}'
            ,'${self.form.cislo}'
            ,${obrazovka}
            )`
            //console.log(qWho)
            //return
          Q.all(self.idefix,qWho
            )
            .then((res)=>{
              self.whoin=[]
              self.whoin = res.data.data;
            })
            .catch((e)=>{
              console.log('Nelze zjistit , kdo ma otevrenou zakazku ')
            })
/*
       console.log('a',
        self.idefix,' :: ', self.login
       ,self.setmenu
       ,self.form.cislo
       , ':'
       ,self.ID
       ,`select * from
            set_open(
              ${self.idefix}
            ,'${self.user}'
            ,'${self.setmenu}'
            ,'${self.form.cislo}'
            )`

       )
       */
       }

  //  console.log('a', self.idefix, self.MAINMENULAST, self.aktivni_zak,self.aktivni_nab,self.$refs.w1.form.cislo)
    },1000)
    //   $.datepicker.regional['cs'] = {
    //     closeText: 'Zavrit', // set a close button text
    //     currentText: 'Dnes', // set today text
    //     monthNames: ['Leden','Unor','Brezen','Duben','Kveten','Cerven',   'Cervenc','Srpen','Zari','Rijen','Listopad','Prsinec'], // set month names
    //     monthNamesShort: ['Led','Un','Bre','Dub','Kve','Cer','Crc','Srp','Zar','Rij','Lis','Pro'], // set short month names
    //     dayNames: ['Ne','Po','Ut','St','Ct','Pá','So'], // set  days names
    //     dayNamesShort: ['Ne','Po','Ut','St','Ct','Pá','So'], // set more short days names
    //     dayNamesMin: ['Ne','Po','Ut','St','Ct','Pá','So'], // set more short days names
    //     weekNames: ['Tyden'],
    //     dateFormat: 'dd.mm.yy', // set format date
    //     showWeek: true,
    //     firstDay: 1,
    //     showButtonPanel: true,
    //     showOtherMonths: true,
    //     changeYear: true,
    //     changeMonth: true,
    // };
    // $.datepicker.setDefaults($.datepicker.regional['cs']);
    // this.$nextTick(function () {
    //  $( ".datum" ).datepicker();
    // })
    this.$nextTick(function () {
      $( ".datum" ).datepicker();
      /*
      $(".date-picker").on('focus blur click',function () {
        $(".ui-datepicker-calendar").hide();
      });
      */

    })

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
 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
  seekzaknab(ceho='zak') {
    const self=this;
    var obj, val
    obj=document.getElementById('cislo2' + self.ID )
    val = obj.value*1
    //f.Alert(obj.value)

    eventBus.$emit('seekzaknab',{key:ceho, value: val})

  //form.cislo >'0'?parseInt(form.cislo.substr(5,5)):'00000'
    //f.Alert(parseInt(self.form.cislo.substr(5,5)))
  },

  // retData(){
  //   //alert('ja 1')
  //   return this.form
  // },
async Uloz() {
  eventBus.$emit('ULOZ')
  //f.Alert('Uloz')

},
async remoteMethod(query) {
  const self=this
  self.loading = true;
  self.aFirma =  await SQL.getFirma(0,query, 50)
  self.loading = false;

},
  async   aktFirma(){
     const self= this

      self.aFirma =  await SQL.getFirma(0,self.form.nazevfirmy, 50)


      // f.Info(f.Jstr(self.fields), f.Jstr(self.aFirma))
     },

 FilterFirma() {
   const self=this
                return this.aFirma.filter(
                    el =>
                      (
                        (
                        (
                          el.nazev+el.ico).toUpperCase().match((self.form.nazevfirmy+'').toUpperCase()) && self.form.nazevfirmy+'' > '' && self.form.nazevfirmy !== el.nazev )
                      || (self.form.nazevfirmy+'').trim() == ''
                      )
                      && self.form.nazevfirmy != el.nazev
                ).length >0
 },

async setKontakt(val) {
  const self=this
await self.getOsoba()
await f.asyncForEach(self.aFirma,async (el)=> {
  if (el.idefix == self.form.idefix_firma){
    //f.Alert("nalze",f.Jstr(el))
    self.form.obchodnik=el.idefix2fullname
    self.form.idefix_obchodnik= el.idefix_user
    return
  }
} )
  if (self.aOsoba.length>=1){
    self.form.idefix_firmaosoba = self.aOsoba[0].idefix
    self.form.osoba   = self.aOsoba[0].nazev

  } else {

    self.form.idefix_firmaosoba = null
    self.form.osoba   = ''
  }


// [{"idefix":"59320","idefix_firma":"12759","nazev":"Vomacka Josef","aktivni":true,"mail":"jx@cx.cz","tel":"732555999"}]

  //f.Alert2(self.form.idefix_firma, f.Jstr(self.aOsoba))


},
 async setF(itemCela){
      const self = this
      var isZmena = false ;

      //f.Alert(f.Jstr(itemCela))
      //return
      if (f.isEmpty(itemCela)) {
        //f.Alert('Empty')
        return
      }
      if (!itemCela.hasOwnProperty('nazev')) {
        f.Alert('CVhybi pole nazev - error v aplikace')
        return
      }
      if (self.form.idefix_firma==0 && itemCela['idefix'] > 0  ) {
        isZmena = true;

      }
      if (self.form.idefix_firma>0 && self.form.idefix_firma != itemCela['idefix']) {
        self.form.osoba=''
        self.form.idefix_firmaosoba=0
        isZmena = true;
      }
      self.form.nazevfirmy= itemCela['nazev'];
      self.form.idefix_firma= itemCela['idefix'];
      //f.Info(f.Jstr(itemCela))
      if (!f.isEmpty(itemCela['fullname'])) {
        self.form.idefix_obchodnik = itemCela['idefix_user']
        self.form.obchodnik = itemCela['fullname']
        //f.Alert('Pridelim obcodnika')

      }
      self.fields['firma'].ZobrazMenu=false;


 //     f.Alert('#'+self.fields['firma'].nazev+'_list')
      $('#'+self.fields['firma'].nazev+'_list').css('display','none')
      if (self.form.idefix_firma > 0 ) {
         //f.Alert(document.getElementById(self.fields['osoba']['nazev']),self.fields['osoba']['nazev'])

         self.aOsoba=   await SQL.getFirmaOsoba(self.form.idefix_firma)
      //   f.Alert('Stouram kontaky', self.fields['osoba']['nazev'], f.Jstr(self.aOsoba))

         if (isZmena && self.aOsoba.length>0) {
             if (self.aOsoba.length==1) {
              self.form.idefix_firmaosoba = self.aOsoba[0].idefix
              self.form.osoba = self.aOsoba[0].nazev
             } else {
               self.form.idefix_firmaosoba = self.aOsoba[0].idefix
               self.form.osoba = self.aOsoba[0].nazev
             }

            setTimeout(function(){
               $('#'+self.fields['osoba']['nazev']).focus()
            },1000)
         }

      }


      // f.Alert("IC ", f.Jstr(itemCela))



 },
 async getOsoba()  {
   const self=this

   self.aOsoba=   await SQL.getFirmaOsoba(self.form.idefix_firma)
 },
 async setOsoba(itemCela){
      const self = this

      //f.Alert(f.Jstr(itemCela))
      //return
      if (f.isEmpty(itemCela)) {
        //f.Alert('Empty')
        return
      }
      if (!itemCela.hasOwnProperty('nazev')) {
        f.Alert('prdka')
        return
      }
      self.form.osoba= itemCela['nazev'];
      self.form.idefix_firmaosoba= itemCela['idefix'];
      self.fields['firma'].ZobrazMenu=false;

 //     f.Alert('#'+self.fields['firma'].nazev+'_list')
      $('#'+self.fields['firma'].nazev+'_list').css('display','none')
      if (self.form.idefix_firma > 0 ) {
         //f.Alert(document.getElementById(self.fields['osoba']['nazev']),self.fields['osoba']['nazev'])
         self.aOsoba=   await SQL.getFirmaOsoba(self.form.idefix_firma)
         // f.Alert('Stouram kontaky', self.fields['osoba']['nazev'], f.Jstr(self.aOsoba))
         $('#'+self.fields['osoba']['nazev']).focus()
      }

 },
 async setObchodnik(itemCela){
      const self = this

      //f.Alert(f.Jstr(itemCela))
      //return
      if (f.isEmpty(itemCela)) {
        //f.Alert('Empty')
        return
      }
      if (!itemCela.hasOwnProperty('fullname')) {
        f.Alert('prdka')
        return
      }
      self.form.obchodnik= itemCela['fullname'];
      self.form.idefix_obchodnik= itemCela['idefix'];
      self.fields['firma'].ZobrazMenu=false;

 //     f.Alert('#'+self.fields['firma'].nazev+'_list')
      $('#'+self.fields['firma'].nazev+'_list').css('display','none')
      if (self.form.idefix_firma > 0 ) {
         f.Alert(document.getElementById(self.fields['obchodnik']['nazev']),self.fields['obchodnik']['nazev'])

         //self.aOsoba=   await SQL.getFirmaOsoba(self.form.idefix_firma)
         // f.Alert('Stouram kontaky', self.fields['obchodnik']['nazev'], f.Jstr(self.aOsoba))
         $('#'+self.fields['obchodnik']['nazev']).focus()

      }

 },

 async setProdukce(itemCela){
      const self = this

      //f.Alert(f.Jstr(itemCela))
      //return
      if (f.isEmpty(itemCela)) {
        //f.Alert('Empty')
        return
      }
      if (!itemCela.hasOwnProperty('fullname')) {
        f.Alert('prdka')
        return
      }
      self.form.produkce= itemCela['fullname'];
      self.form.idefix_produkce= itemCela['idefix'];
      self.fields['firma'].ZobrazMenu=false;

 //     f.Alert('#'+self.fields['firma'].nazev+'_list')
      $('#'+self.fields['firma'].nazev+'_list').css('display','none')
      if (self.form.idefix_firma > 0 ) {
         f.Alert(document.getElementById(self.fields['produkce']['nazev']),self.fields['produkce']['nazev'])

         //self.aOsoba=   await SQL.getFirmaOsoba(self.form.idefix_firma)
         // f.Alert('Stouram kontaky', self.fields['produkce']['nazev'], f.Jstr(self.aOsoba))
         $('#'+self.fields['produkce']['nazev']).focus()

      }

 },

  editF(_idefix=0){
      const self = this
     let route = this.$router.resolve({ name: 'firma',  params: { id: _idefix } })
     // var x=parseInt(screen.width*0.9)
     // var y=parseInt(screen.height*0.9)
     var y  = parseInt(window.innerHeight *0.95)
     var x  = parseInt(window.innerWidth *0.95)
      //f.Alert(x , y ,_idefix, 'f',self.form.idefix_firma )
     //alert(screen.height)

     //var ow=window.open(route.href, 'Firma',  `width=${x},height=${y}`)

     //ow.location.reload()
      $("#jqwin").css("height",y+"px")
      var d = $('#jqwin').html("<iframe id='ifrm' style='width:100%;height:100%' " + "></iframe>");
      d.dialog({
        width:`${x}`,
        height:`${y}`,

      });
      $("#jqwin>#ifrm").attr("src", route.href);



    //this.$router.push( { name: 'firma',  params: { id: '14125' } })

    return



  },
  editK(_idefix=0){
      const self = this
     let route = this.$router.resolve({ name: 'firma',  params: { id: _idefix*-1 ,step: 3} })
     // var x=parseInt(screen.width*0.9)
     // var y=parseInt(screen.height*0.9)
     var y  = parseInt(window.innerHeight *0.95)
     var x  = parseInt(window.innerWidth *0.95)
     // f.Alert(x , y ,_idefix, 'f',self.form.idefix_firma )
     //alert(screen.height)

     //var ow=window.open(route.href, 'Firma',  `width=${x},height=${y}`)

     //ow.location.reload()
      $("#jqwin").css("height",y+"px")
      var d = $('#jqwin').html("<iframe id='ifrm' style='width:100%;height:100%' " + "></iframe>");
      d.dialog({
        width:`${x}`,
        height:`${y}`,

      });
      $("#jqwin>#ifrm").attr("src", route.href);



    //this.$router.push( { name: 'firma',  params: { id: '14125' } })

    return



  },
  setMenu(cVal='') {
      //aler('aa')
      const self = this
      this.setmenu = cVal;
      eventBus.$emit('MenuHlavni',{key:1999, item: self.setmenu})
  },
  async qFirmy() { //Jen dodavatel
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
     // seznamPoz(self.lastFocus );
     console.log("Seznam ",nKey, " ID: ", id, self.showTemplates)

    // self.info=aPrvek
     // self.info.push({dele: aPrvek.length })

     for (i=0;i<(delka-1);i++) {
       if (i < delka -2){
         if (PrvekTxt>"") PrvekTxt+="_"
         PrvekTxt+=aPrvek[i]
       }
       PrvekBase+=aPrvek[i]+'_'
        //self.info.push(PrvekBase)

     }
      //self.info.push({"PrvekTxt": PrvekTxt })
      //self.info.push({"Pozice": idPoz })
      //self.info.push({"base": PrvekBase })

      tmp = idPoz*1;
      if (idPoz>0){
        tmp = tmp -1
        PrvekBefore = PrvekBase + tmp
      }
        tmp = idPoz*1;
        tmp = tmp +1
        PrvekNext = PrvekBase + tmp
     //   f.Alert(document.getElementById(PrvekTxt),PrvekTxt )



     var status = false;


      if (document.getElementById(id)) { //Id odkazuje na prvni radku seznamu = pokud existuje
          status= true;
          objSeznam= document.getElementById(id)
        //  self.info.push("OK")
      } else {

        this.$notify( { title: 'Hledani ',  message: 'Seznam '+id+ ' neni' , type: 'error', offset: 100, duration: 1000 })
        return
      }


     //self.info.push(e.keyCode)
     switch (nKey) {
       case 27:
        setTimeout(function(){
            self.MenuFormatShow=false

            document.getElementById(PrvekTxt).focus()


          setTimeout(function(){
            self.showTemplates=false;

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
          self.showTemplates=false
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
            //$("#"+e.target.id).hide(1000)
            e.target.click
            setTimeout(function(){
              //alert('13 : '+e.target.id)
              //e.target.click
              document.getElementById(PrvekTxt).focus()
            },250)
            break;
     }
     }

   },
  async send(key) {
     const self = this
      self.disabled = true
      self.setsub=key
      self.aSubKalkulace.forEach(element => {
        if (element.id==key ) {
            element.set=1
        } else {
          element.set=0
        }

      })

     if (key > 0  ) {
       self.LastMain = key
       // console.log('tag', '')
       eventBus.$emit('MenuHlavni', {key: key })
     }
     if ( key == 11) {
       self.LastMain = 0
     }
   },
  async fokus(lastFocusx=''){  //parametr - Zmena !!! = typ polozky
    const self = this
    var lastFocus = self.fields[lastFocusx]['nazev']

    //f.Alert(self.fields[lastFocusx]['nazev'])
    //f.Alert(document.getElementById(self.fields[lastFocusx]['nazev']))
    //return ;

    if (self.ZobrazMenu == false)  return
    this.lastFocus=lastFocus
    // self.fields[lastFocusx].ZobrazMenu = false
    var Prvek='#'+lastFocus

  //  await f.sleep(2000)



    var oSeznam="#"+lastFocus+"_list"
    var oSeznamId=lastFocus+"_list"
//    f.Alert2('Firma nema kontakty dispozici', document.getElementById(oSeznamId))

     // f.Alert2(oSeznamId ,oSeznamId,document.getElementById(oSeznamId), ' fields', f.Jstr(self.fields))
    try {
      if (!f.isEmpty(document.getElementById(oSeznamId)) && f.isEmpty(document.getElementById(oSeznamId).offsetParent) &&  !document.getElementById(oSeznamId).offsetParent ) {
        document.getElementById(oSeznamId).cloneNode=false
        document.getElementById("app").appendChild(document.getElementById(oSeznamId) )
      }
    } catch(e) {
          //f.Alert('Ztratil jsem objekt', document.getElementById(oSeznamId), oSeznamId)
    }




     //:style="'top:'+ f.getBottomApp('nazevfirmy_'+ID,80)+'px;width:'+f.getWidth('nazevfirmy_'+ID,8)+'px;left:'+f.getLeftApp('nazevfirmy_'+ID,0)+'px'"

    var H= parseInt($(Prvek).outerHeight())
    var top =parseInt($(Prvek).offset().top)+H


    var _css3={
    "top":   top+'px',
    "width":f.getWidth(lastFocus,8)+'px',
    "left":  f.getLeftApp(lastFocus,0)+'px',
    "display": "block"
    }
    //var x = $('child-div').offset().top - $('parent-div').offset().top;

    var x = $(Prvek).offset().top ;
  //  f.Alert2( f.Jstr(_css3), x, lastFocus, " H ", H)
     $(oSeznam).css("z-index",99999999999)
     $(oSeznam).css(_css3)

      //$(oSeznam).show(1000)
    //  $(oSeznam).hide(1000).show(1000)

      console.log('Jsem zpet ??' , self.lastFocus )


    return

    // f.Alert(lastFocus);
  //f.Alert($("#"+lastFocus).offset().top - $(document).scrollTop()) ;
    this.seznamPoz(lastFocus)

    //$("#"+lastFocus+'_list').css

    this.lastFocus=lastFocus
  },
  seznamPoz(lastFocus=''){
    var oSeznam="#"+lastFocus+"_list"
    try {
      var x=$("#"+lastFocus).offset().top
      var pozTop = Math.ceil($("#"+lastFocus).offset().top - $(document).scrollTop())
      var pozLeft = Math.ceil($("#"+lastFocus).offset().left - $(document).scrollLeft())
      $("#"+lastFocus).attr("autocomplete", "off");
      $(oSeznam).css("position","absolute")
      $(oSeznam).css("top",pozTop+"px")
      $(oSeznam).css("left",pozLeft+"px")
      $(oSeznam).css("z-index",99999999)

    } catch (e) {
      //f.Alert("Pokazena pozice")
    }
  },
  Opust(cid='') {

    const self = this

  //  var x = document.activeElement.tagName
    //f.Alert(self.lastFocus)
  //  f.Alert(self.fields[cid]['nazev'].split("_")[0], self.lastFocus )

    var cfield =self.fields[cid]['nazev'].split("_")[0]
    //console.log(x)
    setTimeout(function(){
      var aktualni=self.lastFocus.split("_")[0]
    //f.Alert(self.lastFocus)
    if (aktualni == cfield){
    //if (self.lastFocus.substr(0,4)=='naze'){
       self.fields[cid].ZobrazMenu=true
       //self.fields[cid].ZobrazMenu=false
     } else {
        self.fields[cid].ZobrazMenu=false

    }

  },200)

    return
  },
  async cleanForm() {
    const self= this
    this.form = {
         cislo             : 0,   //zakazky . nabidky - vyresit pri ulozeni
         vl_rozsah         : '',
         idefix_firma      : null,
         idefix_firmaosoba : null,
         nazev             : '',
         cisloobjednavky   : '',
         datumzadani       : null,
         datumexpedice     : null,
         datumsplatnosti   : null,
         vyrobapopis       : '',
         naklad            : 0,   //Asi smazat
         poznamky          : '',
         zamknuto          : null, //datum
         idefix_user_lock  : 0,
         odemknuto         : null,//datum
         idefix_user_unlock: 0,
         zamek             : false,
         uct_rok           : 2019, //nevim ,asi smazt
         login             : '', // pomucka 0- vypise se
         vyrobapopis_print : '',
         cislofaktury      : '',
         idefix_obchodnik  : null,
         idefix_produkce   : self.idefix,
         idefix_last       : 0,
         idefix_nabidka    : 0,
         dodak0            : '',  //pdf soubory - nazvy
         objednavka0       : '',
         pdf0              : '',
         informace         : '',
         nazevfirmy        : '',  //pridaner texty co nejsou ve strkture
         osoba             : '',  //osoba
         obchodnik         : '',  //obchodnik - text
         produkce          : '',  //produkce - text
         splatnost         : 0,
         hotovost          : 0,
         stav              : 'Nova',
       }

  },
 }
}
</script>


<style scoped>
input[type="file"] {
  display:none
}
textarea:focus, input:focus{
    outline: 0px dashed;
}
a:focus {
  color:black;
  zoom:101%;
  font-weight:900;

}
.honza_text{
  background: #93908e;
  color: #ffffff;
  height:14px;
  font-size:12px;
  font-weight:400;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:3px;
  padding-right:3px;

}
.honza_cislo{
  background: #93908e;
  color: #ffffff !important;
  height:14px;
  font-size:12px;
  font-weight:900;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:3px;
  padding-right:3px;

}
.honza_color{
  background: #93908e;
  color: #ffffff;
}
.kolecko {
  height:16px;
  width:16px;
  border: solid 1px #93908e !important;
  border-radius:10px  !important;
  vertical-align: top  !important;
  text-align: center  !important;
  font-size:15px;
  font-weight: 900;
  padding-top:0px !important;
  padding-top:0px !important;
  padding-bottom:0px !important;
  background: white;
  position:absolute;
  top:1px;
  left:1px;
}

.kolecko2 {
  height:20px;
  width:20px;
  border: solid 1px #93908e !important;
  border-radius:14px  !important;
  background: #ffffff;
  vertical-align: top  !important;
  text-align: center !important;
  padding-top:0px !important;
  background: white;
  position:relative;
}




table tr td  {
  border:none;
  border-collapse: collapse;
  vertical-align: top;
}
.sloupec {
  vertical-align: top;

}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  background-color: #93908e;
  font-size:12px;
  color: #ffffff;
  opacity: 0.71; /* Firefox */
  text-align: center;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #ffffff;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #ffffff;
}


</style>


