
'use strict';
import ReferFriend from './referFriends.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("ReferFriend API : status : 200 ");
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
          logger.info("ReferFriend API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("ReferFriend API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("ReferFriend API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of ReferFriend
export function index(req, res) {
  logger.info("ReferFriend Get List API ");
  return ReferFriend.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ReferFriend from the DB
export function show(req, res) {
  logger.info("ReferFriend Get By ID API ");
  return ReferFriend.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//get a list of ReferFriend by user
export function getByUser(req, res) {
  logger.info("ReferFriend Get List By UserID API ");
  var userID = req.params.userID;
  return ReferFriend.find({'userID': userID}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}


// Creates a new ReferFriend in the DB
export function create(req, res) {
  logger.info("ReferFriend Creation API ");
  var userID = req.params.userID;
  ReferFriend.find({userID: userID}, {}).exec(function(err) {
    if(err) {
      return handleError(err, res);
    } else {
    var newUser = new ReferFriend(req.body);
    newUser.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
    }
  })
}


// Upserts the given ReferFriend in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("ReferFriend Update API ");
  return ReferFriend.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a ReferFriend from the DB
export function destroy(req, res) {
  logger.info("ReferFriend Delete API ");
  return ReferFriend.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//Get ReferFriend's Count
export function getReferCount(req, res) {
  ReferFriend.count(function(err, count) {
    if(err) {
      logger.info("ReferFriend Get count API:status:400");
      res.send(err);
    }
    logger.info("ReferFriend Get count API:status:200");
    res.json(count); 
  });
}
