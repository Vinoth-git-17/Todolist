//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const connectDB =require("./db/connect")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);













app.get("/about", function(req, res){
  res.render("about");
});


//mongoose connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const url ="mongodb+srv://Vinoth:Q7VrJviuvNqapxFG@blackspy.bu4yzy0.mongodb.net/Todolist?retryWrites=true&w=majority";


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const itemSchema =mongoose.Schema({
  name: String,
});
    
const Item = mongoose.model("Item",itemSchema);
    
const item1 = new Item({
  name: "Hi there"
});
    
const item2 = new Item({
  name: "I am Vinoth"
});
    
const item3 = new Item({
  name: "Web developer"
});

const defaultItems =[item1,item2,item3];



app.get("/", function(req,res){
  Item.find({}, function(err,result){

    if(result.length === 0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Added items");
        }
      });
      res.redirect("/");
    }
    else{
      res.render("list", {listTitle: "Today", newListItems: result});
    }
    console.log(err);
    
  })
  
});

app.post("/", function(req, res){

  const ItemName = req.body.newItem;

  const itemInput = new Item({
    name: ItemName,
  });

  itemInput.save();
  res.redirect("/");

  
});

app.post("/delete",function(req, res){
  const checkboxID = req.body.checkbox;
  Item.findByIdAndDelete(checkboxID,function(err){
    if(!err){
      console.log("Successfully deleted");
      res.redirect("/");
    }
  })
})

app.listen(5000, function() {
  console.log("Server started on port 5000");
});


