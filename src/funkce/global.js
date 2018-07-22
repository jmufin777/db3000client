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
  z_count: function () {
    this.z_all++
    console.log('Counter tester ', this.z_all)
    return 15
  }
}
