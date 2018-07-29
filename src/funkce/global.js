module.exports = {
  z_all: 0,
  z_count: function () {
    this.z_all++
    console.log('Counter tester ', this.z_all)
    return 15
  }
}




