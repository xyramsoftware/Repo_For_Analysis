
'use strict';

import AccompanyPerson from './accompanyPerson.model';
import config from '../../config/environment';
const qr = require('qr-image');
const logger = require("../../middleware/logger");

//Reports Generation
const json2csv = require('json2csv').parse;
const moment = require('moment');

// Include NPM
var async = require('async');
var crypto = require('crypto');
var path = require('path');
var paths = require('path');
var fs = require('fs'); 

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
    logger.info("AccompanyPerson API: status : 422 ");
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("AccompanyPerson API: status : 200 ");
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}


function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          logger.info("AccompanyPerson API: status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("AccompanyPerson API: status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("AccompanyPerson API: status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of AccompanyPerson
export function index(req, res) {
  logger.info(" AccompanyPerson Get All List API ");
  return AccompanyPerson.find().sort({'createdAt': 1})
  .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single AccompanyPerson by ID from the DB
export function show(req, res) {
  logger.info(" AccompanyPerson Get By ID API ");
  return AccompanyPerson.findById({_id: req.params.id})
  .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Get AccompanyPerson Count
export function getByAccompanyCount(req, res) {
  AccompanyPerson.count(function(err, count) {
    if(err) {
      logger.info("AccompanyPerson count API :status:400");
      res.send(err);
    }
    logger.info("AccompanyPerson count API :status:200");
    res.json(count); // return return the count in JSON format
  });
}

//Registration for  Accompany Person
export function create(req, res) {
  logger.info("AccompanyPerson Registartion API");
  var moment = require('moment');
  var RegisterId = Math.random().toString(36)
  .slice(-8);
  var userID = req.params.userID;
  var fullPath = './../ISFK2020 DATA/ACCOMPANY IMGS/'+RegisterId;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);


  

     /***Individual Registration QR code Generation************/
  var Random = JSON.stringify({
    RegisterId: RegisterId,
    name: req.body.name,
    Mobile: req.body.phone,
    'T':'A'
  });
  var qr_png = qr.imageSync(Random, { type: 'png'});
  var QRImg = new Date().getTime()+'.png';
  fs.writeFileSync('./../ISFK2020 DATA/ACCOMPANY IMGS/'+RegisterId+'/'+QRImg, qr_png, (err) => {
    if(err) {
      console.log(err);
    }
  });
  var URL = 'https://creorts.com:444/api/accompanies/QRImg?'+'RegisterId='+RegisterId+'&QRImg='+QRImg;
  AccompanyPerson.find({userID: userID}, {}).exec(function(err) {
    if(err) {
      return handleError(err, res);
    } else {
      let datedata = new Date();
      datedata = Date.now();
      var newUser = new AccompanyPerson(req.body);
    
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
      newUser.relationship = req.body.relationship;
      newUser.place = req.body.place;
      newUser.occupation = req.body.occupation;
      newUser.organisation = req.body.organisation;
      newUser.schoolName = req.body.schoolName;
      newUser.phone = req.body.phone;
      newUser.userID = userID;
      newUser.emailCheck = req.body.emailCheck;
      newUser.URL = URL;
      newUser.provider = 'local';
      newUser.role = req.body.role || 'accompany';
      newUser.userNotification.push({'status': 'Thank you for Registering with us', 'time': datedata});
      newUser.userNotification.push({'status': 'Your Registration is Confirmed.', 'time': datedata});
      if(newUser.role == 'user') {
        newUser.totalLoyaltyPoints = 0;
      }
      console.log(URL);
      console.log(newUser.phone);
   /* number  = newUser.phone;
    console.log(newUser.phone)
    mediaUrl = "./../ISFK2020 DATA/USER IMGS/"+RegisterId+"/"+QRImg
    text= 'Dear customer,Thank you for Registering ISFK 2020 Event,your QR image has been sent in the link,QR image is necessary to enter the event'
    var url= 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+APIKey+'&senderid='+senderid+'&channel='+channel+'&DCS='+DCS+'&flashsms='+flashsms+'&number='+number+'&text='+text+'&route='+route;
    https.get(url,function (res) {
       console.log(res);
      });*/
      newUser.save()
      .then(function(user) {
        async.waterfall([
        // Generate random token    
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
            res.render(path.resolve('server/components/email/AccompanyEmail'), {
              email: user.email,
              RegisterId: user.RegisterId,
              name: user.name,
              relationship: user.relationship,
              gender: user.gender,
              phone: user.phone,
              DOB: user.DOB,
              place: user.place,
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
                subject: 'Accompany Registration For Creorts International Sports Festival 2020',
               // attachment:"./../ISFK2020 DATA/ACCOMPANY IMGS/"+RegisterId+'/'+QRImg,
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
              logger.info("AccompanyPerson Registartion API :status:200");
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


//download QRImg
export function downloadQRImg(req, res) {
  res.download('./../ISFK2020 DATA/ACCOMPANY IMGS/'+req.query.RegisterId+"/"+req.query.QRImg);
}
  
// Upserts the given AccompanyPerson in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return AccompanyPerson.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
   .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a AccompanyPerson from the DB
export function destroy(req, res) {
  return AccompanyPerson.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//Get All Registered Reports
export function getReports(req, res) {
  var AllEvents = [ 'RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','createdAt' ];
   AccompanyPerson.find({ }, function (err, students) {
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
       var filename   = "AllAccompanyReports"+dateTime+ ".csv";
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

  //Get All CheckedIn Reports
  export function getCheckedInReports(req, res) {
    var AllEvents = [ 'RegisterId','name','phone','gender','DOB','age','place','occupation','schoolName','organisation','createdAt' ];
     AccompanyPerson.find({ QRScanCheck:true }, function (err, students) {
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
         var filename   = "AllAccompanyCheckedInReports"+dateTime+ ".csv";
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
  

//get a list of AccompanyPerson by userID
export function getByUser(req, res) {
  var userID = req.params.userID;
  logger.info("AccompanyPerson Registartion List By UserID API");
  return AccompanyPerson.find({'userID': userID}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//Get  AccompanyPerson by RegisterID(QR SCAN)
export function getByRegisterID(req, res) {
  return AccompanyPerson.findOne({RegisterId: req.params.RegisterId }).exec()
    .then(users => {
      logger.info("AccompanyPerson By RegisterID  API:status :200");
      res.status(200).json(users);
    })
     .catch(handleError(res));
}

 // Upserts the given AccompanyPerson by RegisterId(QR SCAN)
 export function updateByRegisterId(req, res) {
  logger.info("AccompanyPerson Update By RegisterId API");
  return AccompanyPerson.findOneAndUpdate({RegisterId: req.params.RegisterId}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//get a list of AccompanyPerson by userID for Admin
export function getfordash(req, res) {
  var userID = req.params.userID;
  logger.info("AccompanyPerson Registartion List By UserID API :For Admin Dashboard");
  return AccompanyPerson.find({'userID': userID}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}


