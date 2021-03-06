import moment from "moment";
import axios from "axios";
import url from "@/services/url";
import store from "@/store/store";
//import { mapState } from "vuex";
import { Notification } from 'element-ui';
import { MessageBox } from 'element-ui'

//import {MAINMENULAST} from '../components/Calc/CalcCentral.js';  //

export default {
  //Obsluha vuexu
  setVal(cname, cval) {
    const jVal={}
    jVal[cname]=cval
    store.dispatch('setVal',jVal)
  },
  setValObj(jVal) {
    store.dispatch('setVal', jVal)
  },
  setValInit(jVal) {
    store.dispatch('setValInit', jVal)
  },
  unset(jVal) {
    store.dispatch('unset', jVal)
  },
  getStore( varname) {
    return store.state[varname]
  },
  dispatch(cname, jVal={}){
    store.dispatch(cname, jVal)

  },
  //Eof obsluha Vuexu

  //Hlasky
  notify(jVal={title: "hello", message: "world", type: "error"}){
    if (jVal.type=='error'){
      Notification.error(jVal);
    }
    if (jVal.type=='warning'){
      Notification.warning(jVal);
    }
    if (jVal.type=='succes'){
      Notification.success(jVal);
    }
    if (jVal.type=='succes'){
      Notification.info(jVal);
    }

  },

  Confirm2(txt='Nic confirm',txt2='AnoNe',Jval=
  {
    distinguishCancelAndClose: true,
    confirmButtonText: "Ano?",
    cancelButtonText: "Ne"
  }
  ) {
    return new Promise((resolve, reject)=>{
    var neco = MessageBox.confirm(txt,
    txt2,
    Jval
    )
    .then((res)=>{
      resolve(true)
    })
    .catch(()=>{
      //reject('jarda')
      resolve(false)
    })
  })
  },

  mAlert(txt, dur = 5000,title='Oznameni') {

    this.notify({
      title: title,
      message: `${txt}`,
      type: "error",
      offset: 100,
      duration:dur
    });
  },

  mLog(txt, dur = 10000,title='Oznameni') {
    this.notify({
      title: title,
      message: `${txt}`,
      type: "error",
      offset: 100,
      duration: dur
    });
  },

//Hlasky

  getBottom(id, addPoz = 10) {
    var neco = -1000;
    var oNeco;
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetTop + oNeco.offsetHeight + addPoz;

      //neco = oNeco.offsetTop
      //alert(neco)
    } else {
    }

    return neco;
  },
  getLeft(id, addPoz = 10) {
    var neco = -1000;
    var oNeco;
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetLeft + addPoz;
    } else {
    }

    return neco;
  },
  getWidth(id, addPoz = 10) {
    var neco = -1000;
    var oNeco;
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetWidth + addPoz;

      //neco = oNeco.offsetTop
      //alert(neco)
    } else {
    }

    return neco;
  },

  getHeight(id, addPoz = 10) {
    var neco = -1000;
    var oNeco;
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetHeight + addPoz;

      //neco = oNeco.offsetTop
      //alert(neco)
    } else {
    }

    return neco;
  },

  hasClass(element, cls) {
    try {
      return element.className.split(" ").indexOf(cls) > -1;
    } catch (e) {
      return false;
    }
  },
  datum(value) {
    return moment(String(value)).format("MM/DD/YYYY");
  },
  datum2(value) {
    return moment(String(value)).format("MM.DD.YY hh:mm");
  },
  datum20(value) {
    return moment(String(value)).format("DD.MM.YYYY hh:mm:ss");
    //return moment(String(value)).format('MM.DD.YYYY')
  },
  datum200(value) {
    return moment(String(value)).format("YYYYMMDD hh:mm:ss");
    //return moment(String(value)).format('MM.DD.YYYY')
  },
  datum201(value) {
    return moment(String(value)).format("DD.MM.YYYY hh:mm:ss");
    //return moment(String(value)).format('MM.DD.YYYY')
  },
  datum3(value) {
    return moment(String(value)).format("DD.MM.YYYY");
  },

  datum4(value) {
    return moment(String(value)).format("YYYYMMDD");
  },
  datum5(value) {
    return moment(String(value)).format("YYYYMMDDhhmm");
  },
  obdobi(value) {
    return moment(String(value)).format("YYYYMM");
  },
  cas3(value) {
    return value.substring(0, 5);
  },
  dnes() {
    var xd = new Date();
    //var m =  ("0"+""+xd.getMonth()+"").slice(-2)
    //var d =  ("0"+""+xd.getDay()+"").slice(-2)
    var m = ("0" + "" + (xd.getMonth() * 1 + 1) + "").slice(-2);
    var d = ("0" + "" + xd.getDate() + "").slice(-2);
    //this.Alert2(xd.getFullYear()+"."+m +"."+ d, xd )

    return xd.getFullYear() + "." + m + "." + d;
    // return this.datum(xd)
  },
  cp(obj) {
    const self = this;
    var nobj = {};
    try {
      for (let key in obj) {
        nobj[key] = obj[key];
      }
    } catch (e) {
      console.log(e);
    }
    return nobj;
  },

  cp2(obj) {
    const self = this;
    var nobj = {};
    try {
      for (let key in obj) {
        if (typeof obj[key] === "object") {
          nobj[key] = this.cp(obj[key]);
        } else {
          nobj[key] = obj[key];
          //alert(nobj[key])
        }
      }
    } catch (e) {
      console.log(e);
    }
    return nobj;
  },
  cislo(ncislo = 0) {
    ncislo = ncislo + "";
    if (ncislo > "" && ncislo.match(/,/)) {
      return (ncislo + "").replace(/,/, ".") * 1;
    }
    return ncislo;
  },

  hasClassId(elementId, cls) {
    return (
      document
        .getElementById(elementId)
        .className.split(" ")
        .indexOf(cls) > -1
    );
  },

  addClass(element, cls) {
    if (!this.hasClass(element, cls)) {
      element.className += " " + cls;
      element.className = element.className.trim();
    }
  },

  removeClass(element, cls) {
    if (this.hasClass(element, cls)) {
      element.className = element.className.replace(cls, "");
    }
  },
  changeClass(element, oldClass, newClass) {
    try {
      this.removeClass(element, oldClass);
      this.addClass(element, newClass);
    } catch (e) {
      console.log("Nelze zmeni Class pro ", element);
    }
  },
  al(txt) {
    alert(txt);
  },
  txt(txt) {
    return txt;
  },
  spl(ctxt, x) {
    return ctxt.split(x);
  },
  isVisible(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  },

  setUp(_obj1, _obj2, _obj3, self, moduleName) {
    var tmpObj = "";

    if (document.getElementById(moduleName)) {
      tmpObj = document.getElementById(moduleName);
      var s1 = 20;
      var s2 = 50;
      var s3 = 100;
      var _h = tmpObj.clientHeight;
      var _w = tmpObj.clientWidth;
    } else {
      tmpObj = window;
      var s1 = 110;
      var s2 = 140;
      var s3 = 270;
      var _h = tmpObj.innerHeight;
      var _w = tmpObj.innerWidth;
    }

    if (document.getElementById(_obj1)) {
      try {
        document.getElementById(_obj1).style.height =
          Math.round(_h - s1) + "px";
      } catch (e) {
        console.log("Neni obj1", _obj1);
      }
    } else {
      console.log(_obj1 + " Neni");
    }

    if (document.getElementById(_obj2)) {
      try {
        document.getElementById(_obj2).style.height =
          Math.round(_h - s2) + "px";
      } catch (e) {
        console.log("Neni obj1", _obj1);
      }
    } else {
      console.log(_obj2 + " Neni");
    }
    try {
      document.getElementById(_obj3).style.height = Math.round(_h - s3) + "px";
    } catch (e) {
      console.log("Neni obj1", _obj1);
    }
    try {
      document.getElementById(_obj3).addEventListener("keydown", function(e) {
        self.obsluha(e, e.target);
      });
    } catch (e) {
      console.log("Neni obj1", _obj1);
    }
    try {
      document.getElementById(_obj3).addEventListener("click", function(e) {
        self.obsluha(e, e.target);
      });
    } catch (e) {
      console.log("Neni obj1", _obj1);
    }

    window.addEventListener("resize", function() {
      try {
        document.getElementById(_obj1).style.height =
          Math.round(_h - s1) + "px";
      } catch (e) {
        console.log("Neni obj1", _obj1);
      }
      try {
        document.getElementById(_obj2).style.height =
          Math.round(_h - s2) + "px";
      } catch (e) {
        console.log("Neni obj1", _obj1);
      }
      try {
        document.getElementById(_obj3).style.height =
          Math.round(_h - s3) + "px";
      } catch (e) {
        console.log("Neni obj1", _obj1);
      }
      // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
    });
  },
  wyska(proc = 0.9) {
    return window.innerHeight * proc;
  },

  sirka(proc = 0.9) {
    return window.innerWidth * proc;
  },

  obsluha2(e, self) {
    var searchObj = self.objSearchBar;
    var rows = self.list.length - 1;
    var cols = self.cols.length - 1;

    const el = e.target;
    const f = this;
    if (el.type == "button" || !el.type) {
      return;
    }

    var isPresun = false;
    var elObalId = "d" + el.id.substring(1);
    var elObal = document.getElementById(elObalId);
    var aEl = el.id.split("_");
    var curRow = aEl[2] * 1;
    var curCol = aEl[4] * 1;
    var newId = aEl[0] + "_r_";
    var isEdit = self.cols[curCol].isEdit;

    var ekeyCode = e.keyCode;
    var eshiftKey = e.shiftKey;
    var keyCodes = Array();
    var keyCodesExitSave = Array();
    var keyCodesExitEscape = Array();

    if (e.type == "click") {
      ekeyCode = -13;
      // el.style.outline="none";
    }

    keyCodesExitSave = [13, 9, -13];
    keyCodesExitEscape = [27];

    // var keyCodesExitSave =

    if (!self.isWrite && ekeyCode == 13 && e.metaKey) {
      //alert('Savez')
      self.saveLines(0);
      if (!el.type == "number") {
        el.selectionEnd = el.selectionStart;
        el.style.outline = "none";
      }
      return;
    }

    if (!self.isWrite && (ekeyCode == 46 || ekeyCode == 8)) {
      self.deleteLine(curRow);
      return;
    }

    if (
      !self.isWrite &&
      ekeyCode == 90 &&
      e.metaKey &&
      self.listEdits.length > 0
    ) {
      //       this.$alert(ekeyCode)
      self.backLines();
      return;
      //  this.deleteLine(curRow)
    }

    self.aInfo.push([ekeyCode]);
    //return
    if (document.getElementById(searchObj) && ekeyCode == 114) {
      document.getElementById(searchObj).focus();
      document.getElementById(searchObj).style.outline = "none";
    }
    keyCodes = keyCodes.concat([13, 27, 9, -13]);
    keyCodes = keyCodes.concat([40, 37, 38, 39]); //Sipky
    keyCodes = keyCodes.concat([33, 34, 35, 36]); // PedzDaun, pedzAp. End,Home

    //
    if (self.isWrite) {
      var isReturn = true;
      if (keyCodesExitSave.indexOf(ekeyCode) > -1) {
        //        self.aInfo.push(["ExitSave",curCol,curRow])
        self.isWrite = false;
        // this.cols[curCol].id

        if (self.list[curRow][self.cols[curCol].id] != el.value) {
          var prev = self.list[curRow][self.cols[curCol].id];
          // alert('eee' + prev + "/ "+self.list[curRow])
          var oldRecord = Array();
          var y;
          for (y in self.list[curRow]) {
            oldRecord[y] = self.list[curRow][y];
          }

          //self.listEdits.push([self.list[curRow],'edit',prev])
          //alert('tady')
          self.listEdits.push([oldRecord, "edit", prev]);
          var eLen = self.listEdits.length - 1;

          //self.listEdits[eLen][self.cols[curCol].id] = prev

          self.list[curRow][self.cols[curCol].id] = el.value;
          self.aInfo.push(self.listEdits);
          self.aInfo.push(oldRecord);
        }
        el.setAttribute("readonly", true);
        f.removeClass(el, "bila2");
        isReturn = false;
      }

      if (keyCodesExitEscape.indexOf(ekeyCode) > -1) {
        self.isWrite = false;
        el.setAttribute("readonly", true);
        f.changeClass(elObal, "dcell", "dcell_edit");
        f.removeClass(el, "bila2");
        el.value = self.list[curRow][self.cols[curCol].id];
        //        elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
        return true;

        el.focus();
        el.style.outline = "none";
      }

      if (ekeyCode == 13) {
        ekeyCode = 40;
      }
      if (isReturn == true) {
        return true;
      }
    }

    //self.aInfo = aEl
    //self.aInfo.push(keyCodes)
    //self.aInfo.push(ekeyCode)
    //  self.aInfo.push([rows, cols])
    //  self.aInfo.push(['Target: '+ el.id])
    //  self.aInfo.push([elObalId])
    //  self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + this.isWrite])

    self.info = rows + "/ " + cols;

    if (Math.abs(ekeyCode) == 13 || Math.abs(ekeyCode) == 113) {
      //el.className=el.className.replace(/cell/,'cell_edit')
      if (el.hasAttribute("readonly") && isEdit) {
        el.removeAttribute("readonly");
        f.addClass(el, "bila2");
        if (el.type.match(/select/g)) {
          el.focus();
          el.style.outline = "none";
        } else {
          if (ekeyCode == 13) {
            el.select();
          }
        }
        // self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + self.isWrite])
        // el.selectionEnd = el.selectionStart;
        self.isWrite = true;
      }
    }

    el.onfocus = function() {
      if (el.type == "select-one" && el.id != self.lastId) {
        self.currentOrigValue = el.value;
        self.lastId = el.id;

        //alert(origValue)
        //alert('1111')
      }
      // self.aInfo.push(['1. elObaId', elObalId, ' Obal ', elObal ])
      //elObal.className=elObal.className.replace(/dcell/,'dcell_edit')
      //elObal.className=elObal.className.replace(/dcell_edit/,'').trim()
      //elObal.className=elObalNew.className.replace(/dcell/,'').trim()

      el.style.color = "black";
      el.style.outline = "none";
      if (!self.isWrite) {
        if (!el.type == "number") {
          el.selectionEnd = el.selectionStart;
        }
      }
    };

    el.onchange = function() {
      if (el.type == "select-one" && el.hasAttribute("readonly") == true) {
        // el.value = self.currentOrigValue
        self.listEdits.push([self.list[curRow], "edit"]);
        self.list[curRow][self.cols[curCol].id] = el.value;
        //alert('V rezimu prohlizeni nelze zmenit ,moznosti :  click, Enter, Tab ' + el.value + '/ ' +  self.currentOrigValue + '/' + self.lastId)
        // return true
      }
      if (el.type == "select-one" && el.hasAttribute("readonly") == false) {
        //alert('change' + el.type+ "/" + el.hasAttribute('readonly')+" Wr "+ self.isWrite )
        self.listEdits.push([self.list[curRow], "edit"]);
        self.list[curRow][self.cols[curCol].id] = el.value;
      }

      if (self.saveNow == true) {
        //alert('change' + el.id)
        self.saveLines(0);
      }

      el.style.color = "green";
      return;

      if (self.list[curRow][self.cols[curCol].id] != el.value) {
        self.listEdits.push([self.list[curRow], "edit"]);
        self.list[curRow][self.cols[curCol].id] = el.value;
      }

      // self.listEdits.push([self.list[curRow],'edit'])
      //self.aInfo.push(self.list[curRow])
    };

    el.onblur = function() {
      //el.setAttribute('readonly',true)
      //el.className=el.className.replace(/cell_edit/,'cell')
      //alert('blur' + el.type+ "/" + el.hasAttribute('readonly'))
      elObal.className = elObal.className.replace(/dcell_edit/, "dcell");
      el.style.color = "black";

      if (
        !el.hasAttribute("readonly") &&
        curRow < self.list.length &&
        self.list[curRow][self.cols[curCol].id] != el.value
      ) {
        ///alert('tady :' + el.hasAttribute('readonly'))
        self.listEdits.push([self.list[curRow], "edit"]);
        self.list[curRow][self.cols[curCol].id] = el.value;
      }
      el.setAttribute("readonly", true);
      f.removeClass(el, "bila2");
      //alert('aaa' + ekeyCode+ el.value)
    };
    switch (ekeyCode) {
      case 40: //Sipka dolu
        if (curRow < rows) {
          newId += curRow + 1 + "_c_" + curCol;
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.changeClass(elObal, "dcell_edit", "dcell");
          isPresun = true;
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
        }
        break;
      case 34: //pgDn
        var tmpRow = curRow + 6;
        var tmpNewId = newId;
        newId += tmpRow + "_c_" + curCol;

        while (tmpRow >= self.list.length && tmpRow > -1) {
          tmpRow--;
          newId = tmpNewId;
          newId += tmpRow + "_c_" + curCol;

          if (document.getElementById(newId)) {
            //alert(newId)
            break;
          }
        }
        setTimeout(function() {
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.addClass(elObal, "dcell");
          f.addClass(newObal, "dcell_edit");

          f.changeClass(elObal, "dcell_edit", "dcell");
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.removeClass(elObal, "elevation-1");
          f.addClass(newObal, "elevation-1");

          isPresun = true;
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
        }, 100);

        break;
      case 33: //pgUp
        var tmpRow = curRow - 6;
        var tmpNewId = newId;
        newId += tmpRow + "_c_" + curCol;

        while (tmpRow < 0 && tmpRow < self.list.length) {
          tmpRow++;
          newId = tmpNewId;
          newId += tmpRow + "_c_" + curCol;

          if (document.getElementById(newId)) {
            //alert(newId)
            break;
          }
        }
        setTimeout(function() {
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.addClass(elObal, "dcell");
          f.addClass(newObal, "dcell_edit");

          f.changeClass(elObal, "dcell_edit", "dcell");
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.removeClass(elObal, "elevation-1");
          f.addClass(newObal, "elevation-1");

          isPresun = true;
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
        }, 100);

        break;
      case 38: //Sipka nehoru
        if (curRow > 0) {
          newId += curRow - 1 + "_c_" + curCol;
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.changeClass(elObal, "dcell_edit", "dcell");
          f.addClass(newObal, "elevation-1");
          f.removeClass(elObal, "elevation-1");

          isPresun = true;
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
          // alert(document.getElementById(newId))
        }

        break;
      case 37: //Sipka left
        if (curCol > 0) {
          newId += curRow + "_c_" + (curCol - 1);
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.changeClass(elObal, "dcell_edit", "dcell");
          f.addClass(newObal, "elevation-1");
          f.removeClass(elObal, "elevation-1");

          isPresun = true;
          // alert(newId)
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
          // alert(document.getElementById(newId))
        }
        //        self.aInfo.push('ESC')
        break;

      case 39: //Sipka right
        if (curCol < cols) {
          newId += curRow + "_c_" + (curCol + 1);
          var newObalId = "d" + newId.substring(1);
          var newObal = document.getElementById(newObalId);
          f.changeClass(newObal, "dcell", "dcell_edit");
          f.changeClass(elObal, "dcell_edit", "dcell");
          f.addClass(newObal, "elevation-1");
          f.removeClass(elObal, "elevation-1");
          document.getElementById(newId).style.outline = "none";
          isPresun = true;
          // alert(newId)
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
          // alert(document.getElementById(newId))
        }
        //self.aInfo.push('ESC')
        break;
      case 9: //Tabulator
        var newCol = 0;
        if (!eshiftKey) {
          if (curCol < cols && !eshiftKey) {
            newCol = curCol + 1;
            newId += curRow + "_c_" + newCol;
          }

          if (curCol == cols && !eshiftKey) {
            if (curRow < rows) {
              newCol = 1;
              newId += curRow + 1 + "_c_" + newCol;
            }
            if (curRow == rows) {
              self.newLine();
              newCol = 1;
              newId += curRow + 1 + "_c_" + newCol;

              return;
            }
          }
        }

        if (eshiftKey) {
          if (curCol <= cols && curCol > 0) {
            newCol = curCol - 1;
            newId += curRow + "_c_" + newCol;
          }
          if (curCol == 0 && curRow > 0) {
            newCol = cols - 1;
            newId += curRow - 1 + "_c_" + newCol;
          }

          if (curCol == 0 && curRow == 0) {
            //newCol = colls - 1
            newId += curRow + "_c_" + newCol;
          }
        }

        var newObalId = "d" + newId.substring(1);
        var newObal = document.getElementById(newObalId);
        f.changeClass(newObal, "dcell", "dcell_edit");
        f.changeClass(elObal, "dcell_edit", "dcell");
        isPresun = true;
        // alert(newId)

        if (
          self.cols[newCol].isEdit &&
          document.getElementById(newId).hasAttribute("readonly")
        ) {
          document.getElementById(newId).removeAttribute("readonly");
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";

          if (!self.cols[newCol].type.match(/select/g)) {
            document.getElementById(newId).select();
          }
          f.addClass(document.getElementById(newId), "bila2");

          // element.selectionEnd = element.selectionStart;

          // self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + self.isWrite])
          self.isWrite = true;
        } else {
          document.getElementById(newId).selectionEnd = document.getElementById(
            newId
          ).selectionStart;
          document.getElementById(newId).focus();
          document.getElementById(newId).style.outline = "none";
        }

        break;

      default:
        break;
    }

    if (keyCodes.indexOf(ekeyCode) > -1) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    /*
     if (self.isWrite == true && isPresun == true ) {
      document.getElementById(newId).className=el.className.replace(/cell/,'cell_edit')
      document.getElementById(newId).removeAttribute('readonly')
     }
*/
    // self.isWrite = true

    // 40 sipka dolu, 38 sikpa nahoru, 37 left, 39 right

    //
  },

  obsluha_seznamu(id_prvku, id_seznamu = "") {
    alert(id_prvku + " : " + id_seznamu);
  },

  stopka(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  },
  vyraz(ctxt = "") {
    try {
      ctxt = ctxt.toUpperCase();
      ctxt = ctxt.replace(/([\+\(\)\?\.\\t\*])|([ ,\-])|([\}\{\]\[])/g, "");
      ctxt = ctxt.replace(/([\}\{\]\[])/g, "");
      ctxt = ctxt.replace(/([\:=])/g, "");
    } catch (e) {
      ctxt = "ERROR ";
    }
    return ctxt;
  },

  entrcount(neco) {
    try {
      return (neco.match(/\n/g) || []).length + 1;
    } catch (e) {
      return 0;
    }
  },

  Alert(
    ctxt1 = "",
    ctxt2 = "",
    ctxt3 = "",
    ctxt4 = "",
    ctxt5 = "",
    ctxt6 = ""
  ) {
    var defer = $.Deferred();
    setTimeout(function() {
      //     alert(ctxt1+"\n"+ctxt2+"\n"+ctxt3+"\n"+ctxt4+"\n"+ctxt5+"\n"+ctxt6);
      defer.resolve(
        alert(
          ctxt1 +
            "\n" +
            ctxt2 +
            "\n" +
            ctxt3 +
            "\n" +
            ctxt4 +
            "\n" +
            ctxt5 +
            "\n" +
            ctxt6
        )
      );
    }, 500);
    return defer.promise();
  },
  Info(ctxt1 = "", ctxt2 = "", ctxt3 = "", ctxt4 = "", ctxt5 = "", ctxt6 = "") {
    var ID = "InfoJarda";
    var el = "";
    var txt =
      ctxt1 +
      "\n" +
      ctxt2 +
      "\n" +
      ctxt3 +
      "\n" +
      ctxt4 +
      "\n" +
      ctxt5 +
      "\n" +
      ctxt6;
    var chtml = "<textarea cols=80 rows=8 >" + txt + "</textarea>";
    if (!document.getElementById(ID)) {
      el = document.createElement("div");

      $("body").append(el);
      el.id = ID;
      $("#" + ID).attr("id", ID);
      $("#" + ID).html(chtml);
      $("#" + ID).css("position", "absolute");
      $("#" + ID).css("bottom", "10%");
      $("#" + ID).css("right", "200px");
      $("#" + ID).css("background", "#cccccc");
      $("#" + ID).css("z-index", "100000000");
    } else {
      if (this.isEmpty(ctxt1)) {
        $("#" + ID).remove();
        //this.Alert('ke tu')
      } else {
        //this.Alert($("#"+IDtxt).attr("id")) ;
        $("#" + ID).html(chtml);
      }
    }
  },
  InfoHide(
    ctxt1 = "",
    ctxt2 = "",
    ctxt3 = "",
    ctxt4 = "",
    ctxt5 = "",
    ctxt6 = ""
  ) {
    var ID = "InfoJardaHide";
    var el = "";
    var txt =
      ctxt1 +
      "\n" +
      ctxt2 +
      "\n" +
      ctxt3 +
      "\n" +
      ctxt4 +
      "\n" +
      ctxt5 +
      "\n" +
      ctxt6;
    var chtml = "<textarea cols=80 rows=8 >" + txt + "</textarea>";
    if (!document.getElementById(ID)) {
      el = document.createElement("div");

      $("body").append(el);
      el.id = ID;
      $("#" + ID).attr("id", ID);
      $("#" + ID).html(chtml);
      $("#" + ID).css("position", "absolute");
      $("#" + ID).css("top", "10%");
      $("#" + ID).css("right", "200px");
      $("#" + ID).css("background", "#efefef");
      $("#" + ID).css("z-index", "1");
      $("#" + ID).css("opacity", "0.8");
    } else {
      if (this.isEmpty(ctxt1)) {
        $("#" + ID).remove();
        //this.Alert('ke tu')
      } else {
        //this.Alert($("#"+ID).attr("id")) ;
        $("#" + ID).html(chtml);
      }
    }
  },
  Alert2(
    ctxt1 = "",
    ctxt2 = "",
    ctxt3 = "",
    ctxt4 = "",
    ctxt5 = "",
    ctxt6 = ""
  ) {
    var obj = document.createElement("DIV");
    obj.id = "myAlert";
    var defer = $.Deferred();
    document.body.appendChild(obj);
    var $dlg = $("#myAlert").dialog({
      modal: true,
      title: ctxt1,
      text: "aaaa",
      buttons: {
        OK: function() {
          defer.resolve("AHOOJ");
          $(this).dialog("close");
        }
      },
      dialogClass: "my-dialog-1",
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }
    });
    $dlg.html(
      ctxt1 +
        "\n" +
        ctxt2 +
        "\n" +
        ctxt3 +
        "\n" +
        ctxt4 +
        "\n" +
        ctxt5 +
        "\n" +
        ctxt6
    );
    setTimeout(function() {
      $(".ui-dialog :button").focus();
    }, 1000);
    return defer.promise();
  },

  Alert3(
    ctxt1 = "",
    ctxt2 = "",
    ctxt3 = "",
    ctxt4 = "",
    ctxt5 = "",
    ctxt6 = ""
  ) {
    var obj = document.createElement("DIV");
    obj.id = "myAlert3";
    var defer = $.Deferred();
    document.body.appendChild(obj);
    ctxt1 = JSON.stringify(ctxt1);
    ctxt2 = JSON.stringify(ctxt2);
    ctxt3 = JSON.stringify(ctxt3);
    ctxt4 = JSON.stringify(ctxt4);
    ctxt5 = JSON.stringify(ctxt5);
    ctxt6 = JSON.stringify(ctxt6);
    var $dlg = $("#myAlert3").dialog({
      modal: false,
      title: ctxt1,
      text: "aaaa",
      width: "800",
      buttons: {
        OK: function() {
          defer.resolve("AHOOJ");
          $(this).dialog("close");
        }
      },
      dialogClass: "my-dialog-1",
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }
    });
    //$dlg.html("<pre>"+"\n"+ctxt2+"\n"+ctxt3+"\n"+ctxt4+"\n"+ctxt5+"\n"+ctxt6+"</pre>");
    $dlg.html(
      "<textarea cols='80' rows='50' style='width:900px'>" +
        "\n" +
        ctxt2 +
        "\n" +
        ctxt3 +
        "\n" +
        ctxt4 +
        "\n" +
        ctxt5 +
        "\n" +
        ctxt6 +
        "</textarea>"
    );
    setTimeout(function() {
      $(".ui-dialog :button").focus();
    }, 1000);
    return defer.promise();
  },

  setCislo(ctxt1 = "", cval = "0") {
    var defer = $.Deferred();

    var obj = document.createElement("DIV");
    obj.id = "myValue";

    $("#myCislo").remove();
    $("#myValue").remove();
    document.body.appendChild(obj);
    var otxt = document.createElement("input");
    otxt.type = "number";
    otxt.value = cval;
    otxt.id = "myCislo";
    $(otxt).addClass("tdl tdn elevation-0 pr-1 prava");
    $(otxt).css("outline", "none");
    //$(otxt).css("border","none")
    //style="width:90%; height:15px; text-align:right"
    obj.appendChild(otxt);
    //$(otxt).focus()
    //var $dlg=$("<div><input type='number' id='myCislo'></div>").dialog({
    var $dlg = $("#myValue").dialog({
      modal: true,
      title: ctxt1,
      buttons: {
        OK: function() {
          // alert($("#myCislo").val())
          defer.resolve($("#myCislo").val());
          //$("#myCislo").remove();
          //$("#myValue").remove();
          $(this).dialog("close");

          //$("#myValue").dialog('destroy');
        }
      },
      dialogClass: "my-dialog-1",
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }
    });

    //    $dlg.html(ctxt1+"\n"+ctxt2+"\n"+ctxt3+"\n"+ctxt4+"\n"+ctxt5+"\n"+ctxt6);
    setTimeout(function() {
      $("#myCislo").focus();
    }, 500);
    $("#myCislo").keypress(function(event) {
      if (event.which == 13) {
        //event.preventDefault();
        defer.resolve($("#myCislo").val());
        $dlg.dialog("close");
      }
    });
    return defer.promise();
  },

  Confirm(ctxt1 = "", ctxt2 = "") {
    return confirm(ctxt1, ctxt2);
  },
  getBottom(id, addPoz = 10, idVztah = "obal1_kalkulace") {
    var neco = 200;
    var oNeco;
    var obal = document.getElementById(idVztah);
    //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetTop + oNeco.offsetHeight + addPoz;
      neco = neco - obal.scrollTop;
      //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

      //oNeco.parentElement.style.background='pink'

      //neco = oNeco.offsetTop
      //    alert(neco+ " // "+ id )
    } else {
    }

    return neco;
  },
  getBottomApp(id, addPoz = 10, idVztah = "app") {
    var neco = 200;
    var oNeco;
    var obal = document.getElementById(idVztah);
    //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetTop + oNeco.offsetHeight + addPoz;
      neco = neco - obal.scrollTop;
      //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

      //oNeco.parentElement.style.background='pink'

      //neco = oNeco.offsetTop
      //    alert(neco+ " // "+ id )
    } else {
    }

    return neco;
  },

  getLeft(id, addPoz = 10, idVztah = "obal1_kalkulace") {
    var neco = 500;
    var oNeco;
    var obal = document.getElementById(idVztah);
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetLeft + addPoz;

      var r2;
      if ((r2 = oNeco.closest("#test_1"))) {
        neco = neco - r2.scrollLeft;
      }
      //alert(r2)

      // console.log(neco," LEFT ", obal.scrollLeft, " Left Neco " , oNeco.scrollLeft, oNeco.parentElement.scrollLeft , " R2 ", r2.id , "scr ", r2.scrollLeft , " r ", r2.scrollWidth )
    } else {
    }

    return neco;
  },
  getLeftApp(id, addPoz = 10, idVztah = "app") {
    var neco = 500;
    var oNeco;
    var obal = document.getElementById(idVztah);
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetParent.offsetLeft + addPoz;

      var r2;
      if ((r2 = oNeco.closest("#test_1"))) {
        neco = neco - r2.scrollLeft;
      }
      //alert(r2)

      // console.log(neco," LEFT ", obal.scrollLeft, " Left Neco " , oNeco.scrollLeft, oNeco.parentElement.scrollLeft , " R2 ", r2.id , "scr ", r2.scrollLeft , " r ", r2.scrollWidth )
    } else {
    }

    return neco;
  },
  getCislo(cislo = 0) {
    var numberFormat1 = new Intl.NumberFormat("ru-RU");
    return numberFormat1.format(cislo);
  },

  getCisloInt(cislo = 0) {
    var numberFormat1 = new Intl.NumberFormat("ru-RU");
    return numberFormat1.format(parseInt(cislo));
  },
  getWidth(id, addPoz = 10) {
    var neco = 300;
    var oNeco;
    if ((oNeco = document.getElementById(id))) {
      neco = oNeco.offsetWidth + addPoz;

      //neco = oNeco.offsetTop
      //alert(neco)
    } else {
    }

    return neco;
  },
  setFocus(id, zajakdloouho = 0) {
    //alert('pokus 1 ' + id)
    if (zajakdloouho > 0) {
      //alert('pokus 2')
      setTimeout(function() {
        if (document.getElementById(id)) {
          //alert('pokus 3')
          document.getElementById(id).focus();
          //alert('pokus 4')
        }
      }, zajakdloouho);
    } else {
      if (document.getElementById(id)) {
        document.getElementById(id).focus();
      }
    }
  },
  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  },
  isEmpty(str) {
    return !str || 0 === str.length;
  },
  Jstr(str) {
    return JSON.stringify(str);
  },
  Jparse(str) {
    return JSON.parse(JSON.stringify(str));
  },
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  ID2() {
    return Math.round(
      (Math.round(Math.random() * 1983458) *
        Math.round(Math.random() * 1983777458)) /
        Math.round(Math.random() * 198323458)
    );
  },

  dataRadkaID(id2) {
    //idefix
    var aKeys = [
      "nazev",
      "kcks",
      "ks",
      "naklad",
      "marze",
      "prodej",
      "marze_pomer",
      "expedice_datum",
      "expedice_cas",
      "user_update_idefix",
      "nazevOrig",
      "vlozit",
      "idefixuser"
    ];
    var dRet = {};

    for (var x = 0; x < aKeys.length; x++) {
      if (x == 0) {
        if (document.getElementById("seek" + id2)) {
          dRet["nazev"] = document.getElementById("seek" + id2).value;
        } else if (document.getElementById("expedice_cas" + id2)) {
          dRet["nazev"] = document.getElementById("expedice_cas" + id2).value;
          f.Alert("CASCASCAS");
        }
      } else if (document.getElementById(aKeys[x] + id2)) {
        dRet[aKeys[x]] = document.getElementById(aKeys[x] + id2).value;
      }
    }
    //this.Alert("VAL: ", "seek"+id2, document.getElementById("seek"+id2))
    return dRet;
  },

  getElByIdefix(nazev = "", id2 = 0) {
    var neco = "";
    neco = "[idefix=";
    neco += '"';
    neco += nazev + "" + id2;
    neco += '"]';

    var aprd = document.querySelector(neco);
    if (aprd) {
      // this.Alert(aprd.value)
    } else {
      //this.Alert('prdlacky', nazev,' ',id2 )
    }
    return aprd;
  },

  dataRadka(id2) {
    //idefix
    var aKeys = [
      "nazev",
      "kcks",
      "ks",
      "naklad",
      "marze",
      "prodej",
      "marze_pomer",
      "expedice_datum",
      "expedice_cas",
      "user_update_idefix",
      "nazevOrig",
      "vlozit",
      "idefixuser"
    ];
    var dRet = {};
    var obj;

    for (var x = 0; x < aKeys.length; x++) {
      if (x == 0) {
        if ((obj = this.getElByIdefix("seek", id2))) {
          dRet["nazev"] = obj.value;
        } else if ((obj = this.getElByIdefix("expedice_cas" + id2))) {
          dRet["nazev"] = obj.value;
          //this.Alert('CASCASCAS')
        }
      } else if ((obj = this.getElByIdefix(aKeys[x], id2))) {
        dRet[aKeys[x]] = obj.value;
      }
    }
    //this.Alert("VAL: ", "seek"+id2, document.getElementById("seek"+id2))
    return dRet;
  },
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },

  isZmena() {
    var neco = $("#Zmenad").get(0).value;
    neco = neco * 1;
    return neco > 0;
  },

  pof(max, proc) {
    var neco = Math.round((max * proc) / 100) + "";
    neco = `width:${neco}px`;
    return neco;

    //alert(neco)
  },

  sirka(id = "", npar = 0) {
    const self = this;
    var nret = 0;

    if (document.getElementById(id)) {
      nret = document.getElementById(id).clientWidth;
      return nret;
    } else if (nret == 0) {
      setTimeout(function() {
        if (npar < 2) {
          self.sirka(id, ++npar);
          nret = document.getElementById(id).clientWidth;
          console.log(
            "Neni ID POKUS ? ",
            document.getElementById(id),
            "  ",
            id,
            " npar ",
            npar,
            "sirka ",
            nret
          );
          return nret;
        } else {
          nret = screen.width;
          console.log(
            "Neni ID - screen ? ",
            document.getElementById(id),
            "  ",
            id
          );
          return nret;
        }
      }, 100);
    }

    return nret;
  },
  logreset(txt1 = "", txt2 = "", txt3 = "", txt4 = "") {
    //return
    let formData = new FormData();
    formData.append("txt1", txt1);
    formData.append("txt2", txt2);
    formData.append("txt3", txt3);
    formData.append("txt4", txt4);

    axios
      .post(`${url.url()}logreset`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function() {
        console.log("LOG OK!!");
      })
      .catch(function(err) {
        console.log("LOG FAILURE!!", err);
      });
  },

  log(txt1 = "", txt2 = "", txt3 = "", txt4 = "") {
    //return
    let formData = new FormData();
    formData.append("txt1", txt1);
    formData.append("txt2", txt2);
    formData.append("txt3", txt3);
    formData.append("txt4", txt4);

    axios
      .post(`${url.url()}log`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function() {
        console.log("LOG OK!!");
      })
      .catch(function(err) {
        console.log("LOG FAILURE!!", err);
      });
  }
};
