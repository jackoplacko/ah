const MongoClient = require('mongodb').MongoClient;

var database;

function connect (callback) {
    MongoClient.connect("mongodb://localhost:27017/adolf", (err, db) => {
    console.log ("Connected to database");
    database = db;
    callback(err);
  });
}


function add (name, dis, id) { //jeszcze nie wiem czy id to będzie hash czy kolejność dodawania, hash bardzo ułatwi sprawdzenie czy artykuł nie był dodany wcześniej, a id - znalezienie tego z najm. odległością od Hitlera.
  if ( /*nie ma w db czegoś o tym id*/ true){
    database.collection('AustriackiAkwarelista').insertOne({
       _id: id,
       name: name,
       checked: false,
       distance: dis
    }, (err, result) => {
      if (err){
        return console.log('DB error: ' + err)
      }
    });
  }
}

function dbClose () {
  database.close();
}


module.exports = {
  add,
  connect,
  dbClose
};
