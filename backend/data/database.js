import MongoDB from "mongodb";

const { MongoClient } = MongoDB;

let _db;

export const MongoConect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://georgenonis:CnAmtWSronh96a4L@cluster0.o7z8bjc.mongodb.net/notes?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log(client);
      _db = client.db();
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDB = () => {
  console.log(_db);
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
