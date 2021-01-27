const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Error has occurred");
    }
    //console.log("Success");

    
    const db = client.db(dbName);
   

  }
);
