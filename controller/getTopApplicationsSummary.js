var db=require("../db");
var Q=require('q');
var _=require('underscore')
module.exports=function(req,res){

	var startTime=Number(req.query.startTime);
	var endTime=Number(req.query.endTime);
	db.topAppVolInfo.find({ timeStamp : { $gte : startTime, $lte : endTime}}).toArray(function(err,response){

		if(err)
		{
			res.send({"status":"Error","Message":err});
			res.end();
		}else{

			findLargest5(response).then(function(top5Application){
               
				res.send({"Top5Applications":top5Application});
				res.end();
			});
		}
		
	});
}

function findLargest5(array,res){ 
    var deferred = Q.defer();
    array .sort(function(a,b){
        if(a.AppVol< b.AppVol){ return 1; } 
        else if(a.AppVol == b.AppVol) { return 0; } 
        else { return -1; }
    });
	var top5Application=array.slice(0,5);
    top5Application=_.map(top5Application, function(model) {
				 	 return _.omit(model, '_id');
					});
  	deferred.resolve(top5Application);
  	return deferred.promise;
}