<template>
  <div id="vue-frame" style="top:40px;width:100%;height:800px;background:white">
  <el-button @click="okno">Okno</el-button>
  <!-- <vue-frame text="JS OBJ" url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects" frame="frameDoc3"  type="a"></vue-frame> -->
   <br />
     <iframe id="frameDoc3" name="frameDoc3" src="http://element-cn.eleme.io/#/en-US/component/table" style="width:100%; height:100%" width="100%" height="100%"></iframe>
</div>



</template>

<script>
export default {
  methods: {
    okno () {
      var x= document.getElementById("frameDoc3")
      // x.src="https://google.com"
      window.open("http://element-cn.eleme.io/#/en-US/component/table","UITABLE")
  //    alert('okno'+x)
    }
  }
}
</script>
<style scoped>
</style>
