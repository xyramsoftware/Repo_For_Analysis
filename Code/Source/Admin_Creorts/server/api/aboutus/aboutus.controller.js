/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/coupons              ->  index
 * POST    /api/coupons              ->  create
 * GET     /api/coupons/:id          ->  show
 * PUT     /api/coupons/:id          ->  upsert
 * PATCH   /api/coupons/:id          ->  patch
 * DELETE  /api/coupons/:id          ->  destroy 
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import AboutUs from './aboutus.model';
var multer = require('multer');
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
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
    res.status(statusCode).send(err);
  };
}



//create APP images
export function UploadImgs(req, res) {

  var clientID = req.params.clientID;
  var aboutImg = req.body.aboutImg;
  
  var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../CONFERENCE DATA/'+clientID+'/ABOUTUS IMGS/'+req.params.id);
      },
     
    filename: function (req, file ,callback) {

     if (file.fieldname == "aboutImg") {
      aboutImg =  file.fieldname +"_" + Date.now() +file.originalname;
     callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
     console.log("aboutImg :",aboutImg);
   }
 }
   
 });


  const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);

    }else{
        cb(null,false);
    }
};
var uploadAboutImg= multer({
    
  storage: Storage ,
  fileFilter:fileFilter
  }).fields(
  [
    { 
      name: "aboutImg"
    }
  ]
  )
var fullPath = './../CONFERENCE DATA/'+clientID+'/ABOUTUS IMGS/'+req.params.id;

var shell = require('shelljs');
shell.mkdir('-p',fullPath);

uploadAboutImg(req, res, function (err) {
  if (err) {
    return res.status(404).end("Something went wrong!!");
  }

  return res.status(200).end(aboutImg);
})
};

// Creates a new App in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  var info = new AboutUs(req.body);
  info.content = req.body.content;
  info.email = req.body.email;
  info.phoneNo = req.body.phoneNo;
  info.location = req.body.location;
  info.aboutImg = "";
  info.clientID = clientID;
  return AboutUs.create(info)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
 }


export function index(req, res) {
  var clientID = req.params.clientID;
  return AboutUs.find({'clientID':clientID}).populate('image', 'PublicID').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Carousel from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return AboutUs.findById({'clientID':clientID,_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


 //download Carousel Img
 export function downloadImg(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/ABOUTUS IMGS/'+req.params.id+"/"+req.query.aboutImg;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/ABOUTUS IMGS/'+req.params.id+"/"+req.query.aboutImg) ;
  };


export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  var clientID = req.params.clientID;
  AboutUs.findOneAndUpdate({'clientID':clientID,_id: req.params.id },req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }


// Updates an existing Carousel in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return AboutUs.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Carousel from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return AboutUs.findById({'clientID':clientID,_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

