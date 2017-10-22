const dbHandler = require('./dbHandler.js');
const reqHandler = require('./reqHandler.js');

var distance = 0;
var next = "Adolf Hitler";


//
// function hasz (word) {
//   var hash = 0;
// 	for (i = 0; i < word.length; i++) {
// 		char = word.charCodeAt(i);
// 		hash = ((hash<<5)-hash)+char;
// 		hash = hash & hash;
// 	}
// 	return hash;
// }

function trim (name) {
  var splitName = name.split('|');
  return splitName[0].replace(' ', '_').replace('&nbsp;', '_').replace('%20', '_');
}

dbHandler.connect((err)=> {
    if(err) {
    return console.log("Can't connect to db" + err);
  } else {
    reqHandler.fetchData(trim(next), distance).then(()=>{
      dbHandler.getUnchckd().then((doc)=> {
        distance = doc.distance;
        console.log(distance);
      }, (findError)=> {
        console.log(findError);
      });
    });
  }
});
