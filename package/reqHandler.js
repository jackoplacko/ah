const request = require('request');
const dbHandler = require('./dbHandler.js');

function fetchData (name, hsh) {
  request({
    url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+name,
    json: true
  }, (error, response, body) => {
      var txt = JSON.stringify(body);
      var newTxt = txt.split('[[');
      for (var i = 1; i < newTxt.length; i++) {
        dbHandler.add(newTxt[i].split(']]')[0], 1, i);
        console.log(newTxt[i].split(']]')[0]);
      }
  });
}

module.exports = {
  fetchData
};
