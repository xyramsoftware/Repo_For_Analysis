
'use strict';
import EventType from './eventType.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Event Type API : status : 200 ");
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
          logger.info("Event Type API : status : 204 ");
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
    logger.info("Event Type API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of EventType
export function index(req, res) {
  logger.info("Event Type Get List API ");
  return EventType.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EventType from the DB
export function show(req, res) {
  logger.info("Event Type Get By ID API ");
  return EventType.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new EventType in the DB
export function create(req, res) {
  logger.info("Event Type Creation API ");
  var category = new EventType(req.body);
  return EventType.create(category)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Upserts the given EventType in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Event Type Update API ");
  return EventType.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a EventType from the DB
export function destroy(req, res) {
  logger.info("Event Type Delete API ");
  return EventType.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

