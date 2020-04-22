'use strict';
import User from './user.model';
import config from '../../config/environment';
const qr = require('qr-image');
const logger = require("../../middleware/logger");

//Include NPM
var async = require('async');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs'); 

//Reports Generation
const json2csv = require('json2csv').parse;
const moment = require('moment');

//Sms Config
var APIKey = 'LtyVenmOYkGHsfa8VypgXw';
var senderid = 'SMSTST';
var channel = '2';
var DCS = '0';
var flashsms = '0';
var number = '';
var text = '';
var route = '1';

// Email Config
var nodemailer = require('nodemailer');
var api_key = 'key-7fa9edb1b8f46cc6d5995448cd733241';
var domain = 'impnolife.org';
var smtpConfig = {
  host: 'email-smtp.us-west-2.amazonaws.com',
  port: 587,
    //secure: true, // use SSL
  auth: {
    user: 'xyramsoft65@gmail.com',
    pass: 'test@123456'
  }
};

var transport = nodemailer.createTransport(smtpConfig);

var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    logger.info("User API : status : 422 ");
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("User API : status : 200 ");
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("User API : status : 500 ");
    return res.status(statusCode).send(err);
  };
}



/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find().exec()
    .then(users => {
      logger.info("User Get All API :status :200");
      res.status(200).json(users);
    })
    .catch(handleError(res));
 
}



// Gets a single User from the DB
export function show(req, res) {
  return User.findById({_id: req.params.id }).exec()
  .then(users => {
    logger.info("User Get By ID API :status :200");
    res.status(200).json(users);
  })
  .catch(handleError(res));
}


//Registration for  User
export function create(req, res) {
  logger.info("User Registration API");
  var RegisterId = Math.random().toString(36).slice(-8);
  var fullPath = './../ISFK2020 DATA/USER IMGS/'+RegisterId;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);


  /**** Individual Registration QR code Generation: MAIN USER ************/
  var QREvents = req.body.QREvents;
  var Random = JSON.stringify({
    RegisterId: RegisterId,
    name: req.body.name,
    QREvents,
    T: 'U'
  });
  var qrpng = qr.imageSync(Random, { type: 'png'});
  var QRImg = new Date().getTime() + '.png';
  fs.writeFileSync('./../ISFK2020 DATA/USER IMGS/'+RegisterId+'/'+QRImg, qrpng, (err) =>{
    if(err) {
      console.log(err);
    }
  });
  var image = 'https://creorts.com:444/api/users/QRImg?'+'RegisterId='+RegisterId+'&QRImg='+QRImg; 

  /***Team Registration QR code Generation : TEAM MEMBER *********************************/
  if(req.body.TeamCheck == true) {
    var AllTeamImages = [];
    var teamReg = req.body.teamReg;
    teamReg.forEach(teamReg =>{
      var teamMembers = teamReg.teamdetails.teamMembers;
      teamMembers.forEach(teamMember =>{
        teamMember.TeamMemberId = Math.random().toString(36).slice(-8);
        teamMember.ScanTeamCheck = false;
        console.log(teamMember.TeamMemberId);
        console.log(teamMember.ScanTeamCheck);
        var Team = JSON.stringify({
          TeamMemberId: teamMember.TeamMemberId,
          EventID:teamReg._id,
          Event: teamReg.title,
          Name: teamMember.name,
          Mobile: teamMember.Mobile,
          T: 'TR',
        });
        var qrPng = qr.imageSync(Team, { type: 'png'});    
        var TeamImg = 'Team-' + new Date().getTime() + '.png';
        fs.writeFileSync('./../ISFK2020 DATA/USER IMGS/'+RegisterId+'/'+TeamImg, qrPng, (err) =>{
          if(err) {
            console.log(err);
          }
        });
        var URL = 'https://creorts.com:444/api/users/TeamImg?'+'RegisterId='+RegisterId +'&TeamImg='+TeamImg;
        AllTeamImages.push({ TeamMemberId: teamMember.TeamMemberId, Event: teamReg.title, Name: teamMember.name, DOB: teamMember.DOB, Mobile: teamMember.Mobile, URL, EventID: teamReg._id, Position: teamMember.position, ScanTeamCheck: teamMember.ScanTeamCheck});
      });
    });
  } else {
    console.log('no team Registration');
  }

  User.find({phone: req.body.phone}, {}).exec(function(err, phoneexists) {
    if(err) {
      return handleError(err, res);
    }
    if(phoneexists.length > 0) {
      logger.info("User Registration API:Phone Number already exists :status :400");
      res.status(400).send({
        message: 'This Phone number already exists,try with different Phone Number .'
      });
    } else {
      let datedata = new Date();
      datedata = Date.now();
      var newUser = new User(req.body);
      newUser.RegisterId = RegisterId; 
      newUser.QRImg = QRImg;
      newUser.name = req.body.name;
      newUser.gender = req.body.gender;
      newUser.DOB = req.body.DOB;
      var age = moment().diff(moment(req.body.DOB,"YYYY-mm-dd"),'years');
      if (parseInt(age) < 0) {
          age += 100;
      }
      req.body.DOB = age;
      newUser.age = age;
      newUser.email = req.body.email;
      newUser.place = req.body.place;
      newUser.occupation = req.body.occupation;
      newUser.schoolName = req.body.schoolName;
      newUser.organisation = req.body.organisation;
      newUser.phone = req.body.phone;
      newUser.sportIndividualReg = req.body.sportIndividualReg;
      newUser.representingTeam = req.body.representingTeam;
      newUser.culturalReg = req.body.culturalReg;
      newUser.teamReg = req.body.teamReg;
      newUser.QREvents = req.body.QREvents;
      newUser.emailCheck = req.body.emailCheck;
      newUser.TeamCheck = req.body.TeamCheck;
      newUser.TotalEventsList = req.body.TotalEventsList;
      newUser.AllTeamImages = AllTeamImages;
      newUser.image = image;
      newUser.provider = 'local';
      newUser.role = req.body.role || 'user';
      if(req.body.paymentOption === 'COD') {
        newUser.userNotification.push({'status': 'Awaiting confirmation from vendor.', 'time': datedata});
      }
      newUser.paymentOption = req.body.paymentOption;
      newUser.userNotification.push({'status': 'Thank you for Registering with us', 'time': datedata});
      newUser.userNotification.push({'status': 'Your Registration is Confirmed.', 'time': datedata});
      if(newUser.role == 'user') {
        newUser.totalLoyaltyPoints = 0;
      }
      if(req.body.TeamCheck == true) {
        for(var i = 0; i < AllTeamImages.length; i++) {
          console.log('mobile:', AllTeamImages[i].Mobile);
          console.log('mobile:', AllTeamImages[i].URL);
          console.log('mobile:', AllTeamImages[i].Event);
   /* number  = AllTeamImages[i].Mobile;
    //mediaUrl = "./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg
    text= 'Dear'+AllTeamImages[i].Name+'Thank you for Registering for'+AllTeamImages[i].Event+'held by Creorts,your QR image has been sent in the link,QR image is necessary to enter the event'+AllTeamImages[i].URL
    var url= 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+APIKey+'&senderid='+senderid+'&channel='+channel+'&DCS='+DCS+'&flashsms='+flashsms+'&number='+number+'&text='+text+'&route='+route;
    https.get(url,function (res) {
      console.log(res);
     });*/
        }
      } else {
   /* number  = newUser.phone;
    console.log(newUser.phone)
    mediaUrl = "./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg
    text= 'Dear customer,Thank you for Registering ISFK 2020 Event,your QR image has been sent in the link,QR image is necessary to enter the event'
    var url= 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+APIKey+'&senderid='+senderid+'&channel='+channel+'&DCS='+DCS+'&flashsms='+flashsms+'&number='+number+'&text='+text+'&route='+route;
    https.get(url,function (res) {
       console.log(res);
      });*/
      }
      newUser.PaymentDetails = req.body.PaymentDetails;
      newUser.grandTotal = req.body.grandTotal;
      newUser.save()
      .then(function(user) {
        async.waterfall([ 
          function(done) {
            crypto.randomBytes(20, function(err, buffer) {
              var token = buffer.toString('hex');
              done(err, token);
            });
          },
        // Lookup user by username
          function(token, done, err) {
            done(err, token, user);
          },
          function(token, user, done) {
            var httpTransport = 'http://';
            if(config.secure && config.secure.ssl === true) {
              httpTransport = 'https://';
            }
            res.render(path.resolve('server/components/email/welcomeUserEmail'), {
              email: user.email,
              RegisterId: user.RegisterId,
              name: user.name,
              gender: user.gender,
              phone: user.phone,
              DOB: user.DOB,
              place: user.place,
              QREvents: user.QREvents,
              createdAt: user.createdAt,
            }, function(err, emailHTML) {
              done(err, emailHTML, user);
            });    
          },
          function(emailHTML, user, done) {
          /**If Email is true*********/
            if(req.body.emailCheck == true) {
              var mailOptions = {
                to: user.email,
                from: 'xyramsoft65@gmail.com',
                subject: 'Registration For Creorts International Sports Festival 2020',
                //attachment:"./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg,
                html: emailHTML
              };
              mailgun.messages().send(mailOptions, function(err) {
                if(!err) {
                  res.send(user);
                } else {
                  return res.status(400).send({
                    message: 'Failure sending email'
                  });
                }
                done(err);
              });
            } else {
              logger.info("User Registration API:status :200");
              res.send(user);
              console.log('not required');
            }
          }
        ], function(err) {
          if(err) {
            return next(err);
          }
        });
      })
      .catch(validationError(res));
    }
  });
}


//Update User Registration 
export function eventUpdate(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("User Registration Update");
  User.findById(req.params.id).exec(function(err, userdata) {
    var RegisterId = req.body.RegisterId;
    var fullPath = './../ISFK2020 DATA/USER IMGS/'+ RegisterId;
    var shell = require('shelljs');
    shell.mkdir('-p', fullPath);

      /***Individual Registration QR code Generation************/
    var QREvents = req.body.QREvents;
    var Random = JSON.stringify({
      RegisterId: RegisterId,
      name: req.body.name,
      QREvents,
      T: 'U'
    });
    var qr_png = qr.imageSync(Random, { type: 'png'});
    var QRImg = new Date().getTime() + '.png';
    fs.writeFileSync('./../ISFK2020 DATA/USER IMGS/'+RegisterId+'/'+QRImg, qr_png, (err) =>{
      if(err) {
        console.log(err);
      }
    });

     /***Team Registration QR code Generation*****/
    if(req.body.TeamCheck == true) {
      var AllTeamImages = [];
      var teamReg = req.body.teamReg;
      teamReg.forEach(teamReg =>{
        var teamMembers = teamReg.teamdetails.teamMembers;
        teamMembers.forEach(teamMember =>{
          teamMember.TeamMemberId = Math.random().toString(36).slice(-8);
          teamMember.ScanTeamCheck = false;
          console.log(teamMember.TeamMemberId);
          console.log(teamMember.ScanTeamCheck);
          var Team = JSON.stringify({
            TeamMemberId: teamMember.TeamMemberId,
            EventID:teamReg._id,
            Event: teamReg.title,
            Name: teamMember.name,
            Mobile: teamMember.Mobile,
            T: 'TR',
          });
          var qrpng = qr.imageSync(Team, { type: 'png'});  
          var TeamImg = 'Team-' + new Date().getTime() + '.png';
          fs.writeFileSync('./../ISFK2020 DATA/USER IMGS/'+RegisterId+'/'+TeamImg, qrpng, (err) =>{
            if(err) {
              console.log(err);
            }
          });
          var URL = 'https://creorts.com:444/api/users/TeamImg?'+'RegisterId='+RegisterId+'&TeamImg='+TeamImg;
          AllTeamImages.push({ TeamMemberId: teamMember.TeamMemberId, Event: teamReg.title, Name: teamMember.name, DOB: teamMember.DOB, Mobile: teamMember.Mobile, URL, EventID: teamReg._id, Position: teamMember.position, ScanTeamCheck: teamMember.ScanTeamCheck});
        });
      });
    } else {
      console.log('no team Registration');
    }

    var image = 'https://creorts.com:444/api/users/QRImg?'+'RegisterId='+RegisterId+'&QRImg='+QRImg; 
    let datedata = new Date();
    datedata = Date.now();
    userdata.RegisterId = RegisterId; 
    userdata.QRImg = QRImg;
    userdata.name = req.body.name;
    userdata.gender = req.body.gender;
    userdata.DOB = req.body.DOB;
    userdata.email = req.body.email;
    userdata.place = req.body.place;
    userdata.occupation = req.body.occupation;
    userdata.schoolName = req.body.schoolName;
    userdata.phone = req.body.phone;
    userdata.sportIndividualReg = req.body.sportIndividualReg;
    userdata.culturalReg = req.body.culturalReg;
    userdata.teamReg = req.body.teamReg;
    userdata.QREvents = req.body.QREvents;
    userdata.emailCheck = req.body.emailCheck;
    userdata.TeamCheck = req.body.TeamCheck;
    userdata.representingTeam = req.body.representingTeam;
    userdata.TotalEventsList = req.body.TotalEventsList;
    userdata.AllTeamImages = AllTeamImages;
    userdata.image = image;
    userdata.provider = 'local';
    userdata.role = req.body.role || 'user';
    if(req.body.paymentOption == 'COD') {
      userdata.userNotification.push({'status': 'Awaiting confirmation from vendor.', 'time': datedata});
    }
    userdata.paymentOption = req.body.paymentOption;
    userdata.userNotification.push({'status':'Thank you for Registering with us', 'time': datedata});
    userdata.userNotification.push({'status': 'Your Registration is Confirmed.', 'time': datedata});
    if(userdata.role == 'user') {
      userdata.totalLoyaltyPoints = 0;
    }
    if(req.body.TeamCheck == true) {
      for(var i = 0; i < AllTeamImages.length; i++) {
        console.log('mobile:', AllTeamImages[i].Mobile);
        console.log('mobile:', AllTeamImages[i].URL);
        console.log('mobile:', AllTeamImages[i].Event);
         /* number  = AllTeamImages[i].Mobile;
          //mediaUrl = "./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg
          text= 'Dear'+AllTeamImages[i].Name+'Thank you for Registering for'+AllTeamImages[i].Event+'held by Creorts,your QR image has been sent in the link,QR image is necessary to enter the event'+AllTeamImages[i].URL
          var url= 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+APIKey+'&senderid='+senderid+'&channel='+channel+'&DCS='+DCS+'&flashsms='+flashsms+'&number='+number+'&text='+text+'&route='+route;
          https.get(url,function (res) {
            console.log(res);
           });*/
      }
    } else {
      console.log('image link:', image);
      console.log(userdata.phone);
         /* number  = newUser.phone;
          console.log(newUser.phone)
          mediaUrl = "./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg
          text= 'Dear customer,Thank you for Registering ISFK 2020 Event,your QR image has been sent in the link,QR image is necessary to enter the event'
          var url= 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+APIKey+'&senderid='+senderid+'&channel='+channel+'&DCS='+DCS+'&flashsms='+flashsms+'&number='+number+'&text='+text+'&route='+route;
          https.get(url,function (res) {
             console.log(res);
            });*/
    }
    userdata.PaymentDetails = req.body.PaymentDetails;
    userdata.grandTotal = req.body.grandTotal;
    userdata.save();
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(res.json(userdata))
    .catch(handleError(res));
  });
}

  //Get  User by RegisterID(QR SCAN)
export function getByUserRegID(req, res) {
  return User.findOne({RegisterId: req.params.RegisterId }).exec()
    .then(users => {
      logger.info("User By RegisterID  API:status :200");
      res.status(200).json(users);
    })
     .catch(handleError(res));
}


  //Get By Team Members by TeamMemberId(QR SCAN)
export function getByTeamRegID(req, res) {
  var TeamMemberId = req.params.TeamMemberId;
  return User.findOne({'AllTeamImages.TeamMemberId': TeamMemberId },{"AllTeamImages" : 1}).exec()
    .then(users => {
      logger.info("User By TeamMemberId  API:status :200");
      res.status(200).json(users);
    })
    .catch(handleError(res));
}


 // Upserts the given User by RegisterId(QR SCAN)
export function upsertUsers(req, res) {
  logger.info("User Update By RegisterId API");
  return User.findOneAndUpdate({RegisterId: req.params.RegisterId}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

  // Upserts the given User by  TeamMemberId(QR SCAN)
export function upsertTeamMembers(req, res) {
  var TeamMemberId = req.params.TeamMemberId;
  logger.info("User Update By TeamMemberId API");
  return User.findOneAndUpdate({'AllTeamImages.TeamMemberId': TeamMemberId }, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
       .then(respondWithResult(res))
       .catch(handleError(res));
}


 //download User QR Code Images
export function downloadQRImg(req, res){
  res.download('./../ISFK2020 DATA/USER IMGS/'+req.query.RegisterId+'/'+req.query.QRImg);
}


 //download Team Members QR Code 
export function downloadTeamImg(req, res){
  res.download('./../ISFK2020 DATA/USER IMGS/'+req.query.RegisterId+'/'+req.query.TeamImg);
}


  //Phone search(validation for Registration)
export function customPhone(req, res) {
  var phone = req.params.phone;
  User.find({phone: phone}, {}).exec(function(err, phoneexists) {
    if(err) {
      return handleError(err, res);
    }
    if(phoneexists.length > 0) {
      logger.info("User Phone search API: status : 400");
      res.status(400).send({
        message: 'This Phone already exists,try with different Phone Number.'
      });
    } else {
      logger.info("User Phone search API: status : 200");
      res.status(200).send({message: 'Continue Registration.'});
    }
  });
}



 //Email search(Validation for Registraion via Google,Facebook)
export function customEmail(req, res) {
  User.find({email:req.params.email},{}).exec(function(err,users){
    if(err){
      return handleError(err,res);
    }
    if(users.length>0){
      logger.info("User Email search API: status : 200");
      res.status(200).send(users);
    } else {
      logger.info("User Email search API: status : 400");
      res.status(400).send({message: 'Email Not Found!!'})
    }
});
}


//Custom search User: Name,RegisterID,Phone
export function customSearch(req, res) {
  User.find({
    $or: [
      {'name': {$regex: req.body.name, $options: 'i'}},
      {'phone': req.body.phone},
      {'RegisterId': {$regex: req.body.RegisterId, $options: 'i'}},
    ]
  }).then((users) => {
    res.json(users);
  });
}


//Get Users Count
export function getByUserCount(req, res) {
  User.count(function(err, count) {
    if(err) {
      logger.info("User Count API: status : 404");
      res.send(err);
    }
    logger.info("User Count API: status : 200");
    res.json(count); 
  });
}


/****************CHECKEDIN REPORTS *******************************/ 

 //Get Individual Reports(QR SCAN)
 export function getQRIndividualEventsReport(req, res) {
  var gte = req.query.gte; 
  var lte = req.query.lte;
 const EventId =  req.params.EventId;  

  var Individual =['TotalEventsList[0].EventName','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];

  User.find({ TotalEventsList: { $elemMatch: { EventId:EventId, QREventScan: true } }, 'gender':req.params.gender , "age": {'$gte': gte, '$lte': lte }},{"TotalEventsList.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
     if (err) {
       return res.status(500).json({ err });
     }
     else {
       let csv
       
       try {
         csv = json2csv(students, {fields:Individual});
       
       } catch (err) {
         return res.status(500).json({ err });
       }
 
       const dateTime = moment().format('YYYYMMDD');
       var filename   = "IndividualCheckedInReports"+dateTime+ ".csv";
       res.setHeader('Content-Type', 'text/csv');
       res.setHeader("Content-Disposition", 'attachment; filename='+filename);
       fs.writeFile(filename, csv ,function (err) {
         if (err) {
           return res.json(err).status(500);
         }
        else {
         res.download(filename);
         }
       });
 
     }
   })
 }

  //Get Cultural Reports(QR SCAN)
  export function getQRCulturalEventsReport(req, res) {
    var gte = req.query.gte; 
    var lte = req.query.lte;
   const EventId =  req.params.EventId;  
   
   var cultural =['TotalEventsList[0].EventName','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];

  User.find({ TotalEventsList: { $elemMatch: { EventId:EventId, QREventScan: true } },'gender':req.params.gender , "age": {'$gte': gte, '$lte': lte }},{"TotalEventsList.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
      if (err) {
         return res.status(500).json({ err });
       }
       else {
         let csv
         
         try {
           csv = json2csv(students, {fields:cultural});
         
         } catch (err) {
           return res.status(500).json({ err });
         }
   
         const dateTime = moment().format('YYYYMMDD');
         var filename   = "CulturalCheckedInReports"+dateTime+ ".csv";
         res.setHeader('Content-Type', 'text/csv');
         res.setHeader("Content-Disposition", 'attachment; filename='+filename);
         fs.writeFile(filename, csv ,function (err) {
           if (err) {
             return res.json(err).status(500);
           }
          else {
           res.download(filename);
           }
         });
   
       }
     })
   }
  
    //Get Team Reports(QR SCAN)
  export function getQRTeamEventsReport(req, res) {
    var gte = req.query.gte; 
    var lte = req.query.lte;
   const EventId =  req.params.EventId;  
   
   var Team =['TotalEventsList[0].EventName','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];

   User.find({ TotalEventsList: { $elemMatch: { EventId:EventId, QREventScan: true } }, 'gender':req.params.gender , "age": {'$gte': gte, '$lte': lte }},{"TotalEventsList.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
        if (err) {
         return res.status(500).json({ err });
       }
       else {
         let csv
         
         try {
           csv = json2csv(students, {fields:Team});
         
         } catch (err) {
           return res.status(500).json({ err });
         }
   
         const dateTime = moment().format('YYYYMMDD');
         var filename   = "TeamCheckedInReports"+dateTime+ ".csv";
         res.setHeader('Content-Type', 'text/csv');
         res.setHeader("Content-Disposition", 'attachment; filename='+filename);
         fs.writeFile(filename, csv ,function (err) {
           if (err) {
             return res.json(err).status(500);
           }
          else {
           res.download(filename);
           }
         });
   
       }
     })
   }
  

  

/***************************REGISTERED USERS REPORTS****************************************************/
//Get OverAll Reports
export function getReports(req, res) {

  var AllEvents = [ 'UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','QREvents','createdAt' ];

  User.find({ }, function (err, students) {
     if (err) {
       return res.status(500).json({ err });
     }
     else {
       let csv
       
       try {
    
         csv = json2csv(students, {fields:AllEvents});
       
       } catch (err) {
         return res.status(500).json({ err });
       }
 
       const dateTime = moment().format('YYYYMMDD');
       var filename   = "AllEventsReports"+dateTime+ ".csv";
       res.setHeader('Content-Type', 'text/csv');
       res.setHeader("Content-Disposition", 'attachment; filename='+filename);
       fs.writeFile(filename, csv ,function (err) {
         if (err) {
           return res.json(err).status(500);
         }
        else {
         res.download(filename);
         }
       });
 
     }
   })
 }

 //Get Individual Reports
export function getIndividualEventsReport(req, res) {
  var gte = req.query.gte; 
  var lte = req.query.lte;
 const EventId =  req.params.EventId;  
 
  var Individual =['sportIndividualReg[0].title','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];

  User.find({'sportIndividualReg._id': EventId , 'gender':req.params.gender , "age": {'$gte': gte, '$lte': lte }  },{"sportIndividualReg.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
     if (err) {
       return res.status(500).json({ err });
     }
     else {
       let csv
       
       try {
         csv = json2csv(students, {fields:Individual});
       
       } catch (err) {
         return res.status(500).json({ err });
       }
 
       const dateTime = moment().format('YYYYMMDD');
       var filename   = "IndividualSportsReports"+dateTime+ ".csv";
       res.setHeader('Content-Type', 'text/csv');
       res.setHeader("Content-Disposition", 'attachment; filename='+filename);
       fs.writeFile(filename, csv ,function (err) {
         if (err) {
           return res.json(err).status(500);
         }
        else {
         res.download(filename);
         }
       });
 
     }
   })
 }



  //Get Team Reports
export function getTeamEventsReport(req, res) {
  var gte = req.query.gte; 
  var lte = req.query.lte; 
  const EventId =  req.params.EventId;  
 
  var Team =[ 'teamReg','teamReg[0].title','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];

  User.find({ 'teamReg._id': EventId ,'gender':req.params.gender,"age": {'$gte': gte, '$lte': lte } },{"teamReg.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
     if (err) {
       return res.status(500).json({ err });
     }
     else {
       let csv
       
       try {
         csv = json2csv(students, {fields:Team});
       
       } catch (err) {
         return res.status(500).json({ err });
       }
 
       const dateTime = moment().format('YYYYMMDD');
       var filename   = "TeamSportsReports"+dateTime+ ".csv";
       res.setHeader('Content-Type', 'text/csv');
       res.setHeader("Content-Disposition", 'attachment; filename='+filename);
       fs.writeFile(filename, csv ,function (err) {
         if (err) {
           return res.json(err).status(500);
         }
        else {
         res.download(filename);
         }
       });
 
     }
   })
 }

  //Get Cultural Reports
  export function getCulturalEventsReport(req, res) {
    var gte = req.query.gte; 
    var lte = req.query.lte;
    const EventId =  req.params.EventId;  
    
    var cultural =[ 'culturalReg[0].title','UserID','RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','representingTeam','createdAt' ];
  
    User.find({ 'culturalReg._id': EventId ,'gender':req.params.gender,"age": {'$gte': gte, '$lte': lte } },{"culturalReg.$" : 1,'gender':1,'UserID':1,'RegisterId':1,'name':1,'phone':1,'DOB':1,'age':1,'place':1,'occupation':1,'schoolName':1,'organisation':1,'representingTeam':1,'createdAt':1}, function (err, students) {
       if (err) {
         return res.status(500).json({ err });
       }
       else {
         let csv
         
         try {
           csv = json2csv(students, {fields:cultural});
         
         } catch (err) {
           return res.status(500).json({ err });
         }
   
         const dateTime = moment().format('YYYYMMDD');
         var filename   = "CulturalReports"+dateTime+ ".csv";
         res.setHeader('Content-Type', 'text/csv');
         res.setHeader("Content-Disposition", 'attachment; filename='+filename);
         fs.writeFile(filename, csv ,function (err) {
           if (err) {
             return res.json(err).status(500);
           }
          else {
           res.download(filename);
           }
         });
   
       }
     })
   }
  

//Get all TeamMembers  count
export function noOfTeamMembers(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([
    {$unwind: '$AllTeamImages'},
    {$group: {_id: '$_id', 'sum': { $sum: 1}}},
    {$group: {_id: null, data: {'$sum': '$sum'}}}
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users TeamMembers  count API: status : 200");
    res.json(result);
  });
}

//Get all sportsIndividual  count
export function noOfsportsIndividual(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([
    {$unwind: '$sportIndividualReg'},
    {$group: {_id: '$sportIndividualReg.title', 'sum': { $sum: 1},
    data: { $sum: 1 },
  }},

  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users sportsIndividual Registration count API: status : 200");
    res.json(result);
  });
}

//getting all noOfsportsTeam  count
export function noOfsportsTeam(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([ 
    {$unwind: '$teamReg'},
    {$group: {_id: '$teamReg.title', 'sum': { $sum: 1},
    data: { $sum: 1 },
  }},
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users TeamRegistration Registration count API: status : 200");
    res.json(result);
  });
}

//getting all noOfcultural  count
export function noOfcultural(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([
    {$unwind: '$culturalReg'},
    {$group: {_id: '$culturalReg.title', 'sum': { $sum: 1},
    data: { $sum: 1 },
  }},

  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users Cutural Events Registration count API: status : 200");
    res.json(result);
  });
}

//Get  all Gender count
export function gendercount(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([
    { $group: {
      _id: '$gender',
      data: { $sum: 1 },
    }},
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users Gender count API: status : 200");
    res.json(result);
  });
}


//Get all Occupation count
export function Occupation(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  User.aggregate([
    { $group: {
      _id: '$occupation',
      data: { $sum: 1 },
    }},
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info("Users Occupation count API: status : 200");
    res.json(result);
  });
}

// Deletes a User
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      logger.info("Users Delete API: status : 204");
      res.status(204).end();
    })
    .catch(handleError(res));
}


/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
