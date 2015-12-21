var config =require("../config").db.mongo;
var mongodb = require('mongodb');
var winston = require('winston');
module.exports.init = function (callback) {

     var server = new mongodb.Server(config[0].host, config[0].port , {});
     new mongodb.Db(config[0].database, server).open(function (error, client) {
     	//export the client and maybe some collections as a shortcut
	   // module.exports.client = client;
	   if(!error)
	   {

		   	 module.exports.throughPutInfo=client.collection("ThroughputInfoCollection");
			 module.exports.topAppVolInfo=client.collection("TopAppVolInfoCollection");
			 module.exports.totalVolDataInfo=client.collection("TotalVolDataInfoCollection");
			 module.exports.totalFanWifiInfo=client.collection("TotalFanWifiCollection");
			 module.exports.totalClientPerBandInfo=client.collection("TotalClientPerBandInfoCollection");
			 module.exports.totalAssociateProbeInfo=client.collection("TotalClientCountCollection");
	   }
	   callback(error);
    });
};