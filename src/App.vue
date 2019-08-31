<template>
  <div id="app" app-data="true">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
 name: 'App',
 mounted() {
         $.datepicker.regional['cs'] = {
        closeText: 'Zavrit', // set a close button text
        currentText: 'Dnes', // set today text
        monthNames: ['Leden','Unor','Brezen','Duben','Kveten','Cerven',   'Cervenc','Srpen','Zari','Rijen','Listopad','Prsinec'], // set month names
        monthNamesShort: ['Led','Un','Bre','Dub','Kve','Cer','Crc','Srp','Zar','Rij','Lis','Pro'], // set short month names
        dayNames: ['Ne','Po','Ut','St','Ct','Pá','So'], // set  days names
        dayNamesShort: ['Ne','Po','Ut','St','Ct','Pá','So'], // set more short days names
        dayNamesMin: ['Ne','Po','Ut','St','Ct','Pá','So'], // set more short days names
        weekNames: ['Tyden'],
        dateFormat: 'dd.mm.yy', // set format date
        showWeek: true,
        firstDay: 1,
        showButtonPanel: true,
        showOtherMonths: true,
        changeYear: true,
        changeMonth: true,
    };
    $.datepicker.setDefaults($.datepicker.regional['cs']);
    this.$nextTick(function () {
      $( ".datum" ).datepicker();
    })
 },
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

.th {
  /* background-color: #f0f0f0; */
  background-color: #f5f7fa;
  opacity: 0.8;
  text-align:center;

}
td {
  background-color: white;
}
.td {
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
  /* background: #eee !important; */
  background: #e6f2fc  !important;
}
.sedadel {
  /* background: #eee !important; */
  background: #e6f2fc  !important;
  color:red;
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
.el-input
{
  font-size:13px;
  font-weight: bold;

  height:10px;
  padding-top:0px;
  padding-left:0px;
  padding-bottom:10px;
  position:relative;
  top:-5px;
  left:-1em;
}

 .el-input--mini, .el-input--suffix, .is-focus, .el-input__inner, .el-input__suffix,  .el-input__suffix-inner,  .el-input__icon, .el-icon-arrow-up, .is-reverse {



 }

.el-input__inner {
  border:none;
  border-bottom: dotted 1px ;
  border-radius: 0px;
  font-size: 13px;
  font-weight: bold;

}
.el-select__caret {
  position: relative;
  top: 15px !important;
  left: -15px !important;
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

.tdlineall {
  border-bottom: solid 1px #cccccc;
  border-top: solid 1px #cccccc;
  border-right: solid 1px #cccccc;
  border-left: none;


}
.tdl {
  border-bottom: dotted 1px #cccccc;
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
.nic {
  border-right: none;
  border-left: none;
  border-bottom: none;
  border-top: none;

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

td {
  font-size: 13px;
  font-family: Helvetica;
  color: #616266;
}
input {
  color: #616266;
}

.font_13 {
  font-size: 13px;
  font-family: Helvetica;
}
.font_12 {
  font-size: 12px;
  font-family: Helvetica;
}
.font_11 {
  font-size: 11px;
  font-family: Helvetica;
}
.font_10 {
  font-size: 10px;
  font-family: Helvetica;
}
.font_14 {
  font-size: 14px;
  font-family: Helvetica;
}

.bold {
  font-weight: bold;
}

.bot {
   vertical-align: text-bottom;
}
.tlacitko {
  border:none;
  text-decoration: underline;
  color: #4795ec;
}
.popisek {
  border:none;
  color: #4795ec;
}
textarea:focus, input:focus {
    outline: none;
}

select:focus, input:focus {
    outline: none;
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

button:focus {
    outline: 0px;
}

.ui-widget-header,.ui-state-default, ui-button {
            background:#c1ddf8;
            border: 1px solid #c1ddf8;
            color: #191d20;
            font-weight: bold;
  }

 .ui-dialog-title {
    /* color:red; */
  }


 .ui-button:focus, ui-widget:focus, ui-corner-all:focus {
   background: #c6dcf5;
   font-weight: 900;
 }

 .my-dialog-1 .ui-widget-header {
    background:#c1ddf8;
}
.my-dialog-2 .ui-widget-header {
    background:#c1ddf8;
    width: 80em;
}

 /* , ui-widget:focus, ui-corner-all:  */
.no-title .ui-dialog-titlebar {

    height:15px;
    width:200px;

}
.ui-timepicker-list {
  /* .ui-timepicker-wrapper , .ui-timepicker-input*/
  z-index: 88899977777
}

.d3 {
  text-shadow: 0 1px 0 #ccc,
               0 2px 0 #c9c9c9,
               0 1px 0 #bbb,
               0 1px 0 #b9b9b9,
               0 1px 0 #aaa,
               0 1px 1px rgba(0,0,0,.1),
               0 0 1px rgba(0,0,0,.1),
               0 1px 1px rgba(0,0,0,.3),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.25),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.15);

}
.d3a {
  text-shadow: 0 1px 0 #ccc,
               0 2px 0 #c9c9c9,
               0 3px 0 #bbb,
               0 4px 0 #b9b9b9,
               0 5px 0 #aaa,
               0 6px 1px rgba(0,0,0,.1),
               0 0 5px rgba(0,0,0,.1),
               0 1px 3px rgba(0,0,0,.3),
               0 3px 5px rgba(0,0,0,.2),
               0 5px 10px rgba(0,0,0,.25),
               0 10px 10px rgba(0,0,0,.2),
               0 20px 20px rgba(0,0,0,.15);

}
.tlacitkoMenu {
  background:#dfdede;
  border: solid 0px green;
  border-radius: 0px 0px 8px 8px !important;
  font-family: Helvetica,'Times New Roman', Times, serif;

}

.tlacitkoMenuActive {
  background:#2489cc;
  border: solid 1px #ffffff;
  border-radius: 0px 0px 8px 8px !important;
  color: #ffffff;
  font-family: Helvetica,'Times New Roman', Times, serif;
}

.hoVer:hover {
      text-shadow: 0 1px 0 #ccc,
               0 2px 0 #c9c9c9,
               0 1px 0 #bbb,
               0 1px 0 #b9b9b9,
               0 1px 0 #aaa,
               0 1px 1px rgba(0,0,0,.1),
               0 0 1px rgba(0,0,0,.1),
               0 1px 1px rgba(0,0,0,.3),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.25),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.15);

}

[v-cloak] {
  display: none;
}




</style>
<style lang="stylus">
  $color-pack = false
  @import '~vuetify/src/stylus/main'
</style>
