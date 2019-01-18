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
 .JsemVidetMalo {
   opacity: 0.8;
   visibility: visible;
   background: #E4E7ED;
   display: block;

 }
 .NejsemVidet {
   opacity: 0.5;
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
  /* background-color: #f0f0f0; */
  background-color: #f5f7fa;
  opacity: 0.8;
  text-align:center;



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
  font-size:14px;
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
   /* height: 22px; */

}
.dcell_edit {
  text-align: left;
  font-style: italic;
  border: solid 1px;border-color:black;
   /* height: 22px; */

}

.oznac {
  text-align: left;
  font-style: italic;
  border: solid 1px;border-color:black;

}
.seda {
  background: #eee !important;
}
.bila{
  background-color: white !important;
}
.bila2{
  background-color: #E0F7FA !important;
}

ul {
  z-index: 1305000 !important;
}
li {
  z-index: 1305000 !important;
}

.el-select-dropdown {
  z-index: 1305000 !important;
}
.el-popper {
  z-index: 1305000 !important;
}

el-autocomplete-suggestion el-popper el-select-dropdown__item{
  z-index: 1305000 !important;
}

div[role="region"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
    }
 input[type="text"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
   }

 .el-date-table th {

   width: 20px;
 }
 .el-year-table td  {

   width: 20px;
 }
.el-month-table td   {

   width: 48px;
 }

 .el-year-table td  .cell {

   width: 18px;
 }
 .el-month-table td .cell  {

   width: 18px;
 }
 .el-input-group__prepend {
    border-right: 1px !important;
    font-size: 12px !important ;
}
.h-1 {
  height:0.1px;
  font-size:0.1px
}
.h-1b {
  height:0.1px;
  font-size:0.1px;
  display: block;


}
.c-1 {
  text-align: center;
}
.nb {
  border:none;
}
.h-100 {
  height : 100%;
}
.w-100 {
  width : 100%;
}
.leva {
  text-align:left;

}
.stred {
  text-align:center;
}
.prava {
  text-align:right;

}
.tdlr {
  border-left: none;
  border-right: none;
}
.tdline {
  border-bottom: solid 1px #cccccc;
  border-left: none;
  /* border-right: none; */
  border-right: solid 1px #cccccc;
}
.tdl {
  border-bottom: solid 1px #cccccc;
  border-left: none;
   border-right: none;

}
.tdn {
  border-left: none;
  border-right: none;
}
.tdln {
  border-left: none;

}
.tdrn {
  border-right: none;

}
.prvni {

   background: #FFFFFF;
}
.druha {
  background: #E3F2FD;
}
.seda {
  background:#E0E0E0;
}


.handle {
    width: 50px;
    height: 50px;
    font-size: 20px;
   }
   .handle-bm {
    width: 50px;
    height: 50px;
    font-size: 20px;
   }




</style>
<style lang="stylus">
  $color-pack = false
  @import '~vuetify/src/stylus/main'
</style>
