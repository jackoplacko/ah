const MongoClient = require('mongodb').MongoClient;

var col;


var connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost:27017/adolf", (err, db) => {
      console.log ("Connected to database");
      col = db.collection('AustriackiAkwarelista')
      if (err) {
        reject(console.log(err));
      }
      resolve(true);
    });
  });
}

var update = (doc) => {
  return new Promise((resolve, reject) => {
    col.update({_id: doc._id}, {$set: {checked: true}}).then( ()=> {
      resolve(true);
    });
    }, (err) =>{
      reject(err);
    });
};


var getUnchckd = () => {
  return new Promise((resolve, reject) => {
    col.findOne({checked: false}).then((doc) => {
      resolve(doc);
    }, (err) =>{
      reject(err);
    });
  });
};


var add = (newname, dis) => {
  return new Promise((resolve, reject) => {
    if(newname.indexOf('Category:') != 0 && newname.indexOf('File:') != 0)
      {
        col.findOne({name: newname}).then((doc) => {
          if (doc == null){
          col.insertOne({
             name: newname,
             checked: false,
             distance: dis + 1
          }, (err, result) => {
            if (err){
              reject(console.log('DB error: ' + err));
            }
            resolve(true)
          });
        }
      }, (error) => {
        reject(console.log(error));
      });
    }
  });
};



module.exports = {
  add,
  getUnchckd,
  update,
  connect
};
