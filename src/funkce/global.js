module.exports = {
  z_all: 0,
  // jmeno, z , status, opacity

  data () {
    return {
      ninjas: [
          {name: 'Ryu', speciality: 'Vue Components', show: false},
          {name: 'Crystal', speciality: 'HTML Wizardry', show: false},
          {name: 'Hitoshi', speciality: 'Click Events', show: false},
          {name: 'Tango', speciality: 'Conditionals', show: false},
          {name: 'Kami', speciality: 'Webpack', show: false},
          {name: 'Yoshi', speciality: 'Data Diggin', show: false}
      ],
      title: 'Vue Wizards'
    }
},

  updateTitle: function(updatedTitle){
    this.title = updatedTitle;
  },

    w_create: (wname) => {
       //console.log(JSON.stringify(this.wins2))
      console.log(this.ninjas)
       var neco = Array(4)
       neco[0] = wname

//      this.wins2.push(neco)
       console.log(this.wins2, 'jm:', this.wname )



    },
    w_zindex: function (wname)  {
      alert('plodim z-index' + wname)
    },
    w_close: (wname) => {
      alert('nicim stopy')
    },
    z_count: function () {
      this.z_all++
      console.log('Counter tester ', this.z_all)
    }

  }





