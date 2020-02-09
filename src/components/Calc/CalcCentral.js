  import store from "@/store/store";
  import { mapState } from 'vuex';
  import { getters } from 'vuex';
  import { mutations } from 'vuex';
  import { eventBus } from '@/main.js';
  import { setTimeout, clearInterval } from 'timers';

  import f from '@/services/fce';
  // import query from '../../services/query'
  import Q from '../../services/query';
  import queryKalk from '../../services/fcesqlKalkulace';
  import prepocty from '../../services/fceKalkulacePrepocty';
  import SQL from '../../services/fcesql';
  import fceVL from '../../services/fceVL';
  // VL
  import VL from './VLIndex.vue';


export default {


  components:{

  },
  props:{
    ID:''
  },
     tmp:{},
     bKalkulace: [],
     //Prevod 1 TOP
     aktivni_zak: 0,
     aktivni_nab: 0,
     aktivni_zak_short: "0",
     aktivni_zak_rok: "0",
     aktivni_nab_short: "0",
     aktivni_nab_rok: "0",
     aktivni_polozka_zak: 0,
     aktivni_polozka_nab: 0,
     polozka_zak: [],
     polozka_nab: [],
     zak_item_active: [],
     nab_item_active: [],
     vllist: "",
  //Prevod 1 EOF

  //Prevod 2 TOP
      search_zak: "",
      search_nab: "",
      search_zak_rok: "",
      search_nab_rok: "",
      search_zak_cislo: "",
      search_nab_cislo: "",
      search_zak_cislo2: "",
      search_nab_cislo2: "",
      order_zak: "",
      order_nab: "",
      order_zak_default: "idefix",
      order_nab_default: "idefix",
      desc_zak: "",
      desc_nab: "",

      seek_zak_firma: false,
      seek_zak_nazev: false,
      seek_zak_obchodnik: false,
      seek_zak_stav: false,
      seek_zak_moje: false,

      seek_nab_firma: false,
      seek_nab_nazev: false,
      seek_nab_obchodnik: false,
      seek_nab_stav: false,
      seek_nab_moje: false,

      desc_zak_default: " desc ",
      desc_nab_default: " desc ",
      query_zak_last: "",
      query_nab_last: "",
  //Prevod 2 EOF

  //Prevod 3

      obrazovka_nab: 3,
      obrazovka_zak: 1,

      status: 0, //status pro ulozeni 1 = nova
      status_zak: 0, //status pro ulozeni 1 = nova
      status_nab: 0, //status pro ulozeni 1 = nova

      seznam_zak: [],
      seznam_nab: [],
      seznam_zak_sum: [],
      seznam_nab_sum: [],
      polozky_zak: [],
      polozky_nab: [],

      polozky_zak_add: [],
      polozky_nab_add: [],

      zak_naklady: 0,
      zak_marze: 0,
      zak_prodej: 0,

      nab_naklady: 0,
      nab_marze: 0,
      nab_prodej: 0,

  //Prevod 3 EOF

  //Prevod 4 TOP
      cis_prace: [],
      cis_dod: [],
      cis_dod_all: [],


      cis_prace_vlastnik: [], //asi to samy jne vlastnik bude na prvni pozici, jestli to chapu dobre
      cis_dod_vlastnik: [],
      idefix_vlastnik: 0,
      idefix_vlastnikPrace: 0,
      loading: false,
      timeout: false,
      timeoutDrag: null,
      klikyzak: 0,
      klikynab: 0,

      //Rizeni - lidi
      _Skupiny: "",
      _IsObchod: false,
      _IsVedeni: false,

      Zacatek: 0,
      StopStav: false,

      IDEFIXACTIVE: "0",
      IDEFIXACTIVELAST: 0,
      IDEFIXACTIVE_ZAK: 0,
      IDEFIXACTIVE_NAB: 0,
  //Prevod 4 EOF

  //Prevod 5 TOP
      Sirka: 1000,
      drag: false,
      ID2ASK: -1,
      MAINMENULAST: "kalkulace",
      NAZEVACTIVE: "",
      TestRend: 0,
      cTable: "",
      ITEM1: [],
      Pocet: 0,
      idRend: 0,

      KalkulaceLast: -1,
      showPrehled: 1,
      CalcCount: 0,
      ColCount: 0,

      aKalkBefore: [],
      aKalkAfter: [],
      lastIdK: -1,

      Hlavni: 0,
      nahledTimeOut: false,
      nahled: false,
      Left: 0,
      odkaz: "",
      IDEFIX_VL: 0,

      zobrazit: true,

  // Prevod 5 EOF



  getState(){
    this.computed.mystate.forEach(el=>{
      if (!this.hasOwnProperty[el]){
        this[el] = f.getStore(el)
      } else
      if (this[el] == f.getStore(el)){
        //this[el] = f.getStore(el)
      } else{
        this[el] = f.getStore(el)
      }

    })
    this['JARDA']=0

    f.Alert2('getState ', this['JARDA'])
    return 1;
  },


  init () {

    this.getState()
    f.Alert2(b , f.getStore('idefix'), this.jarda, this.idefix)
    this.methods.ahoj()
    eventBus.$on('JS',()=>{
      //alert('JS EVENT')
      this.getState()


    })

    return b
  },

data () {
  return {
    bKalkulace: [],
    jarda: 'AAVVV',
    g: getState(),
  }
},
//Funkce zbytek
//Cast Soucty zakazky,prepinani 1 -3 Z


//funkce zbytek
created(){
  this.jarda='AAAAA'
  alert('JS created')
},
mounted() {
  alert('JS mount')
},
methods: {
  ahoj(){

    alert('Ahoj JS')
    this.jarda='ahoj11'

    return this.jarda
  }
},

computed: {

  mystate:[
    'isUserLoggedIn',
    'xMenuMain',
    'level',
    'idefix',
    'compaStore',
    'Kalkulace',
    'KalkulaceThis',
    'user',
  ],

}


}

