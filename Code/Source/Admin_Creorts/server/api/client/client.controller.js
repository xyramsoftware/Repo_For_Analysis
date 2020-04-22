'use strict';

import Client from './client.model';
import config from '../../config/environment';
//import Carddetail from '../carddetail/carddetail.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// Include NPM
var async = require("async");
var crypto = require("crypto");
var path = require("path");

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
  return Client.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}


//sign up by user
export function create(req, res) {
  Client.find({email:req.body.email},{}).exec(function(err,emailexists){
    if(err){
      return handleError(err,res);
    }
    if(emailexists.length>0){
      res.status(200).send({
        message:'This email already exists,try with different email id.'
      })
    }
    else{
      var newUser      = new Client(req.body);
      newUser.email    = req.body.email;
      newUser.password = req.body.password;
      newUser.provider = 'local';
      newUser.image    = req.body.image;
      newUser.status    = req.body.status;
      newUser.role     = req.body.role || 'client';
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
          //  name: user.name,
         //   appName: 'Bhojana App',
          }, function (err, emailHTML) {
             console.log('111111111333')
            done(err, emailHTML, user);
          });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
          var mailOptions = {
            to: user.email,
            from: 'noreplybhojana@gmail.com',
            subject: 'Welcome to Bhojana App',
            html: emailHTML
          };
          mailgun.messages().send(mailOptions, function (err) {
            if (!err) {
              res.send({
                message: 'An email has been sent to the provided email with further instructions.'
              });
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
}

export function createGuest(req, res) {
      var newUser      = new User();
      newUser.name     = req.body.name;
      newUser.email    = req.body.email;
      newUser.street   = req.body.street;
      newUser.city     = req.body.city;
      newUser.ZIP      = req.body.ZIP;
      newUser.country  = req.body.country;
      newUser.phone    = req.body.phone;
      newUser.password = req.body.password;
      newUser.provider = 'local';
      newUser.role     = req.body.role || 'guest';
      if(newUser.role == 'guest'){
        newUser.totalLoyaltyPoints=0;
      }
      newUser.save()
        .then(function(user) {
          var token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
          });
          res.json({ token });
        })
        .catch(validationError(res));
    }

//sign up by admin
export function createByAdmin(req, res) {
  Client.find({email:req.body.email},{}).exec(function(err,emailexists){
    if(err){
      return handleError(err,res);
    }
    if(emailexists.length>0){
      res.status(200).send({
        message:'This email already exists,try with different email id.'
      })
    }
    else{
      var newUser      = new User();
      newUser.name     = req.body.name;
      newUser.email    = req.body.email;
      newUser.street   = req.body.street;
      newUser.city     = req.body.city;
      newUser.ZIP      = req.body.ZIP;
      newUser.country  = req.body.country;
      newUser.phone    = req.body.phone;
      newUser.password = req.body.password;
      newUser.provider = 'local';
      newUser.role     = req.body.role || 'admin';
      if(newUser.role == 'admin'){
        newUser.totalLoyaltyPoints=0;
      }
      newUser.save()
        .then(function(user) {
          var token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
          });
          res.json({ token });
        })
        .catch(validationError(res));
    }
  });

}

/**
 * Get a single user
 */
export function show(req, res) {
  return Client.findById(req.params.id).populate('image', 'PublicID').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
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
  var clientId  = req.client._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return Client.findById(clientId).exec()
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
  Client.findOne({resetPasswordToken:resetToken}, function (err,client) {

    client.password = newPass;
    client.updatedAt = new Date(Date.now());

    // Not User Error
    if (!client) {
      return res.status(400).send({
        message: 'User not found!'
      });
    }

    // Save User
    client.save(function (err) {
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
  var userId = req.user._id;
  console.log('req.user'+JSON.stringify(req.user))
  return Client.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}


//Detailed info of  a store
export function storeDetails(req,res){
  Client.find({role:'admin'}, '-salt -password').exec(function(err,storedetails){
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
 // console.log('req.client'+JSON.stringify(req.client))
//  console.log('req.body'+JSON.stringify(req.body))
  return Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// //get stripe token
// export function accCreateAndTrans(req, res, next) {
//   console.log('req.body'+JSON.stringify(req.body))
//   var stripe = require("stripe")(
//     "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
//   );
//   stripe.tokens.create({
//     card: {
//       object: 'card',
//       exp_month: req.body.month,
//       exp_year: req.body.year,
//       number: req.body.cardNumber,
//       cvc: req.body.cvc//100'4242 4242 4242 4242',
//     }
//   }, function(err, token) {
//     if(err){
//      return handleError(err,res)
//     }
//     else{
//       //got token id
//       console.log('token'+JSON.stringify(token))
//       // Create a Customer:
//       stripe.customers.create({
//         email: req.user.email,//"shubh037@gmail.com",
//         source: token.id//'tok_1At9Xi2eZvKYlo2CVhMEj8Io',//token id
//       }).then(function(customer) {
//         var  customerId ={
//           customerId:customer.id
//         }
//         let carddetail           = new Carddetail();
//         carddetail.user          = req.user._id;
//         carddetail.lastFourDigit = customer.sources.data[0].last4;
//         carddetail.customerId    = customer.id;
//         carddetail.save(function(err){
//           if(err){
//             return handleError(err,res);
//           }
//           else{
//             res.json(customerId)
//           }
//         })
//       })
//     }
//   })
// }

//get stripe token
export function accCreateAndTrans(req, res, next) {
  var stripe = require("stripe")(
    "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
  );
  stripe.tokens.create({
    card: {
      object:   'card',
      exp_month:req.body.month,
      exp_year: req.body.year,
      number:   req.body.cardNumber,
      cvc:      req.body.cvc//100'4242 4242 4242 4242',
    }
  }, function(err, token) {
    if(err){
     return handleError(err,res)
    }
    else{
      //got token id
      console.log('token'+JSON.stringify(token))
      // Create a Customer:
      stripe.customers.create({
        email: req.client.email,//"shubh037@gmail.com",
        source: token.id//'tok_1At9Xi2eZvKYlo2CVhMEj8Io',//token id
      }).then(function(customer) {
        var  customerId ={
          customerId:customer.id
        }
        let carddetail           = new Carddetail();
        carddetail.user          = req.user._id;
        carddetail.lastFourDigit = customer.sources.data[0].last4;
        carddetail.customerId    = customer.id;
        carddetail.save(function(err){
          if(err){
            return handleError(err,res);
          }
          else{
            res.json(customerId)
          }
        })
      })
    }
  })
}
//stripe payment
export function stripePayment(req,res){
  console.log('req.body'+JSON.stringify(req.body))
  var stripe = require("stripe")(
    "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
  );
  stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    customer: req.body.customerId,//'cus_BFesiWxNtkgF6G',//customer id
  })
  .then(function(charge) {
    res.status(200).send({

      message:'Thank you,Your transaction was successful.'
    })
  });
}

//sign up by user
export function demohtmlpdf(req, res) {
  var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./server/components/email/welcomeEmail.html', 'utf8');
var options = { format: 'Letter' };
  console.log('qwertyuiop.................')
  pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
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
