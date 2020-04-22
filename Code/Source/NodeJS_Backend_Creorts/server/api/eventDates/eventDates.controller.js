
'use strict';
import EventDate from './eventDates.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Event Date API : status : 200 ");
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
          logger.info("Event Date API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Event Date API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Event Date API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of EventDate
export function index(req, res) {
  logger.info("Event Date Get List API ");
  return EventDate.find().sort('-categoryDate').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EventDate from the DB
export function show(req, res) {
  logger.info("Inside Event Date Get By ID API ");
  return EventDate.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new EventDate in the DB
export function create(req, res) {
  logger.info("Event Date Creation API ");
  var dates = new EventDate(req.body);
  return EventDate.create(dates)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Upserts the given EventDate in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
logger.info("Event Date Update API ");
return EventDate.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
   .then(respondWithResult(res))
   .catch(handleError(res));
}


// Deletes a EventDate from the DB
export function destroy(req, res) {
  logger.info("Event Date Delete API ");
  return EventDate.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

