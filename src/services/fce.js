import moment from 'moment'
export default {

  hasClass(element, cls) {
    try {
      return element.className.split(' ').indexOf(cls) > -1
    } catch(e) {
      return false
    }

  },
  datum(value) {
    return moment(String(value)).format('MM/DD/YYYY')
  },
  datum2(value) {

    return moment(String(value)).format('MM.DD.YY hh:mm')
  },
  dnes () {
    var xd = new Date()
    //alert(xd)
    return xd.getFullYear()+"."+xd.getMonth()+"."+("0"+""+xd.getDay()+"").slice(-2)
    // return this.datum(xd)
  },

  cp(obj){
    const self = this
    var nobj = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object'){
            nobj[key] = this.cp(obj[key]);
        } else {
            nobj[key] = obj[key];
        }
    }
    return nobj;
},

  hasClassId(elementId, cls) {
    return document.getElementById(elementId).className.split(' ').indexOf(cls) > -1
  },

  addClass(element, cls) {
    if (! this.hasClass(element,cls)){
      element.className+=(' ' + cls)
      element.className=element.className.trim()
    }
  },

  removeClass(element, cls) {
    if ( this.hasClass(element,cls)){
      element.className = element.className.replace(cls,'')
    }
  },
  changeClass(element, oldClass, newClass) {
    try {
      this.removeClass(element, oldClass)
      this.addClass(element, newClass)
    } catch (e) {
      console.log('Nelze zmeni Class pro ', element)
    }

  },
  al(txt) {
    alert(txt)
  },
  spl(ctxt,x) {
    return ctxt.split(x)
  },
  isVisible(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    )
  },

  setUp(_obj1,_obj2,_obj3,self,moduleName) {


  var tmpObj=''


  if (document.getElementById(moduleName))  {
    tmpObj = document.getElementById(moduleName)
    var s1 = 20
    var s2 = 50
    var s3 = 100
    var _h = tmpObj.clientHeight
    var _w = tmpObj.clientWidth

  } else {
    tmpObj = window
    var s1 = 110
    var s2 = 140
    var s3 = 270
    var _h = tmpObj.innerHeight
    var _w = tmpObj.innerWidth

  }


if (document.getElementById(_obj1)){
    document.getElementById(_obj1).style.height=Math.round(_h - s1)  + "px"
  } else {
    console.log(_obj1 + ' Neni')
  }

    if (document.getElementById(_obj2)){
      document.getElementById(_obj2).style.height=Math.round(_h - s2)  + "px"
    } else {
      console.log(_obj2 + ' Neni')
    }

    document.getElementById(_obj3).style.height=Math.round(_h - s3)  + "px"
    document.getElementById(_obj3).addEventListener('keydown', (function(e) {
             self.obsluha(e, e.target)
      }))

    document.getElementById(_obj3).addEventListener('click', (function(e) {

             self.obsluha(e, e.target)
      }))

    window.addEventListener('resize', (function() {
    document.getElementById(_obj1).style.height=Math.round(_h - s1)  + "px"
    document.getElementById(_obj2).style.height=Math.round(_h - s2)  + "px"
    document.getElementById(_obj3).style.height=Math.round(_h - s3)  + "px"
    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  })
  )


  },
  wyska (proc = 0.90){
    return window.innerHeight * proc

  },

 sirka (proc = 0.90){
    return window.innerWidth * proc

  },

  obsluha2 (e, self )  {

    var searchObj = self.objSearchBar
    var rows = self.list.length - 1
    var cols = self.cols.length - 1

    const el=e.target
    const f = this
    if (el.type=="button" || !el.type) {

      return
    }


    var isPresun =false
    var elObalId = 'd'+ el.id.substring(1)
    var elObal = document.getElementById(elObalId)
    var aEl = el.id.split('_')
    var curRow = aEl[2]*1
    var curCol = aEl[4]*1
    var newId =  aEl[0]+'_r_'
    var isEdit = self.cols[curCol].isEdit

   var ekeyCode           = e.keyCode
   var eshiftKey          = e.shiftKey
   var keyCodes           = Array()
   var keyCodesExitSave   = Array()
   var keyCodesExitEscape = Array()

   if (e.type=='click') {
     ekeyCode = -13
   }

   keyCodesExitSave   = [13,9,-13]
   keyCodesExitEscape = [27]

   // var keyCodesExitSave =


   if (!self.isWrite && ekeyCode==13 && e.metaKey){
     //alert('Savez')
     self.saveLines(0)
     if (!el.type == 'number') {
       el.selectionEnd = el.selectionStart
     }
     return
   }

   if (!self.isWrite && (ekeyCode == 46 || ekeyCode == 8 )) {
     self.deleteLine(curRow)
     return
   }

   if (!self.isWrite && ekeyCode == 90 && e.metaKey && self.listEdits.length>0){
//       this.$alert(ekeyCode)
      self.backLines()
      return
   //  this.deleteLine(curRow)

   }

  self.aInfo.push([ekeyCode])
  //return
   if (document.getElementById(searchObj) && ekeyCode == 114 ){
      document.getElementById(searchObj).focus()
    }
   keyCodes = keyCodes.concat([13,27,9,-13])
   keyCodes = keyCodes.concat([40,37,38,39])  //Sipky
   keyCodes = keyCodes.concat([33,34,35,36])  // PedzDaun, pedzAp. End,Home

   //
   if (self.isWrite) {
     var isReturn = true
     if (keyCodesExitSave.indexOf(ekeyCode)>-1) {
//        self.aInfo.push(["ExitSave",curCol,curRow])
       self.isWrite = false
       // this.cols[curCol].id

     if (self.list[curRow][self.cols[curCol].id]!=el.value) {
        var prev = self.list[curRow][self.cols[curCol].id]
         // alert('eee' + prev + "/ "+self.list[curRow])
         var oldRecord = Array()
         var y
         for (y in self.list[curRow]) {
             oldRecord[y] = self.list[curRow][y]
         }

         //self.listEdits.push([self.list[curRow],'edit',prev])
         //alert('tady')
         self.listEdits.push([oldRecord,'edit',prev])
         var eLen= self.listEdits.length-1

         //self.listEdits[eLen][self.cols[curCol].id] = prev

         self.list[curRow][self.cols[curCol].id]=el.value
         self.aInfo.push(self.listEdits)
         self.aInfo.push(oldRecord)


      }
       el.setAttribute('readonly',true)
       f.removeClass(el,"bila2")
       isReturn = false
     }

     if (keyCodesExitEscape.indexOf(ekeyCode)>-1) {
       self.isWrite = false
       el.setAttribute('readonly',true)
       f.changeClass(elObal,'dcell','dcell_edit')
       f.removeClass(el,"bila2")
       el.value = self.list[curRow][self.cols[curCol].id]
//        elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
       return true

       el.focus()
     }

     if (ekeyCode==13){
         ekeyCode=40
       }
       if (isReturn == true) {
         return true
       }

   }

  //self.aInfo = aEl
  //self.aInfo.push(keyCodes)
  //self.aInfo.push(ekeyCode)
  //  self.aInfo.push([rows, cols])
  //  self.aInfo.push(['Target: '+ el.id])
  //  self.aInfo.push([elObalId])
  //  self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + this.isWrite])


  self.info=rows+  "/ " +  cols

    if (Math.abs(ekeyCode) == 13 || Math.abs(ekeyCode) == 113 ) {
      //el.className=el.className.replace(/cell/,'cell_edit')
     if ( el.hasAttribute('readonly') && isEdit ) {
         el.removeAttribute('readonly')
          f.addClass(el,"bila2")
         if (el.type.match(/select/g)){
         el.focus()
         } else {
          if((ekeyCode) == 13 ) {
            el.select()
          }

         }
         // self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + self.isWrite])
         // el.selectionEnd = el.selectionStart;
         self.isWrite = true
     }
    }


    el.onfocus = ( function () {
       if (el.type == 'select-one' && el.id != self.lastId) {
           self.currentOrigValue = el.value
           self.lastId = el.id
           //alert(origValue)
           //alert('1111')
       }
       // self.aInfo.push(['1. elObaId', elObalId, ' Obal ', elObal ])
       //elObal.className=elObal.className.replace(/dcell/,'dcell_edit')
       //elObal.className=elObal.className.replace(/dcell_edit/,'').trim()
       //elObal.className=elObalNew.className.replace(/dcell/,'').trim()


       el.style.color="black"
       if (!self.isWrite) {
         if(!el.type == 'number') {
           el.selectionEnd = el.selectionStart
         }

       }

    })

    el.onchange = ( function () {
       if (el.type == 'select-one' && el.hasAttribute('readonly')==true ) {
           // el.value = self.currentOrigValue
            self.listEdits.push([self.list[curRow],'edit'])
            self.list[curRow][self.cols[curCol].id]=el.value
           //alert('V rezimu prohlizeni nelze zmenit ,moznosti :  click, Enter, Tab ' + el.value + '/ ' +  self.currentOrigValue + '/' + self.lastId)
           // return true
       }
       if (el.type == 'select-one' && el.hasAttribute('readonly')==false ) {
         //alert('change' + el.type+ "/" + el.hasAttribute('readonly')+" Wr "+ self.isWrite )
         self.listEdits.push([self.list[curRow],'edit'])
         self.list[curRow][self.cols[curCol].id]=el.value
       }

       if (self.saveNow==true ){
         //alert('change' + el.id)
         self.saveLines(0)
       }

       el.style.color="green"
       return

      if (self.list[curRow][self.cols[curCol].id]!=el.value) {
         self.listEdits.push([self.list[curRow],'edit'])
         self.list[curRow][self.cols[curCol].id]=el.value
      }

      // self.listEdits.push([self.list[curRow],'edit'])
       //self.aInfo.push(self.list[curRow])


    })


    el.onblur = ( function(){
      //el.setAttribute('readonly',true)
      //el.className=el.className.replace(/cell_edit/,'cell')
      //alert('blur' + el.type+ "/" + el.hasAttribute('readonly'))
      elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
      el.style.color="black"


      if ( !el.hasAttribute('readonly') && curRow < self.list.length && self.list[curRow][self.cols[curCol].id]!=el.value) {
        ///alert('tady :' + el.hasAttribute('readonly'))
         self.listEdits.push([self.list[curRow],'edit'])
         self.list[curRow][self.cols[curCol].id]=el.value

      }
      el.setAttribute('readonly',true)
      f.removeClass(el,"bila2")
      //alert('aaa' + ekeyCode+ el.value)

    })
    switch (ekeyCode) {

      case 40: //Sipka dolu
      if (curRow < rows) {
         newId +=  (curRow + 1) + '_c_' +curCol
         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.changeClass(newObal,'dcell','dcell_edit')
         f.changeClass(elObal,'dcell_edit','dcell')
         isPresun = true
         document.getElementById(newId).focus()
      }
      break;
      case 34: //pgDn
       var tmpRow=curRow + 6
       var tmpNewId = newId
       newId +=  (tmpRow) + '_c_' +curCol

      while (tmpRow >= self.list.length && tmpRow>-1){
         tmpRow--
         newId = tmpNewId
         newId +=  (tmpRow ) + '_c_' +curCol

         if (document.getElementById(newId)){
           //alert(newId)
           break;
         }
       }
       setTimeout(function(){

         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.addClass(elObal,'dcell')
         f.addClass(newObal,'dcell_edit')


         f.changeClass(elObal,'dcell_edit','dcell')
         f.changeClass(newObal,'dcell','dcell_edit')
         f.removeClass(elObal,'elevation-1')
         f.addClass(newObal,'elevation-1')


         isPresun = true
         document.getElementById(newId).focus()
        },100)

       break;
       case 33: //pgUp
       var tmpRow=curRow - 6
       var tmpNewId = newId
       newId +=  (tmpRow) + '_c_' +curCol

      while (tmpRow <0 && tmpRow<self.list.length ){
         tmpRow++
         newId = tmpNewId
         newId +=  (tmpRow ) + '_c_' +curCol

         if (document.getElementById(newId)){
           //alert(newId)
           break;
         }
       }
       setTimeout(function(){

         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.addClass(elObal,'dcell')
         f.addClass(newObal,'dcell_edit')


         f.changeClass(elObal,'dcell_edit','dcell')
         f.changeClass(newObal,'dcell','dcell_edit')
         f.removeClass(elObal,'elevation-1')
         f.addClass(newObal,'elevation-1')


         isPresun = true
         document.getElementById(newId).focus()
        },100)

       break;
       case 38: //Sipka nehoru
      if (curRow > 0) {
         newId +=  (curRow - 1) + '_c_' +curCol
         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.changeClass(newObal,'dcell','dcell_edit')
         f.changeClass(elObal,'dcell_edit','dcell')
         f.addClass(newObal,'elevation-1')
         f.removeClass(elObal,'elevation-1')

         isPresun = true
         document.getElementById(newId).focus()
         // alert(document.getElementById(newId))
      }

       break;
     case 37: //Sipka left
      if (curCol > 0) {
         newId +=  (curRow ) + '_c_' +(curCol - 1)
         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.changeClass(newObal,'dcell','dcell_edit')
         f.changeClass(elObal,'dcell_edit','dcell')
         f.addClass(newObal,'elevation-1')
         f.removeClass(elObal,'elevation-1')

         isPresun = true
         // alert(newId)
         document.getElementById(newId).focus()
         // alert(document.getElementById(newId))
      }
//        self.aInfo.push('ESC')
       break;


     case 39: //Sipka right
      if (curCol < cols) {
         newId +=  (curRow ) + '_c_' +(curCol + 1)
         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.changeClass(newObal,'dcell','dcell_edit')
         f.changeClass(elObal,'dcell_edit','dcell')
         f.addClass(newObal,'elevation-1')
         f.removeClass(elObal,'elevation-1')
         isPresun = true
         // alert(newId)
         document.getElementById(newId).focus()
         // alert(document.getElementById(newId))
      }
       //self.aInfo.push('ESC')
       break;
   case 9: //Tabulator
      var newCol = 0
      if (!eshiftKey){
       if (curCol < cols && !eshiftKey ) {
          newCol = curCol + 1
          newId +=  (curRow ) + '_c_' +(newCol)
        }


       if (curCol == cols && !eshiftKey ) {
       if (curRow < rows) {
          newCol =  1
          newId +=  (curRow + 1) + '_c_' +(newCol)
        }
       if (curRow == rows) {
          self.newLine()
          newCol =  1
          newId +=  (curRow + 1) + '_c_'+(newCol)


          return
        }
       }
      }

      if (eshiftKey) {
       if (curCol <= cols && curCol > 0 ) {
         newCol = curCol - 1
         newId +=  (curRow ) + '_c_' +(newCol)
       }
       if (curCol == 0 && curRow>0) {
         newCol = cols - 1
         newId +=  (curRow -1 ) + '_c_' +(newCol)
       }

       if (curCol == 0 && curRow==0) {
         //newCol = colls - 1
         newId +=  (curRow  ) + '_c_' +(newCol)
       }

      }



         var newObalId =  'd'+newId.substring(1)
         var newObal = document.getElementById(newObalId)
         f.changeClass(newObal,'dcell','dcell_edit')
         f.changeClass(elObal,'dcell_edit','dcell')
         isPresun = true
         // alert(newId)

         if ( self.cols[newCol].isEdit && document.getElementById(newId).hasAttribute('readonly') ) {
         document.getElementById(newId).removeAttribute('readonly')
         document.getElementById(newId).focus()
         if (!self.cols[newCol].type.match(/select/g)){
           document.getElementById(newId).select()
         }
         f.addClass(document.getElementById(newId),"bila2")

         // element.selectionEnd = element.selectionStart;


         // self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + self.isWrite])
         self.isWrite = true
         } else {
           document.getElementById(newId).selectionEnd = document.getElementById(newId).selectionStart;
           document.getElementById(newId).focus()
         }


       break;

      default:
       break;
    }

    if (keyCodes.indexOf(ekeyCode)>-1){
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
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
  }




}
