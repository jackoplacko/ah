const request = require('request');

var distance = 0;
var next = process.argv[2];

//fauxDB:
var DB = new Array();
for (var i = 0; i < 1000; i++)
    DB.push(new Object());

// var fauxDB = {
//   hash:[2000],
//   name: [],
//   distance:[],
//   childrenChecked: [],
//   children: []
// };

function hasz (word) {
  var hash = 0;
	for (i = 0; i < word.length; i++) {
		char = word.charCodeAt(i);
		// hash = ((hash<<5)-hash)+char;
    hash+=char/10;
		hash = hash & hash;
	}
	return hash;
}

function trim (name) {
  var splitName = name.split('|');
  return splitName[0].replace(' ', '_');;
}



function fetchData (name, hsh) {
  request({
    url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+name,
    json: true
  }, (error, response, body) => {
      var txt = JSON.stringify(body);
      var newTxt = txt.split('[[');
      for (var i = 1; i < newTxt.length; i++) {
        DB[hsh].children.push(newTxt[i].split(']]')[0]);
        console.log(DB[hsh].children[i-1]);
      }
  });
}


for (var i = 0; i<1; i++){
  nexthash = hasz(next);
  if(DB[nexthash].dist == undefined){
    DB[nexthash].dist = distance;
    DB[nexthash].children = new Array();
    fetchData(trim(next), nexthash);
  }
  //else
}
