var db=require("../db");
var Q=require("q");
module.exports=function(req,res){

	var startTime=Number(req.query.startTime);
	var endTime=Number(req.query.endTime);
	var interval=req.query.interval;
	var timeObj={start:startTime,end:endTime};
	if(startTime&&endTime&&interval)
	{
		
		if(typeof(startTime)=="number"&&typeof(endTime)=="number")
		{
			totalFanWifiData(timeObj).then(function(responseData){

				   sumUpFanWifi(responseData,interval).then(function(sumupData){

                             var responseObject={fanWifiData:sumupData};
                             res.send(responseObject);
                             res.end();
					});
					
			}).fail(function(err){

                      res.send({"status":"Error","Message":err});
                      res.end();


			});
		}else{
			res.send({"Status":"Error","Message":"Start and End Time is not a Number"});
			res.end();

		}
		
    }else{

		res.send({"Status":"Error","Message":"Start,End Time or interval is Null"});
		res.end();
	}
}

function totalFanWifiData(timeStamp){
    var deferred = Q.defer();
	db.totalFanWifiInfo.find({ timeStamp : { $gte : timeStamp.start, $lte : timeStamp.end}}).toArray(function(err,data){
		//console.log(data);
		if(err)
		{
			deferred.reject(err);

		}else{
			deferred.resolve(data);
		}
	});
    return deferred.promise;
}

function sumUpFanWifi(array,interval){
		var deferred = Q.defer();
	    if(interval=="hour")
	    {
	    	var numOfNewVisitor=0;
	    	var numOfRepeatVisitor=0;
	    	var numOfTotalVisitor=0;
			for(var i=0;i<array.length;i++)
			{

				numOfNewVisitor=numOfNewVisitor+array[i].numOfNewVisitor;
				numOfRepeatVisitor=numOfRepeatVisitor+array[i].numOfRepeatVisitor;
				numOfTotalVisitor=numOfTotalVisitor+array[i].numOfTotalVisitor;
			}
			deferred.resolve([{"totalNumOfNewVisitor":numOfNewVisitor,"totalNumOfRepeatVisitor":numOfRepeatVisitor,"totalNumOfTotalVisitor":numOfTotalVisitor}]);

	    }else if(interval=="day"){

	    	var first60=array.slice(0,60);
	    	var second60=array.slice(60,120);
	    	var third60=array.slice(120,180);
	    	var fourth60=array.slice(180,240);
	    	var collectionOfData=[first60,second60,third60,fourth60];
	    	var responseDataVolume=[];
	    	for(var t=0;t<collectionOfData.length;t++)
	    	{
	    		var numOfNewVisitor=0;
		    	var numOfRepeatVisitor=0;
		    	var numOfTotalVisitor=0;
	    		for(var k=0;k<collectionOfData[t].length;k++)
	    		{
	    			var fanWifiContainer=collectionOfData[t];
	    			numOfNewVisitor=numOfNewVisitor+fanWifiContainer[k].numOfNewVisitor
					numOfRepeatVisitor=numOfRepeatVisitor+fanWifiContainer[k].numOfRepeatVisitor
					numOfTotalVisitor=numOfTotalVisitor+fanWifiContainer[k].numOfTotalVisitor
	 			}
	    		responseDataVolume.push({"totalNumOfNewVisitor":numOfNewVisitor,"totalNumOfRepeatVisitor":numOfRepeatVisitor,"totalNumOfTotalVisitor":numOfTotalVisitor})
	      	}
	      	deferred.resolve(responseDataVolume);
	    }else if(interval=="week"){
	    	var firstDay=array.slice(0,240);
	    	var secondDay=array.slice(240,480);
	    	var thirdDay=array.slice(480,720);
	    	var fourthDay=array.slice(720,960);
	    	var fifthDay=array.slice(960,1200);
	    	var sixthDay=array.slice(1200,1440);
	    	var seventhDay=array.slice(1440,1680);
	    	var collectionOfData=[firstDay,secondDay,thirdDay,fourthDay,fifthDay,sixthDay,seventhDay];
	    	var responseDataVolume=[];
	    	for(var t=0;t<collectionOfData.length;t++)
	    	{
	    		var numOfNewVisitor=0;
		    	var numOfRepeatVisitor=0;
		    	var numOfTotalVisitor=0;
	    		for(var k=0;k<collectionOfData[t].length;k++)
	    		{
	    			var fanWifiContainer=collectionOfData[t];
	    			var fanWifiContainer=collectionOfData[t];
	    			numOfNewVisitor=numOfNewVisitor+fanWifiContainer[k].numOfNewVisitor
					numOfRepeatVisitor=numOfRepeatVisitor+fanWifiContainer[k].numOfRepeatVisitor
					numOfTotalVisitor=numOfTotalVisitor+fanWifiContainer[k].numOfTotalVisitor
	    		}
	    		responseDataVolume.push({"totalNumOfNewVisitor":numOfNewVisitor,"totalNumOfRepeatVisitor":numOfRepeatVisitor,"totalNumOfTotalVisitor":numOfTotalVisitor});
	      	}
	      	deferred.resolve(responseDataVolume);
	    }else if(interval=="month"){

	    	var firstWeek=array.slice(0,1680);
	    	var secondWeek=array.slice(1680,3360);
	    	var thirdWeek=array.slice(3360,5040);
	    	var fourthWeek=array.slice(5040,6220);
	    	var fifthWeek=array.slice(6220);
	    	var collectionOfData=[firstWeek,secondWeek,thirdWeek,fourthWeek,fifthWeek];
	    	var responseDataVolume=[];
	    	for(var t=0;t<collectionOfData.length;t++)
	    	{
	    		var numOfNewVisitor=0;
		    	var numOfRepeatVisitor=0;
		    	var numOfTotalVisitor=0;
	    		for(var k=0;k<collectionOfData[t].length;k++)
	    		{
	    			
	    			var fanWifiContainer=collectionOfData[t];
	    			numOfNewVisitor=numOfNewVisitor+fanWifiContainer[k].numOfNewVisitor
					numOfRepeatVisitor=numOfRepeatVisitor+fanWifiContainer[k].numOfRepeatVisitor
					numOfTotalVisitor=numOfTotalVisitor+fanWifiContainer[k].numOfTotalVisitor
	       		}
	    		responseDataVolume.push({"totalNumOfNewVisitor":numOfNewVisitor,"totalNumOfRepeatVisitor":numOfRepeatVisitor,"totalNumOfTotalVisitor":numOfTotalVisitor})
	      	}
	      	deferred.resolve(responseDataVolume);
	    }
		return deferred.promise;
}
