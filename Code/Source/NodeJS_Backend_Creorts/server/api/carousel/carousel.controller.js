
'use strict';
import Carousel from './carousel.model';
var multer = require('multer');
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Carousel API: status : 200 ");
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
          logger.info("Carousel API: status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Carousel API: status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Carousel API: status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Creates a new carousel  in the DB
export function create(req, res) {
  logger.info("Carousel create API ");
  var content = new Carousel(req.body);
  content.carousel = ' ';
  return Carousel.create(content)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
}

//create carousel images
export function uploadAppImgs(req, res) {
  var carousel = req.body.carousel;
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) { 
    callback(null, './../ISFK2020 DATA/CAROUSEL IMGS/'+req.params.id);
    },
    filename: function(req, file, callback) {
      if(file.fieldname == 'carousel') {
        carousel =  file.fieldname +"_" + Date.now() +file.originalname;
        callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
        console.log("carousel :", carousel);
      }
    }
  });
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  };

  var uploadCarousel = multer({
    storage: Storage,
    fileFilter: fileFilter
  }).fields([{ name: 'carousel' }]);

  var fullPath = './../ISFK2020 DATA/CAROUSEL IMGS/'+req.params.id;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);

  uploadCarousel(req, res, function(err) {
    if(err) {
    logger.info("Carousel Image Upload API :status:400 ");
    return res.status(404).end('Something went wrong!!');
    }
    logger.info("Carousel Image Upload API :status:200 ");
    return res.status(200).end(carousel);
  });
}

//Gets all carousel 
export function index(req, res) {
  logger.info("Carousel Get All API");
  return Carousel.find().sort({'CarouselID': 1})
  .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Carousel from the DB
export function show(req, res) {
  logger.info("Carousel Get By ID API");
  return Carousel.findById({_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


 //download Carousel Img
export function downloadCarouselImg(req, res){
  res.download('./../ISFK2020 DATA/CAROUSEL IMGS/'+req.query.id+"/"+req.query.carousel);
}

//Update Carousel Img
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Carousel Update API");
  Carousel.findOneAndUpdate({_id: req.params.id }, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Carousel from the DB
export function destroy(req, res) {
  logger.info("Carousel Delete API");
  return Carousel.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

