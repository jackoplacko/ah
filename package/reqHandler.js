const request = require('request');
const dbHandler = require('./dbHandler.js');

function fetchData (name, num) {
  request({
    url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+name,
    json: true
  }, (error, response, body) => {
    if(error) {
      return console.log(error);
    }
      var txt = JSON.stringify(body);
      if (txt.indexOf('#REDIRECT [[') == -1){
        var newTxt = txt.split('[[');
        for (var i = 1; i < newTxt.length; i++) {
          dbHandler.add(newTxt[i].split(']]')[0], i);
          console.log(newTxt[i].split(']]')[0]);
        }
      } else { //tak jakby rekurencyjnie ogarnięte redirecty
        console.log(txt.split('#REDIRECT [[')[1].split(']]')[0], "redirecté");
        fetchData(txt.split('#REDIRECT [[')[1].split(']]')[0], num);
      }
  });
}

module.exports = {
  fetchData
};
