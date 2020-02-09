<template>
  <div>
    <button
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="fceNova.Nova()"
                :style="c1.aktivni_zak>0?'color:green':''"
                :title="c1.status_zak +'/'+ c1.aktivni_zak"
              >
                Nova
                {{c1.IDEFIXACTIVELAST}}
              </button>
              <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="fceSave.Ulozit()">Ulozit</button>
              <button
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="fceNova.Nova(true)"
                :disabled="(c1.MAINMENULAST=='zakazky' && c1.status_zak==1) || (c1.MAINMENULAST=='kalkulace' && c1.status_nab==1)"
                :class="{'white elevation-0': (c1.MAINMENULAST=='zakazky' && c1.status_zak==1) || (c1.MAINMENULAST=='kalkulace' && c1.status_nab==1)}"
              >Nova upravou</button>
              <button class="px-4 tlacitkoMenu elevation-2 hoVer">Smazat</button>
              <button
                v-if="c1.MAINMENULAST=='kalkulace'"
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="fceSave.Ulozit('z')"
              >Ulozit jako zakazku</button>
              <button
                v-if="c1.MAINMENULAST=='zakazky'"
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="fceSave.Ulozit('n')"
              >Ulozit jako nabidku</button>
              <button>Aktivni zak {{c1.aktivni_zak}} {{c1.aktivni_zak_short}}</button>
  </div>
</template>

<script>
import c1 from './CalcCentral.js';
import fceSave from './CalcFceSave.js'; // Funkce seznam
import fceNova from './CalcFceNova.js'; // Funkce seznam

export default {

  data(){
    return {
      c1: c1,
      fceSave: fceSave,
      fceNova: fceNova,
    }
  }

}

</script>
