'use strict';

import Client from './client.model';
import config from '../../config/environment';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const logger = require("../../middleware/logger");

var Express = require('express');
var multer = require('multer');


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
      user: 'xyramsoft65@gmail.com',
      pass: 'test@123456'
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
    logger.info("Client API: status : 422 ");
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Client API: status : 200 ");
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Client API: status : 500 ");
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      logger.info("Client Get List API: status : 200 ");
      res.status(200).json(users);
    })
    .catch(handleError(res));
}


// Creates a new Client in the DB
export function create(req, res) {
  logger.info("Client creation API");
  var client = new Client(req.body);
  return Client.create(client)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;
  return Client.findById(userId,'name email image phone').exec()
    .then(user => {
      if(!user) {
        logger.info("Client Get By ID API: status : 404");
        return res.status(404).end();
      }
      logger.info("Client Get By ID API: status : 200");
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return Client.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId  = req.client._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return Client.findById(userId).exec()
    .then(client => {
    if(client.authenticate(oldPass)) {
      client.password = newPass;
    return client.save()
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

/* Reset Password */
export function resetPassword(req, res, next) {
  // Init Variables
  var resetToken = req.body.resetToken;
  var newPass = req.body.newPassword;
  Client.findOne({resetPasswordToken:resetToken}, function (err,user) {

    user.password = newPass;
    user.updatedAt = new Date(Date.now());

    // Not User Error
    if (!user) {
      return res.status(400).send({
        message: 'User not found!'
      });
    }

    // Save User
    user.save(function (err) {
      if (err) {
        return handleError(res);
      } else {
        return res.status(200).send({
          message: 'Password Changed Successfully!!'
        });
      }
    });

  });
}


/**
 * Get my info
 */
export function me(req, res, next) {
  console.log("clients*********")
  var userId = req.user._id;
 // console.log('req.client'+JSON.stringify(req.client))
  return Client.findOne({ _id: userId }, '-salt -password').exec()
    .then(client => { // don't ever give out the password or salt
      if(!client) {
        return res.status(401).end();
      }
      res.json(client);
    })
    .catch(err => next(err));
}




// Upserts the given user in the DB at the specified ID
export function upsert(req, res) {
  console.log('req.user'+JSON.stringify(req.user))
  console.log('req.body'+JSON.stringify(req.body))
  return Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}



//resend Password
export function sendResetEmail(req, res) {
  var email = req.body.email;
  Client.findOne({ 'email': email }).exec(function (err, user) {
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
      from: 'xyramsoft65@gmail.com',
      to: email,
      subject: 'Reset Password Verification Code - OTP',
      html: 'Your Temporary Password Is : ' + tempPassword  +'<p> Please Login with the temporary password and change your password'
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

//****************************************
export function ResetPassword(req, res) {
  var email = req.body.email;
  var forgetPasswordNo = req.body.forgetPasswordNo;
  var newPassword = req.body.newPass;
  Client.findOne({ 'email': email }, '-salt -password').
    exec(function (err, users) {
      if (err) {
        console.log('err' + err);
        res.status(400).send({
          message: 'Something went wrong.'
        })
      }
      else {
        console.log('qwertyuio.........' + JSON.stringify(users));
        if (users.forgetPasswordNo == forgetPasswordNo) {
          users.password = newPassword;
          users.forgetPasswordNo = Math.floor(Math.random() * 900000) + 100000;
          return users.save(function (err, users) {
            if (err) {
              return handleError(res);
            }
            var token = jwt.sign({ _id: users._id },
              config.secrets.session, {
                expiresIn: 60 * 60 * 5
              })
            let tokendata = {
              token: token,
              message: "new password sucessfully updated"
            }
            console.log('token' + JSON.stringify(tokendata))
            res.json(tokendata);
          })

        }
        else {
          res.status(400).send({
            message: "otp mismatched"
          });
        }
      }
    })
}
/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
