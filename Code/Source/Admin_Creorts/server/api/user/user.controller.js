'use strict';

import User from './user.model';
import config from '../../config/environment';
//import Carddetail from '../carddetail/carddetail.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';


var Express = require('express');
var multer = require('multer');

const qr = require('qr-image');

// Include NPM
var async = require("async");
var crypto = require("crypto");
var path = require("path");
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
        user: 'noreplybhojana@gmail.com',
        pass: 'bhojana@123'
    }
};
var transport = nodemailer.createTransport(smtpConfig);
//*********************

var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});



function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  var clientID = req.params.clientID;
  return User.find({'clientID':clientID}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

// Gets a single Category from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return User.findById({'clientID':clientID,_id: req.params.id }).populate('image', 'PublicID').exec()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(handleError(res));
}



//sign up by user
export function create(req, res) {
  var clientID = req.params.clientID;
  var RegisterId =Math.random().toString(36).slice(-8);
  var profileImg = req.body.profileImg;
  var identityImg = req.body.identityImg;
  var adharImg = req.body.adharImg;
  var pancardImg = req.body.pancardImg;
  var LicenseImg = req.body.LicenseImg;
  var certificate = req.body.certificate;
  
var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../CONFERENCE DATA/'+clientID+'/USER IMGS/'+RegisterId);
      },
     
    filename: function (req, file ,callback) {
     if (file.fieldname == "profileImg") {
      profileImg =  file.fieldname +"_" +file.originalname   ;
     callback(null, file.fieldname +"_"+ file.originalname);
     console.log("profileImg :",profileImg);

   }

    if (file.fieldname == "identityImg") {
       identityImg = file.fieldname + "_" +file.originalname
       console.log("identityImg :",identityImg);
     callback(null,  file.fieldname +"_"+file.originalname);
     
    }

    if (file.fieldname == "adharImg") {
      adharImg = file.fieldname + "_" +file.originalname
      console.log("adharImg :",adharImg);
    callback(null,  file.fieldname +"_"+file.originalname);
    
   }
  
   if (file.fieldname == "pancardImg") {
    pancardImg = file.fieldname + "_" +file.originalname
    console.log("pancardImg :",pancardImg);
    callback(null,  file.fieldname +"_"+file.originalname);
  
  }

  if (file.fieldname == "LicenseImg") {
    LicenseImg = file.fieldname + "_" +file.originalname
  console.log("LicenseImg :",LicenseImg);
  callback(null,  file.fieldname +"_"+file.originalname);

  }
    if (file.fieldname == "certificate") {
     certificate =  file.fieldname + "_" +file.originalname;
     console.log("certificate :",certificate);
    callback(null, file.fieldname +"_"+file.originalname);
  
    }
     }
   
 });


  const fileFilter = (req,file,cb)=>{
    console.log("inside filetype")
    if(file.mimetype === 'application/pdf' || file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);

    }else{
        cb(null,false);
    }
};
var uploadUserImg= multer({
    
  storage: Storage ,
  fileFilter:fileFilter
  }).fields(
  [
    { 
      name: "profileImg", 
      maxCount: 1
    },
   { 
      name: "identityImg", 
      maxCount: 1
    },
    { 
      name: "adharImg", 
      maxCount: 1
    },
    { 
      name: "pancardImg", 
      maxCount: 1
    },
    { 
      name: "LicenseImg", 
      maxCount: 1
    },
    { 
      name: "certificate", 
      maxCount: 1
    }
  ]
  )
 
var fullPath = './../CONFERENCE DATA/'+clientID+'/USER IMGS/'+RegisterId;
var shell = require('shelljs');
shell.mkdir('-p',fullPath);


 uploadUserImg(req, res, function (err) {
   var QRCodewithoutImageFeature = req.body.QRCodewithoutImageFeature ;


 var QRcodeInfo =req.body.QRcodeInfo;

 var Random = JSON.stringify({
  RegisterId:RegisterId,
  QRcodeInfo
})

var data = Random.replace(/\\/g, "");
 console.log("finalData:",data)

   var qr_png = qr.imageSync( data,{ type: 'png'})
   // Generate a random file name 
    var QRImg = new Date().getTime()+'.png';
    fs.writeFileSync('./../CONFERENCE DATA/'+clientID+'/USER IMGS/'+RegisterId+'/'+QRImg, qr_png, (err) => {
       if(err){
            console.log(err);
            }
         })
   

  User.find({clientID:clientID,email:req.body.email},{}).exec(function(err,emailexists){
    if(err){
      return handleError(err,res);
    }
    if(emailexists.length>0){
      res.status(200).send({
        message:'This email already exists,try with different email id.'
      })
    }
    else{
      var newUser      = new User(req.body);
      newUser.RegisterId = RegisterId; 
      newUser.QRImg =    QRImg;
      newUser.profileImg = profileImg;
      newUser.identityImg = identityImg;
      newUser.adharImg = adharImg;
      newUser.pancardImg = pancardImg;
      newUser.LicenseImg = LicenseImg;
      newUser.certificate = certificate;
      newUser.email    = req.body.email;
      newUser.password = req.body.password;
      newUser.clientID = clientID;
      newUser.QRcodeInfo = req.body.QRcodeInfo;
      newUser.provider = 'local';
      newUser.image    = req.body.image;
      newUser.status    = req.body.status;
      newUser.role     = req.body.role || 'user';
      if(newUser.role == 'user'){
        newUser.totalLoyaltyPoints=0;
      }
      newUser.save()
      .then(function(user) {
        // var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        //   expiresIn: 60 * 60 * 5
        // });
        //res.json({ token });
        async.waterfall([
        // Generate random token
        function (done) {
          crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.toString('hex');
            done(err, token);
          });
        },
        // Lookup user by username
        function (token, done, err) {
          done(err, token, user);
        },
        function (token, user, done) {
          var httpTransport = 'http://';
          if (config.secure && config.secure.ssl === true) {
            httpTransport = 'https://';
          }
            
          res.render(path.resolve('server/components/email/welcomeEmail'), {
            email: user.email,
            RegisterId:user.RegisterId,
            createdAt :user.createdAt,
          }, function (err, emailHTML) {
            done(err, emailHTML, user);
          });
        
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
          
          var mailOptions = {
            to: user.email,
            from: 'noreplybhojana@gmail.com',
            subject: 'Registration',
            attachment:".//..//CONFERENCE DATA//"+clientID+"//USER IMGS//"+RegisterId +"//"+QRImg,
            html: emailHTML
          };
  
          mailgun.messages().send(mailOptions, function (err) {
            if (!err) {
              res.send(user);
            } else {
              return res.status(400).send({
                message: 'Failure sending email'
              });
            }
            done(err);
          });
        }
        ], function (err) {
          if (err) {
            return next(err);
          }
        });
      })
      .catch(validationError(res));
    }
  })
})
}


/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId  = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
    if(user.authenticate(oldPass)) {
    user.password = newPass;
    return user.save()
      .then(() => {
      res.status(200).send({
      message: 'This password is updated.'
    });
  })
  .catch(validationError(res));
  } else {
    return res.status(403).send({
      message: 'This password is not correct.'
    });
  }
});
}


/**
 * Get my info
 */
export function me(req, res, next) {
  var clientID = req.params.clientID;
  var userId = req.user._id;
  console.log('req.user'+JSON.stringify(req.user))
  return User.findOne({ 'clientID':clientID,_id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).send({message: 'Not a valid user!!'})
      }
      res.json(user);
    })
    .catch(err => next(err));
}


//Detailed info of  a store
export function storeDetails(req,res){
  User.find({role:'admin'}, '-salt -password').exec(function(err,storedetails){
    if(err){
      return handleError(err,res);
    }
    else{
      res.json(storedetails[0]);
    }
  })
}


// Upserts the given user in the DB at the specified ID
export function upsert(req, res) {
  console.log('req.user'+JSON.stringify(req.user))
  console.log('req.body'+JSON.stringify(req.body))
  return User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}



//resend Password
export function sendResetEmail(req, res) {
  var email = req.body.email;
  User.findOne({ 'email': email }).exec(function (err, user) {
    if (err) {
      return handleError(res);
    }
    if (!user) {
      return res.status(200).send({
        message: 'This is not registered email id.'
      });
    }
    //var randomNo = Math.floor(Math.random() * 900000) + 100000;
    var tempPassword = Math.random().toString(36).slice(-8);
    mailgun.messages().send({
      from: 'noreplybhojana@gmail.com',
      to: email,
      subject: 'Reset Password Verification Code - OTP',
      html: 'Your Temporary Password Is : ' + tempPassword
    }, function (error, data) {
      if (error) {
        console.log(error + "error")
      }
      if (data) {
        user.password = tempPassword;
        user.save(function (err, work) {
          if (err) {
            return handleError(res);
          }
          var token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
          });
          return res.status(200).send({
            message: 'Email exist. Temporary password sent on email, Please login to change your password'
          });
        });
      }
    })
  })
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
