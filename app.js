var express = require('express');
var app     = express();
var config=require("./config");
var server  =require('./server')(app,express)   
var routers=require('./route')(app)
var db=require('./db');
db.init(function (error) {
    if (error)
    {
    	console.log("error in db connection");
    }else{
    	
    	console.log("started")
    	app.listen(config.node.port);  //database is initialized, ready to listen for connections
    }
   
});
console.log("hi silvester")
