<template>
  <div>

   <ul v-show="true">
            <draggable v-model="xMenuy1"  :options="{group: 'people' }" @start="drag=true" @end="drag=false" :move="chooseItem" style="padding-right:20px;padding-top:10px">
            <li v-for="(xm0, i0) in xMenuy1" :key="'x'+i0"  >
                <span v-if="xm0[10].length == 0 &&  xm0[9]=='Group' " style='display:none'>  {{ xm0[10] = [] }}{{ xm0[10]=[AddEmptyItem()]}}</span>

              <div v-if="xm0[10].length>0 || xm0[9]=='Group'" class="g0">
                <v-icon>{{ xm0[1] }}</v-icon>
                <v-btn v-if="xm0[10].length == 0"
                class="orange accent-12 elevation-10"
                light
                small
                absolute
                bottom
                fab
                ripple
                @click="xm0[10]=[AddEmptyItem()]"
                 ><v-icon>add</v-icon></v-btn>

                <ul class="elevation-18">
                <draggable v-model="xm0[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                <li v-for="(xm1, i1) in xm0[10]" :key="'x'+i1"  >
                  <span v-if="xm1[10].length == 0 &&  xm1[9]=='Group' " style='display:none'>  {{ xm1[10] = [] }}{{ xm1[10]=[AddEmptyItem()]}}</span>
                  <div v-if="xm1[10].length>0" class="g1 elevation-18">
                    1 g - {{i1+1}} >> {{ xm1[10].length==0 }}
                    i - {{xm1[0]}} <v-icon>{{ xm1[1] }}</v-icon>
                  <ul class="elevation-15">
                  <draggable v-model="xm1[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                  <li v-for="(xm2, i2) in xm1[10]" :key="'x'+i2"  >
                    <span v-if="xm2[10].length == 0 &&  xm2[9]=='Group' " style='display:none'>  {{ xm2[10] = [] }}{{ xm2[10]=[AddEmptyItem()]}}</span>
                    <div v-if="xm2[10].length>0" class="g2 elevation-15">
                      2 g - {{i2+1}} >>>
                      i - {{xm2[0]}} <v-icon>{{ xm2[1] }}</v-icon>
                      <ul class="elevation-12">
                      <draggable v-model="xm2[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                      <li v-for="(xm3, i3) in xm2[10]" :key="'x'+i3"  >
                        <span v-if="xm3[10].length == 0 &&  xm3[9]=='Group' " style='display:none'>  {{ xm3[10] = [] }}{{ xm3[10]=[AddEmptyItem()]}}</span>
                        <div v-if="xm3[10].length>0" class="g3 elevation-12">
                          3 g - {{i3+1}} >>>>
                          i - {{xm3[0]}} <v-icon>{{ xm3[1] }}</v-icon>
                          <ul class="elevation-9">
                          <draggable v-model="xm3[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                          <li v-for="(xm4, i4) in xm3[10]" :key="'x'+i4"  >
                            <span v-if="xm4[10].length == 0 &&  xm4[9]=='Group' " style='display:none'>  {{ xm4[10] = [] }}{{ xm4[10]=[AddEmptyItem()]}}</span>
                            <div v-if="xm4[10].length>0" class="g4 elevation-9">
                              4 g - {{i4+1}} >>>>>>
                              i - {{xm4[0]}} <v-icon>{{ xm4[1] }}</v-icon>

                              <ul class="elevation-6">
                              <draggable v-model="xm4[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                              <li v-for="(xm5, i5) in xm4[10]" :key="'x'+i5"  >
                                <span v-if="xm5[10].length == 0 &&  xm5[9]=='Group' " style='display:none'>  {{ xm5[10] = [] }}{{ xm5[10]=[AddEmptyItem()]}}</span>
                                <div v-if="xm5[10].length>0" class="g5 elevation-6">
                                  5 g - {{i5+1}} >>>
                                  i - {{xm5[0]}} <v-icon>{{ xm5[1] }}</v-icon>
                                    <ul class="elevation-3">
                                    <draggable v-model="xm5[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                    <li v-for="(xm6, i6) in xm5[10]" :key="'x'+i6"  >
                                      <span v-if="xm6[10].length == 0 &&  xm6[9]=='Group' " style='display:none'>  {{ xm6[10] = [] }}{{ xm6[10]=[AddEmptyItem()]}}</span>
                                      <div v-if="xm6[10].length>0" class="g6 elevation-3">
                                        6 g - {{i6+1}} >>> last
                                        i - {{xm6[0]}} <v-icon>{{ xm6[1] }}</v-icon>
                                          <ul class="elevation-0">
                                          <draggable v-model="xm6[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                          <li v-for="(xm7, i7) in xm6[10]" :key="'x'+i7"  >
                                            <span v-if="xm7[10].length == 0 &&  xm7[9]=='Group' " style='display:none'>  {{ xm7[10] = [] }}{{ xm7[10]=[AddEmptyItem()]}}</span>
                                            <div v-if="xm7[10].length>0" class="g7 elevation-0" >
                                              7 g - {{i7+1}} >>> last
                                              i - {{xm7[0]}} <v-icon>{{ xm7[1] }}</v-icon>
                                            </div>
                                            <div v-else class="i7 elevation-0">
                                              7 i - {{i7+1}}
                                              i - {{xm7[0]}} <v-icon>{{ xm7[1] }}</v-icon>
                                            </div>
                                          </li>
                                          </draggable>
                                          </ul>
                                      </div>
                                      <div v-else class="i6 elevation-3">
                                        6 i - {{i6+1}}
                                        i - {{xm6[0]}} <v-icon>{{ xm6[1] }}</v-icon>
                                      </div>
                                    </li>
                                    </draggable>
                                    </ul>
                                </div>
                                <div v-else class="i5 elevation-5">
                                  5 i - {{i5+1}}
                                  i - {{xm5[0]}} <v-icon>{{ xm5[1] }}</v-icon>
                                </div>
                              </li>
                              </draggable>
                              </ul>
                            </div>
                            <div v-else class="i4 elevation-8">
                              4 i - {{i4+1}}
                              i - {{xm4[0]}} <v-icon>{{ xm4[1] }}</v-icon>
                            </div>
                          </li>
                          </draggable>
                          </ul>
                        </div>
                        <div v-else class="i3 elevation-11">
                          3 i - {{i3+1}}
                          i - {{xm3[0]}} <v-icon>{{ xm3[1] }}</v-icon>
                        </div>
                      </li>
                      </draggable>
                      </ul>

                    </div>
                    <div v-else class="i2 elevation-14">
                      2 i - {{i2+1}}
                      i - {{xm2[0]}} <v-icon>{{ xm2[1] }}</v-icon>
                    </div>
                  </li>
                  </draggable>
                  </ul>

                  </div>
                  <div v-else class="i1 elevation-17">
                    1 i - {{i1+1}}
                    i - {{xm1[0]}} <v-icon>{{ xm1[1] }}</v-icon>
                  </div>
                </li>
                </draggable>
                </ul>

              </div>
              <div v-else class="i0 elevation-20">
                i - {{i0+1}}
                i - {{xm0[0]}} <v-icon>{{ xm0[1] }}</v-icon>

              </div>
            </li>
            </draggable>
         </ul>
       </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:  {
    xMenuy: {
      type: Array,
      required: true
    }
  },
  data: () => {
      return {
         xMenuy1: []
         //mutableList: JSON.stringify(this.xMenu)
          //xMenux: JSON.parse(this.xMenu)
            // mutableList: JSON.parse(this.list);
        }
  },
    mounted () {
     alert(this.xMenuy)
     this.$store.dispatch('setMenu', this.xMenuy)
     alert(this.$store.state.xMenuz)
     this.xMenuy.forEach(element => {
       this.xMenuy1.push(element)

     });
   },
   computed: {
     ...mapState([
      'xMenuz'
    ])
   },
  methods: {
    chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
  AddEmptyItem: function () {
      var aEmpty2 = Array(11)
      aEmpty2[0] = 'Aplikace'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Item'
      aEmpty2[10] = []
      return aEmpty2;
    }

  }
}
</script>
<style scoped>
  li  {
    list-style: none;
  }
  .g0 {
  background: #1B5E20;
  padding-left: 0px;
  margin: 2px;
}
.i0 {
  background: #81C784;
  border-right: solid 1px;
  padding-left: 5px;
}
.g1 {
  background: #00838F;
  padding-left: 10px;
  margin: 2px;
}
.i1 {
  background: #80DEEA;
  border-right: solid 1px;
  padding-left: 15px;
}
.g2 {
  background: #827717;
  padding-left: 20px;
  margin: 2px;
}
.i2 {
  background: #D4E157;
  border-right: solid 1px;
  padding-left: 25px;

}
.g3 {
  background: #F57F17;
  padding-left: 30px;
  margin: 2px;
}
.i3 {
  background: #FFEE58;
  border-right: solid 1px;
  padding-left: 35px;
}
.g4 {
  background: #6D4C41;
  padding-left: 40px;
  margin: 2px;
}
.i4 {
  background: #8D6E63;
  border-right: solid 1px;
  padding-left: 45px;

}
.g4 {
  background: #CFD8DC;
  padding-left: 50px;
  margin: 2px;
}
.i4 {
  background: #8D6E63;
  border-right: solid 1px;
  padding-left: 55px;

}

.g5 {
  background: #5E35B1;
  padding-left: 60px;
  margin: 2px;
}
.i5 {
  background: #B39DDB;
  border-right: solid 1px;
  padding-left: 65px;
}

.g6 {
  background: #3949AB;
  padding-left: 60px;
  margin: 2px;
}
.i6 {
  background: #C5CAE9;
  border-right: solid 1px;
  padding-left: 65px;

}
.g7 {
  background: #4FC3F7;
  padding-left: 60px;
  margin: 2px;
}
.i7 {
  background: #80D8FF;
  border-right: solid 1px;
  padding-left: 65px;

}

div {
  border-color: white;
  border-radius: 2px;
  margin: 1px;


}
li {
  text-align: left;
  list-style: none;
}
._left {
  left: 0px;
}
._right {
  right: 0px;
}

</style>
