const request = require('request');
const dbHandler = require('./dbHandler.js');

var distance = 0;



function hasz (word) {
  var hash = 0;
	for (i = 0; i < word.length; i++) {
		char = word.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash;
	}
	return hash;
}

function trim (name) {
  var splitName = name.split('|');
  return splitName[0].replace(' ', '_');
}


function fetchData (name, hsh) {
  request({
    url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+name,
    json: true
  }, (error, response, body) => {
      var txt = JSON.stringify(body);
      var newTxt = txt.split('[[');
      for (var i = 1; i < newTxt.length; i++) {
        dbHandler.add(newTxt[i].split(']]')[0], 1);
        console.log(newTxt[i].split(']]')[0]);
      }
  });
}

//zanim się odpali pierwsze fetchData trzeba zaczekać aż się zainicjalizuje baza danych
//// chyba trzeba będzie to rozbić na 3+ pliki albo robić cały program w callbacku funkcji, czyli takie mocne -25 do czytelności
fetchData('Adolf Hitler'); //tu trzeba odpalać fetchData od artykułu z najmniejszą odległością od Hitlera w pętli


dbHandler.dbClose();
