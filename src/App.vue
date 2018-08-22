<template>
  <div id="app" app-data="true">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'

}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.Makam {
   opacity: 0.5;

 }
 .JsemVidet {
   opacity: 1;
   visibility: visible;
   display: block;

 }
 .NejsemVidet {
   opacity: 0.1;
   visibility: hidden;
   display: none;
 }
 div {
   border-radius: 0px !important;
 }
 button {
   border-radius: 0px !important;
 }
 text {
   border-radius: 0px !important;
 }
 select lable span select {
   border-radius: 0px !important;
 }
 .el-select .el-select--mini {
    border-radius: 0px !important;
    background-color: pink;
 }
 .el-select .el-select--mini {
    border-radius: 0px !important;
    background-color: pink;
 }
 .el-radio-group {
    border-radius: 0px !important;
    background-color: pink;

 }

 /* Tabulky */
 * {
  box-sizing: border-box;
}


table {

	border-collapse: collapse;
	overflow: hidden;
  background-color: #ccc;
}


th {
  background-color: #f0f0f0;
}
td {
  background-color: white;
}

td, th {
  min-width: 2em;
  max-width: 10em;
  height: 2em;
  max-height: 2em;
  min-height: 2em;
  width: 10em;
  border: 1px solid #ccc;
}

.mth {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}

.mtd {
  background-color: white;
  border: 1px solid #ccc;
}
.mtd2 {
  background-color: white;
  border: 1px dotted #000000;
}
::-webkit-scrollbar {
  display: none;
}
html div {
 -ms-overflow-style: none;
}
.mright {
  text-align: right;
}
.mleft {
  text-align: left;
}
.center {
  text-align: center
}
.cell {
  text-align: right;

}
.cell_edit {
  text-align: left;
  font-style: italic;

}

.dcell {

  border: solid 1px;border-color:silver;

}
.dcell_edit {
  text-align: left;
  font-style: italic;
  border: solid 1px;border-color:black;

}







</style>
<style lang="stylus">
  $color-pack = false
  @import '~vuetify/src/stylus/main'
</style>
