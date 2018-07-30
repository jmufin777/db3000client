<template>

<el-row :gutter="0" >
  <el-col :span=24>
  <el-tooltip content="Ulozi lokalne zmeny a prekresli hlavni menu" placement="bottom" effect="light">
    <el-button  @click="SaveMenu" type="success" icon="el-icon-check"  size="mini" class="elevation-1">Uloz</el-button>
  </el-tooltip>
  <el-tooltip  placement="bottom" effect="light">
    <div slot="content">Originalni podoba a menu <br> Vhodne pokud se neco pokazi nebo ztrati</div>
    <el-button  @click="ResetMenu" type="primary"  icon="el-icon-back"  size="mini" class="teal elevation-1">Reset Menu</el-button>
  </el-tooltip>
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">Smaze informace o ulozeni pozic oken<br>Vhodne , pokud je aplikace neprehledna</div>
    <el-button  @click="ResetWindows" type="primary" icon="el-icon-close"  size="mini" class="teal elevation-1">Reset Oken</el-button>
    </el-tooltip>
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">Ukonci a znovu nacte  aplikaci</div>
    <el-button  @click="$router.go()" type="success" icon="el-icon-success"  size="mini" class="elevation-1">OK</el-button>
    </el-tooltip>
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">{{StoreInfo}}</div>
    <el-button  @click="StoreInfo0" type="success" icon="el-icon-info"  size="mini" class="elevation-1"></el-button>
    </el-tooltip>
    <!-- <el-button  @click="jarda" type="success" icon="el-icon-success"  size="mini" class="elevation-1">Jarda</el-button> -->
   <div >
   <ul v-show="true" >
            <draggable v-model="xMenuy1"  :options="{group: 'people' }" @start="drag=true" @end="drag=false" :move="chooseItem" style="padding-right:20px;padding-top:10px">
            <li v-for="(xMy0, i0) in xMenuy1" :key="'x'+i0" >
                <span v-if="xMy0[10].length == 0 &&  xMy0[9]=='Group' " style='display:none'>  {{ xMy0[10] = [] }}{{ xMy0[10]=[AddEmptyItem()]}}</span>

              <div v-if="xMy0[10].length>0 || xMy0[9]=='Group'" class="g0">
                &nbsp;<v-icon small left class="gold"> {{ xMy0[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{ xMy0[0] }}
                <v-btn v-if="xMy0[10].length == 0"
                class="orange accent-12 elevation-10"
                light
                small
                absolute
                bottom
                fab
                ripple
                @click="xMy0[10]=[AddEmptyItem()]"
                 ><v-icon small left>add</v-icon></v-btn>

                <ul class="elevation-18">
                <draggable v-model="xMy0[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                <li v-for="(xMy1, i1) in xMy0[10]" :key="'x'+i1"  >
                  <span v-if="xMy1[10].length == 0 &&  xMy1[9]=='Group' " style='display:none'>  {{ xMy1[10] = [] }}{{ xMy1[10]=[AddEmptyItem()]}}</span>
                  <div v-if="xMy1[10].length>0" class="g1 elevation-18">

                    1.&nbsp;<v-icon small left>{{ xMy1[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy1[0]}}
                  <ul class="elevation-15">
                  <draggable v-model="xMy1[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                  <li v-for="(xMy2, i2) in xMy1[10]" :key="'x'+i2"  >
                    <span v-if="xMy2[10].length == 0 &&  xMy2[9]=='Group' " style='display:none'>  {{ xMy2[10] = [] }}{{ xMy2[10]=[AddEmptyItem()]}}</span>
                    <div v-if="xMy2[10].length>0" class="g2 elevation-15">

                      2.&nbsp;<v-icon small left>{{ xMy2[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy2[0]}}
                      <ul class="elevation-12">
                      <draggable v-model="xMy2[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                      <li v-for="(xMy3, i3) in xMy2[10]" :key="'x'+i3"  >
                        <span v-if="xMy3[10].length == 0 &&  xMy3[9]=='Group' " style='display:none'>  {{ xMy3[10] = [] }}{{ xMy3[10]=[AddEmptyItem()]}}</span>
                        <div v-if="xMy3[10].length>0" class="g3 elevation-12">
                          3.&nbsp;<v-icon small left>{{ xMy3[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy3[0]}}
                          <ul class="elevation-9">
                          <draggable v-model="xMy3[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                          <li v-for="(xMy4, i4) in xMy3[10]" :key="'x'+i4"  >
                            <span v-if="xMy4[10].length == 0 &&  xMy4[9]=='Group' " style='display:none'>  {{ xMy4[10] = [] }}{{ xMy4[10]=[AddEmptyItem()]}}</span>
                            <div v-if="xMy4[10].length>0" class="g4 elevation-9">
                                4.&nbsp;<v-icon small left>{{ xMy4[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy4[0]}}
                              <ul class="elevation-6">
                              <draggable v-model="xMy4[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                              <li v-for="(xMy5, i5) in xMy4[10]" :key="'x'+i5"  >
                                <span v-if="xMy5[10].length == 0 &&  xMy5[9]=='Group' " style='display:none'>  {{ xMy5[10] = [] }}{{ xMy5[10]=[AddEmptyItem()]}}</span>
                                <div v-if="xMy5[10].length>0" class="g5 elevation-6">
                                    5.&nbsp;<v-icon small left>{{ xMy5[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy5[0]}}
                                    <ul class="elevation-3">
                                    <draggable v-model="xMy5[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                    <li v-for="(xMy6, i6) in xMy5[10]" :key="'x'+i6"  >
                                      <span v-if="xMy6[10].length == 0 &&  xMy6[9]=='Group' " style='display:none'>  {{ xMy6[10] = [] }}{{ xMy6[10]=[AddEmptyItem()]}}</span>
                                      <div v-if="xMy6[10].length>0" class="g6 elevation-3">

                                        6.&nbsp;<v-icon small left>{{ xMy6[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy6[0]}}
                                          <ul class="elevation-0">
                                          <draggable v-model="xMy6[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                          <li v-for="(xMy7, i7) in xMy6[10]" :key="'x'+i7"  >
                                            <span v-if="xMy7[10].length == 0 &&  xMy7[9]=='Group' " style='display:none'>  {{ xMy7[10] = [] }}{{ xMy7[10]=[AddEmptyItem()]}}</span>
                                            <div v-if="xMy7[10].length>0" class="g7 elevation-0" >

                                              7.&nbsp;<v-icon small left>{{ xMy7[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy7[0]}}
                                            </div>
                                            <div v-else class="i7 elevation-0">
                                              7 i - {{i7+1}}
                                              i - {{xMy7[0]}} <v-icon small left>{{ xMy7[1] }}</v-icon>
                                            </div>
                                          </li>
                                          </draggable>
                                          </ul>
                                      </div>
                                      <div v-else class="i6 elevation-3">
                                        6 i - {{i6+1}}
                                        i - {{xMy6[0]}} <v-icon small left>{{ xMy6[1] }}</v-icon>
                                      </div>
                                    </li>
                                    </draggable>
                                    </ul>
                                </div>
                                <div v-else class="i5 elevation-5">
                                  5 i - {{i5+1}}
                                  i - {{xMy5[0]}} <v-icon small left>{{ xMy5[1] }}</v-icon>
                                </div>
                              </li>
                              </draggable>
                              </ul>
                            </div>
                            <div v-else class="i4 elevation-8" >
                              4 i - {{i4+1}}
                              {{i4}} - {{xMy4[0]}} <v-icon small left>{{ xMy4[1] }}</v-icon>
                            </div>
                          </li>
                          </draggable>
                          </ul>
                        </div>
                        <div v-else class="i3 elevation-11">
                          3 i - {{i3+1}}
                          i - {{xMy3[0]}} <v-icon small left>{{ xMy3[1] }}</v-icon>
                        </div>
                      </li>
                      </draggable>
                      </ul>

                    </div>
                    <div v-else class="i2 elevation-14">
                      2 i - {{i2+1}}
                      i - {{xMy2[0]}} <v-icon small left>{{ xMy2[1] }}</v-icon>
                    </div>
                  </li>
                  </draggable>
                  </ul>

                  </div>
                  <div v-else class="i1 elevation-17">
                    1 i - {{i1+1}}
                    i - {{xMy1[0]}} <v-icon small left>{{ xMy1[1] }}</v-icon>
                  </div>
                </li>
                </draggable>
                </ul>

              </div>
              <div v-else class="i0 elevation-20">
                i - {{i0+1}}
                i - {{xMy0[0]}} <v-icon small left>{{ xMy0[1] }}</v-icon>

              </div>
            </li>
            </draggable>
         </ul>
         </div>
      </el-col>
   </el-row>

</template>

<script>
import { mapState } from 'vuex'
import { eventBus } from '@/main.js'
export default {
  props:  {
    xMenuy: {
      type: Array,
      required: false
    }
  },
  data: () => {
      return {
         xMenuy1: [],
         StoreInfo: ''
        }
  },
    mounted () {
      if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
      }
       this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))
   },
   computed: {
      ...mapState([
       'xMenuMain',
       'isUserLoggedIn',
       'user'
     ])
   },
  methods: {
    jarda: function(xpar){
      var aneco = []
      eventBus.$emit('Alert', 'Schema' )
      return xpar
    },
    SaveMenu() {
      this.$store.dispatch('setMenuMain',this.xMenuy1)
      this.$store.commit('SETMENUMAIN',this.xMenuy1)
      this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))

    },
    StoreInfo0: function ()  {
      //alert(this.$store.state.xMenuMain.join('~'))
      this.StoreInfo = this.$store.state.xMenuMain.join('~')
      // return this.$store.state.xMenuMain.join('~')

    },

    ResetMenu() {
      this.$store.dispatch('setMenuMain',null)
      this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))

    },
    ResetWindows() {
      this.$store.dispatch('dropAllWin')
    },

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
    border-color: white;
  }
  .g0 {
  background: #1B5E20;
  padding-left: 0px;
  margin: 2px;
  color: white;

}
.i0 {
  /* background: #81C784; */
  background: #3099f1;
  border-right: solid 1px;
  padding-left: 5px;

  color: black;
}
.g1 {
  background: #00838F;
  padding-left: 10px;
  margin: 2px;
  color: black;
}
.i1 {
  background: #80DEEA;
  border-right: solid 1px;
  padding-left: 15px;
  color: black;
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
  padding-left: -55px;
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
  border-radius: 0px;
  margin: 1px;
  margin-top :1px;
  font-size: 14px;


}
li {
  text-align: left;
  list-style: none;
  cursor: pointer;
}
._left {
  left: 0px;
}
._right {
  right: 0px;
}

</style>
