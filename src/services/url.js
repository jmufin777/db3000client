export default  {
 url() {
   //var ip=''
     console.log( window.location.protocol + "//" + window.location.host +"//"+ window.location.hostname)
    //  $.getJSON(window.location.host,function (json) {
    //   ip=json.ip
    //  //_this.json = json;
    //  console.log("IP", json)
    // });

      return 'http://78.102.17.162:3003/'
  }
}
