var path = require('path');
var fs = require('fs');
var winston = require('winston');

function readConfiguration(){
    if(!process.env.NODE_ENV){

        process.env.NODE_ENV = 'dev';
    }
	
//console.log(process.env.NODE_ENV);
    return require(path.join(__dirname, process.env.NODE_ENV));
}
module.exports = readConfiguration();