<template>
  <div id="vue-frame" style="top:40px;width:100%;height:800px;background:white">

  <vue-frame text="VueJS" url="https://vuejs.org" frame="frameDoc3" type="a"  default></vue-frame>
  <vue-frame text="Api Vue" url="https://vuejs.org/v2/api" frame="frameDoc3" type="a"></vue-frame>
  <vue-frame text="UI-EL" url="http://element-cn.eleme.io/#/en-US/component/checkbox" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="Table" url=" http://element-cn.eleme.io/#/en-US/component/table" frame="frameDoc3"  type="a"></vue-frame>

  <vue-frame text="VueTify" url="https://vuetifyjs.com/en/components/selects" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="Ikony" url="https://vuetifyjs.com/en/components/icons" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="Mat" url="https://material.io/icons/" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="UI" url="http://element-cn.eleme.io/#/en-US/component/icon" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="Awe" url="http://fontawesome.io/icons/" frame="frameDoc3"  type="a"></vue-frame>
  <vue-frame text="[FRAMES]" url="https://www.npmjs.com/package/vue-frame" frame="frameDoc3"  target="externi" type="a"></vue-frame>
  <vue-frame text="[IFRAMES2]" url="http://assets.en.oreilly.com/1/event/29/The%20Secret%20Weapons%20of%20the%20AOL%20Optimization%20Team%20Presentation.pdf" frame="frameDoc3"   type="a"></vue-frame>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" target="Array">TEST</a>
  <a href="https://78.102.17.162:335/pp2/index.php?db=1" target="Array">PP2</a>



  <v-btn @click="okno">Okno</v-btn>


  <!-- <vue-frame text="JS OBJ" url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects" frame="frameDoc3"  type="a"></vue-frame> -->





   <br />
     <iframe id="frameDoc3" name="frameDoc3" src="./" style="width:100%; height:100%" width="100%" height="100%"></iframe>

</div>



</template>

<script>
export default {
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
