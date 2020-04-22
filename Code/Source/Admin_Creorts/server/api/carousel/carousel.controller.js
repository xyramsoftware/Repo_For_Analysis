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
import Carousel from './carousel.model';
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



// Creates a new App in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  var content = new Carousel(req.body);
  content.carousel = "";
  content.clientID = clientID;
  return Carousel.create(content)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
 }

//create APP images
export function uploadAppImgs(req, res) {

  console.log("inside CAROUSEL")
  var clientID = req.params.clientID;
  var carousel = req.body.carousel;
  
  var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../CONFERENCE DATA/'+clientID+'/CAROUSEL IMGS/'+req.params.id);
      },
     
    filename: function (req, file ,callback) {

     if (file.fieldname == "carousel") {
      carousel =  file.fieldname +"_" + Date.now() +file.originalname   ;
     callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
     console.log("carousel :",carousel);
   }
 }
   
 });


  const fileFilter = (req,file,cb)=>{
    console.log("inside filetype")
    if(file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);

    }else{
        cb(null,false);
    }
};
var uploadCarousel= multer({
    
  storage: Storage ,
  fileFilter:fileFilter
  }).fields(
  [
    { 
      name: "carousel"
    }
  ]
  )
var fullPath = './../CONFERENCE DATA/'+clientID+'/CAROUSEL IMGS/'+req.params.id;

var shell = require('shelljs');
shell.mkdir('-p',fullPath);

uploadCarousel(req, res, function (err) {
  if (err) {
    return res.status(404).end("Something went wrong!!");
  }

  return res.status(200).end(carousel);

})
};


export function index(req, res) {
  var clientID = req.params.clientID;
  return Carousel.find({'clientID':clientID}).populate('image', 'PublicID').sort({ "CarouselID": 1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Carousel from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return Carousel.findById({'clientID':clientID,_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


 //download Carousel Img
 export function downloadCarouselImg(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/CAROUSEL IMGS/'+req.query.id+"/"+req.query.carousel;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/CAROUSEL IMGS/'+req.query.id+"/"+req.query.carousel) ;
  };



export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var clientID = req.params.clientID;
   Carousel.findOneAndUpdate({'clientID':clientID,_id: req.params.id },req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }


// Updates an existing Carousel in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Carousel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Carousel from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return Carousel.findById({'clientID':clientID,_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

