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
  return splitName[0].replace(' ', '_');
}

dbHandler.connect((err)=> {
    if(err) {
    return console.log("Error");
  } else {
    reqHandler.fetchData("Adolf Hitler");
  }
})


//tu trzeba odpalać fetchData od niesprawdzonego artykułu z najmniejszą odległością od Hitlera w pętli, aż do?
setTimeout(() => { //wykonać po zakończeniu pętli i dodaniu wszystkich rekordów do db
  dbHandler.dbClose()
}, 5000);
