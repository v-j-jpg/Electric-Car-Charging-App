const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:pudding123@cluster0.ufkyore.mongodb.net/?retryWrites=true&w=majority";
const cors = require("cors");
const mongoose = require('mongoose');
const UserModel = require('./models/Users')
const ChargerModel = require('./models/Chargers')
const {hashSync, compare} = require('bcryptjs');
//import { hashSync, compare } from 'bcryptjs';

const app = express();
const saltlength = 10; //default lenght

app.use(express.json());
app.use(cors());

mongoose.connect(uri)

//Requests

//Get Lists
app.get("/users", async (req, res) => {
  UserModel.find().then(function (model){
    res.json(model);
  }).catch(function (err) {
    res.json(err);
  });
})

app.get("/chargers", async (req, res) => {
  ChargerModel.find().then(function (model){
    res.json(model);
  }).catch(function (err) {
    res.json(err);
  });
})

//Create
app.post("/users/create", async (req, res) => {

  var user = {...req.body};
  user.name = { first: user.first, last: user.last};
  user.password = hashSync(user.password, saltlength);
  console.log(user);

  const newUser = new UserModel(user);
  await newUser.save();
  res.json(newUser);
})

app.post("/chargers/create", async (req, res) => {
  const newCharger = new ChargerModel(req.body);
  await newCharger.save();
  res.json(newCharger);
})

//Update
app.patch("/chargers/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);

  ChargerModel.findByIdAndUpdate(id, req.body, {new: true}).then(function(model) {
    res.json(model);
  }).catch(function(err) {
      res.json( err);
    })
})

app.patch("/users/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);

  var user = {...req.body};
  user.name = { first: user.first, last: user.last};  
  console.log(user);
  user.password = hashSync(user.password, saltlength);

  UserModel.findByIdAndUpdate(id, req.body, {new: true}).then(function(model) {
    res.json(model);
  }).catch(function(err) {
      res.json( err);
    })
})

//Search by ID
app.get("/chargers/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);
  ChargerModel.findById(id).then(function(model) {
    res.json(model);
  }).catch(function(err) {
      res.json(err);
    })
})

app.get("/users/id/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);

  UserModel.findById(id).then(function(model) {
    res.json(model);
  }).catch(function(err) {
      res.json(err);
    })
})

//Search by email
app.get("/users/email/:email", async (req, res) => {
  const  email  = (req.params.email).slice(6);
  console.log(email);
  UserModel.findOne({email: email}).then(function(model) {
    res.json(model);
  }).catch(function(err) {
      res.json(err);
    })
})

//Delete
app.delete("/chargers/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);
  ChargerModel.findByIdAndDelete(id).then(function() {
    res.json("Success");
  }).catch(function(err) {
      res.json(err);
    })
})
app.delete("/users/:id", async (req, res) => {
  const  id  = (req.params.id).slice(3);
  UserModel.findByIdAndDelete(id).then().catch(function(err) {
      res.json(err);
    })
})

app.listen(3001, ()=> {
  console.log("Connected to MongoDB");
})

