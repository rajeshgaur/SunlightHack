var express = require('express');
var callCare = require('./../util/restHelper');
var router = express.Router();
var schedule = require('node-schedule');
var moment= require('moment');


/* GET users listing. */
router.post('/', function(req, res) {
  const userInfo = req.body.result.contexts[0].parameters;
  var time=userInfo.scheduleTime ? userInfo.scheduleTime : null;
  var callReq = {
    orgId:"b3259e91-7e6c-4815-857e-7507d85fba0c",
    customerIdentity:{
      Context_First_Name: "testUser",
      Context_Mobile_Phone: userInfo.phoneNum
    },
    reason: "this is my reason for spark!!!google home test"
   };

   
   if(time){
    //time=moment(time).utc().format("DD MMM YYYY hh:mm a");
    var scheduleTime= new Date(time);
	var time1 = new Date( scheduleTime.getTime() + ( scheduleTime.getTimezoneOffset() * 60000 ) );
	console.log("scheduleTime = " + scheduleTime);
   	console.log("time1 = " + time1);
   	console.log("machineTime = " + new Date());
    //console.log("Read time "+ scheduleTime+" "+time);

    var careResp = {
        "speech": "your call back request successful",
        "displayText": "your call back request successful",
        "data": {},
        "contextOut": [],
        "source": "DuckDuckGo",
        "followupEvent":
        {
            "name":"scheduled-goodbye",
            "data":{}
        }
    };

    var j = schedule.scheduleJob(scheduleTime, function(){
        console.log('Task scheduled.'+ time +' original time '+ scheduleTime) ;
        callCare(callReq,null,j);
      });
      res.json(careResp);
   }else{
        console.log('Immidiate callback.');
        callCare(callReq, res);
   }
   
  
//   var x = new Date();
//   var offset= -x.getTimezoneOffset();

//   console.log("offset ",  offset);
  
 

});
module.exports = router;


