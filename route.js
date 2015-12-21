var totalVolume=require("./controller/getTotalVolumeofData");
var throughPut=require("./controller/getThroughPut");
var associateProbing=require("./controller/getAssociateProbingClient");
var fanWifiData=require("./controller/getFanWifiData");
var clientsBand=require("./controller/getClientsBand");
var topApplication=require("./controller/getTopApplicationsSummary");

module.exports=function(app){
	app.get('/getTotalVolumeSummary',totalVolume);
	app.get('/getThroughPutSummary',throughPut);
	app.get('/getAssoProbClientSummary',associateProbing);
	app.get('/getFanWifiDataSummary',fanWifiData);
	app.get('/getClientsBandSummary',clientsBand);
	app.get('/getTop5ApplicationsSummary',topApplication);
}