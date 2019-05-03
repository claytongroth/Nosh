const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");


const API_PORT = 27017;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
// this could also connect to a hosted mongo DB like //const dbRoute = "mongodb+srv://clustertest-xymjq.mongodb.net/test"
const dbRoute = "mongodb://127.0.0.1:27017/noshdb"; //noshdb
// connects our back end code with the database

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
let dbdata;

db.on('error', console.error.bind(console, 'connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//getData/query?id=0000000035590&brands=Taste%20Adventure
router.get("/getData", (req, res) => {
  var id = req.query.id;
  db.db.collection('USFoodOnly',function(err, data){
    if(err){throw err;}
    else {
      data.find({"_id": id}).toArray(function(error, documents) {
          if (err) throw error;
          console.log("Get request for:", documents)
          res.send(documents);
      });
    }
  })
});
// this is our create methid
// this method adds new data in our database
//putData/query?id=0000000035590&brands=Claytons%20Adventure&manufacturing_places=golden%20colorado&product_name=swolecakes&editor=clayton%20groth
//db.products.insert( { item: "card", qty: 15 } )
router.post("/putData", (req, res) => {
  console.log("put fired");
  let data = new Data();
//  const { id, message } = req.body;
  const id = req.body.id;
  const brands = req.body.brands;
  const manu = req.body.manufacturing_places;
  const prodName  = req.body.product_name;
  const editor = req.body.last_editor;
  db.db.collection('USFoodOnly',function(err, data){
    if(err){console.log("Error posting,")}
    else {
      data.insertOne({
        "_id": id,
        "brands": brands,
        "manufacturing_places": manu,
        "product_name": prodName,
        "last_editor": editor
      }).then(data => res.send(data)).catch((err) => {
        console.log(err);
        res.send(err);
      });
    }
  })
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const id = req.body.id;
  const brands = req.body.brands;
  const manu = req.body.manufacturing_places;
  const prodName  = req.body.product_name;
  const editor = req.body.last_editor;
  db.db.collection('USFoodOnly',function(err, data){
    if(err){console.log("Error posting", err)}
    else {
      data.findOneAndUpdate({
        "_id": id,
      },
      {$set: {
        "brands": brands,
        "manufacturing_places": manu,
        "product_name": prodName,
        "last_editor": editor
      }
      },
       {upsert: true}).then(data => res.send(data)).catch((err) => {
        console.log(err);
        res.send(err);
      });
    }
  })
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const id = req.body.id;
  console.log(id)
  db.db.collection('USFoodOnly',function(err, data){
    if(err){console.log("Error posting", err)}
    else {
      data.findOneAndDelete({
        "_id": id,
      }).then(data => res.send(data)).catch((err) => {
        console.log(err);
        res.send(err);
      });
    }
  })

});



// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
