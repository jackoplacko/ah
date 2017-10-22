const request = require('request');
const dbHandler = require('./dbHandler.js');

const redirect = '#REDIRECT [[';

var fetchData = (name, dst) => {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+name,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(console.log(error));
      }
        var txt = JSON.stringify(body);
        if (txt.indexOf(redirect) == -1){
          var newTxt = txt.split('[[');
          for (var i = 1; i < newTxt.length; i++) {
            dbHandler.add(newTxt[i].split(']]')[0], dst);
          }
          resolve(true);
        } else {
          fetchData(txt.split(redirect)[1].split(']]')[0], dst).then(()=>{resolve(true)});
        }
    });
  })
};

module.exports = {
  fetchData
};
