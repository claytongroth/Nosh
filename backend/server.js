const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

// for reference https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
const API_PORT = 27017;
//3001
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
// this could also connect to a hosted mongo DB
const dbRoute = "mongodb://127.0.0.1:27017/food";
//const dbRoute = "mongodb+srv://clustertest-xymjq.mongodb.net/test"
//mongodb+srv://mongo:<password>@clustertest-xymjq.mongodb.net/test?retryWrites=true

// connects our back end code with the database

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
let dbdata;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    db.db.collection("UnitedStatesOnly", function(err, collection){
        collection.find({"_id": "0000000035590"}).toArray(function(err, data){
            console.log("data length from coll ", data.length); // it will print your collection data
            dbdata = data
        })
    });

});

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


router.get("/getData", (req, res) => {
  //return dbdata[0]
  res.status(200).send(dbdata)
});


// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
