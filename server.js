const express       = require("express");
const MongoClient   = require("mongodb").MongoClient;
const bodyParser    = require("body-parser");
const db            = require("./config/db");
const app           = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  const db = database.db("coll")
  require('./app/routes')(app, db);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})
