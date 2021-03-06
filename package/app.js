const dbHandler = require('./dbHandler.js');
const reqHandler = require('./reqHandler.js');

var distance = 0;
var next = "Adolf Hitler";

function trim (name) {
  var splitName = name.split('|');
  return splitName[0].replace(/ /g, '_').replace(/&nbsp;/g, '_').replace(/%20/g, '_');
}

async function doTheLoop(){
  for(var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    await reqHandler.fetchData(trim(next), distance).then(()=>{
        dbHandler.getUnchckd().then((doc) => {
          dbHandler.update(doc).then(() => {
            distance = doc.distance;
            next = doc.name;
            console.log(`next ${next} dist ${distance}`);
          });
        });
      });
  	}
}

dbHandler.connect().then(() => {
  doTheLoop();
});
