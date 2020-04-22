
'use strict';
import SocialMedia from './socialMedia.model';
const logger = require("../../middleware/logger");


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("SocialMedia API : status : 200 ");
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
          logger.info("SocialMedia API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("SocialMedia API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("SocialMedia API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of SocialMedia
export function index(req, res) {
  logger.info("SocialMedia Get List API");
  return SocialMedia.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single SocialMedia from the DB
export function show(req, res) {
  logger.info("SocialMedia Get By ID API");
  return SocialMedia.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SocialMedia in the DB
export function create(req, res) {
  logger.info("SocialMedia Creation API");
  var category = new SocialMedia(req.body);
  return SocialMedia.create(category) 
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Upserts the given SocialMedia in the DB at the specified ID
export function upsert(req, res, callback) {
  if(req.body._id) {
    delete req.body._id;
  }

  if(req.body.type == 'facebook') {
    var type = { $inc: { facebook: 1} };
  }

  if(req.body.type == 'instagram') {
    var type = { $inc: { instagram: 1} };
  }

  if(req.body.type == 'twitter') {
    var type = { $inc: { twitter: 1} };
  }

  SocialMedia.findOneAndUpdate({ _id: req.params.id }, type, {new: true }, function(err, response) {
    if(err) {
      return callback(err);
    } else {
      logger.info("SocialMedia Update API");
      res.status(200).send({
        message: 'Updated'
      });
    }
  });
}


// Deletes a SocialMedia from the DB
export function destroy(req, res) {
  logger.info("SocialMedia Delete API");
  return SocialMedia.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

