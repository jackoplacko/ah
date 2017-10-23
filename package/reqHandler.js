const request = require('request');
const dbHandler = require('./dbHandler.js');

const redirect = '#REDIRECT [[';

function trim (name) {
  var splitName = name.split('|');
  return splitName[0].replace(/ /g, '_').replace(/&nbsp;/g, '_').replace(/%20/g, '_');
}

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
        if (txt == undefined) {
          fetchData(name, dst).then(()=>{resolve(true)});
        } else if (txt.indexOf(redirect) != -1){
          fetchData(txt.split(redirect)[1].split(']]')[0], dst).then(()=>{resolve(true)});
        } else {
          var newTxt = txt.split('[[');
          for (var i = 1; i < newTxt.length; i++) {
            var newnewtxt = trim(newTxt[i].split(']]')[0]);
            if (newnewtxt.indexOf("File:") == -1 && newnewtxt.indexOf("Category:") == -1 && newnewtxt.indexOf("Image:") ==1){
              console.log("waiting for wikipedia: ", newnewtxt);
              dbHandler.add,(newnewtxt, dst);
            }
          }
          resolve(true);
        }
    });
  })
};

module.exports = {
  fetchData
};
