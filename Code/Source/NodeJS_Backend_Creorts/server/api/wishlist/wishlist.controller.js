
'use strict';
import Wishlist from './wishlist.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info(" Wishlist API : status : 200 ");
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
          logger.info(" Wishlist API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info(" Wishlist API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info(" Wishlist API : status : 500 ");
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wishlists by userID
export function index(req, res) {
  logger.info(" Wishlist Get List By UserID API");
  return Wishlist.find({'userId': req.params.userId}, {}).populate('eventId').sort('asc').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wishlist from the DB
export function show(req, res) {
  logger.info(" Wishlist Get By ID API");
  return Wishlist.findById({_id: req.params.id}).populate('eventId').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wishlist in the DB
export function create(req, res) {
  logger.info(" Wishlist Creation API");
  let wishlist = new Wishlist(req.body);
  Wishlist.create(wishlist)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
}


// Deletes a Wishlist by userId & eventId
export function destroy(req, res) {
  logger.info(" Wishlist Delete API");
  var userId = req.params.userId;
  var eventId = req.params.eventId;
  Wishlist.findOne({$and:[{'userId': userId}, {'eventId': eventId}]}, {}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}