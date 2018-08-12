<template>
 <div id="vue-frame" style="top:40px;width:100%;height:800px;background:white">
<draggable v-model="pList"  :options="{group: 'SoloSeparate'}" @start="drag=true" @end="drag=false"  :drag-handle="'.drag00'">
<el-col :span=12 v-for="(item,ii) in pList" :key="ii">
  <el-card class="box-card" >

  <div slot="header" class="clearfix drag00">
    <span><a :href="item[2]">{{item[1]}}</a></span>
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
    this.pList.push(Array("Zvirectvo","Zvirectvo","https://cs.wikipedia.org/wiki/%C4%8Cesk%C3%BD_svaz_chovatel%C5%AF_drobn%C3%A9ho_zv%C3%AD%C5%99ectva"))
    this.pList.push(Array("Zvirectvo","Zvirectvo","https://heroldreznickepotreby.cz/eshop/reznicke-potreby/jatecni-pristroje-a-prislusenstvi/jatecni-pristroje/1469-jatecni-pristroj-na-kraliky-a-drobne-zvirectvo"))
    this.pList.push(Array("GJ_P_1","GJ","https://www.fxblue.com//fxblueview.aspx?id=645852"))
    this.pList.push(Array("Real_1","R (104)","https://www.fxblue.com/fxblueview.aspx?id=356107"))
    this.pList.push(Array("XM_1","Slepidlo","https://www.fxblue.com//fxblueview.aspx?id=19078945"))
    this.pList.push(Array("XM_2","K1_4b","https://www.fxblue.com//fxblueview.aspx?id=19078954"))
    this.pList.push(Array("D nove","D Manual+ EU port","https://www.fxblue.com//fxblueview.aspx?id=20293568"  ))
    this.pList.push(Array("Moje","Moje2","https://www.fxblue.com//fxblueview.aspx?id=19078945,19078954")) //Prvni treba brukr, duhy naky upresneni, treti odkaz
    this.pList.push(Array("Kacka_1","Kacka_1","https://www.fxblue.com//fxblueview.aspx?id=Kacka_1")) //Prvni treba brukr, duhy naky upresneni, treti odkaz
    this.pList.push(Array("Limit1 ","Limit 1","https://www.fxblue.com/fxblueview.aspx?id=limit1"))
    // this.//https://www.fxblue.com/users/1
    this.pList.push(Array("DAX","DAX","https://www.fxblue.com/fxblueview.aspx?id=dax_hankeys"))
    this.pList.push(Array("Kombajn","Kombajn","https://www.fxblue.com//fxblueview.aspx?id=kombajn"))
    this.pList.push(Array("DAX2","Kombajn","https://www.fxblue.com//fxblueview.aspx?id=905196"))
    this.pList.push(Array("Pokus","Pokus","https://www.fxblue.com//fxblueview.aspx?id=Kacka_1,19078954,645852,356107,limit1,20293568"))
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
