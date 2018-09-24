<template>
 <div id="vue-frame" style="top:40px;width:100%;height:800px;background:white">
<draggable v-model="pList"  :options="{group: 'SoloSeparate'}" @start="drag=true" @end="drag=false"  :drag-handle="'.drag00'">
<el-col :span="8" v-for="(item,ii) in pList" :key="ii">
  <el-card class="box-card" >

  <div slot="header" class="clearfix drag00">
    <span><a :href="item[2]" :target="item[1]">{{item[1]}}</a></span>
    <el-button style="float: right; padding: 3px 0" type="text" class="drag00" >Presun</el-button>
  </div>
  <div class="text item" style="height:500px">
      <iframe id="frameDoc3" name="frameDoc3" :src="item[2]" style="width:100%; height:100%" width="100%" height="100%"></iframe>
  </div>

</el-card>
</el-col>
</draggable>



   <!-- <iframe id="frameDoc3" name="frameDoc3" src="./" style="width:100%; height:100%" width="100%" height="100%"></iframe> -->

</div>



</template>

<script>
export default {
  data: () => {
    return {
      pList: []

    }
  },
  mounted () {

    this.pList.push(Array("GJ_P_1 R","GJ R","https://www.fxblue.com//fxblueview.aspx?id=645853"))
    this.pList.push(Array("EU R 1","EU R 1 (104)","https://www.fxblue.com/fxblueview.aspx?id=356107"))
    this.pList.push(Array("Kacka EJ R","Kacka EJ R","https://www.fxblue.com//fxblueview.aspx?id=Kacka_1")) //Prvni treba brukr, duhy naky upresneni, treti odkaz

    this.pList.push(Array("PTF57 GJ","PTF57 GJ MAX","https://www.fxblue.com/fxblueview.aspx?id=20443066"))
    this.pList.push(Array("PTF55 EJ","PTF55 EJ MAX","https://www.fxblue.com/fxblueview.aspx?id=20443065"))
    this.pList.push(Array("PTF54 EU","PTF54 EU MAX","https://www.fxblue.com/fxblueview.aspx?id=20440414"))
    this.pList.push(Array("Soucet EJ","Soucet EJ","https://www.fxblue.com//fxblueview.aspx?id=Kacka_1,20424457,20429274,20435820,20443065")) //Prvni treba brukr, duhy naky upresneni, treti odkaz
    this.pList.push(Array("Soucet MAX","Soucet MAX ","https://www.fxblue.com//fxblueview.aspx?id=20443065,20443066,20440414")) //Prvni treba brukr, duhy naky upresneni, treti odkaz

    this.pList.push(Array("PTF50-01 EJ","PTF50 EJ","https://www.fxblue.com/fxblueview.aspx?id=20424457"))
    this.pList.push(Array("PTF50-03 EJ","PTF50-03 EJ","https://www.fxblue.com/fxblueview.aspx?id=20429274"))
    this.pList.push(Array("PTF52 EJ","PTF52 EJ","https://www.fxblue.com/fxblueview.aspx?id=20435820"))





    this.pList.push(Array("XM_2 R","K1_4b Rmini","https://www.fxblue.com//fxblueview.aspx?id=19078954"))
    this.pList.push(Array("D nove","D Manual+ EU port","https://www.fxblue.com//fxblueview.aspx?id=20293568"  ))
    this.pList.push(Array("Moje","Moje2mini","https://www.fxblue.com//fxblueview.aspx?id=19078945,19078954")) //Prvni treba brukr, duhy naky upresneni, treti odkaz

    this.pList.push(Array("Kombajn","Kombajn","https://www.fxblue.com//fxblueview.aspx?id=kombajn"))
    this.pList.push(Array("Limit1 ","Limit 1","https://www.fxblue.com/fxblueview.aspx?id=limit1"))
    // this.//https://www.fxblue.com/users/1
    this.pList.push(Array("DAX","DAX","https://www.fxblue.com/fxblueview.aspx?id=dax_hankeys"))

    this.pList.push(Array("DAX2","DAX PX","https://www.fxblue.com//fxblueview.aspx?id=905196"))
    this.pList.push(Array("Pokus","Pokus","https://www.fxblue.com//fxblueview.aspx?id=Kacka_1,19078954,645852,356107,limit1,20293568"))
     //this.pList.push(Array("XM_1","Slepidlo","https://www.fxblue.com//fxblueview.aspx?id=19078945"))


    // 20293568
    // -,kombajn
    //this.pList.push(Array("Pokus","Pokus","https://www.fxblue.com/users/Kacka_1,19078954,645852,356107,kombajn,limit1"))


  },


  methods: {
    okno () {
      var x= document.getElementById("frameDoc3")
      // x.src="https://google.com"
      window.open("https://www.printpoint.cz/","frameDoc3")
  //    alert('okno'+x)
    }
  }
}
</script>
<style scoped>
</style>
