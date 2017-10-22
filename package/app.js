const dbHandler = require('./dbHandler.js');
const reqHandler = require('./reqHandler.js');

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
  return splitName[0].replace(' ', '_').replace('&nbsp;', '_').replace('%20', '_');
}

dbHandler.connect((err)=> {
    if(err) {
    return console.log("Error");
  } else {
    reqHandler.fetchData(trim("Adolf Hitler"), 1); //pierwszy request, jeszczenie wiem czym jest zmienna "num" i czemu podaję ją do fetchData ale muszę się napić kawy pomocy
  }
})


//tu trzeba odpalać fetchData od niesprawdzonego artykułu z najmniejszą odległością od Hitlera w pętli, aż do?
setTimeout(() => { //wykonać po zakończeniu pętli i dodaniu wszystkich rekordów do db
  dbHandler.dbClose()
}, 5000);
