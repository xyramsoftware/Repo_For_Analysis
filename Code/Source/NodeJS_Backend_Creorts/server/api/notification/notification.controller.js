
'use strict';
import Notification from './notification.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Notifications API : status : 200 ");
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
          logger.info(" Notifications API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Notifications API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Notifications API : status : 500 ");
    res.status(statusCode).send(err);
  };
}

// Gets a list of Notifications
export function index(req, res) {
  Notification.find().exec(function(err,resdata){
    if(err){
      return handleError(err,res);
    }
    if(resdata.length == 0){
      logger.info("Notifications Get All API:NO DATA FOUND: status : 200 ");
      res.status(200).send({
        message:'No data found.'
      })
    }
    else{
      logger.info("Notifications Get All API : status : 200 ");
      res.json(resdata);
    }
  })
}

// Gets a single Notification from the DB
export function show(req, res) {
  logger.info("Notifications Get By ID API");
  return Notification.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Notification in the DB
export function create(req, res) {
  logger.info("Notifications Creation API");
  return Notification.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Notification in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Notifications Update API");
  return Notification.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Notification from the DB
export function destroy(req, res) {
  logger.info("Notifications Delete API");
  return Notification.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


//
// Gets a list of unread Notifications
export function unreadNotification(req, res) {
  return Notification.find({readNotification:false},{}).exec(function(err,data){
    if(err){
     handleError(res,err);
    }
    if(data.length==0){
      Notification.find().sort('-createdAt').limit(5).exec(function(err,lastfivedata){
        if(err){
          handleError(res,err);
        }
        else{
         res.json(lastfivedata);
        }
      })
    }
    else{
      logger.info("Notifications Get list of unread Notifications  API:status:200");
      res.json(data);
    }
  })
}

//update notification
export function updateNotification(req, res) {
  Notification.update({'readNotification':false},{$set:{'readNotification':true}},{'multi':true}).exec(function (err, notification) {
    if (err) {
      return handleError(res, err);
    }
    if (!notification) {
      logger.info("Notifications Update Notifications  API:status:404");
      return res.status(404).send('Not Found');
    }
    logger.info("Notifications Update Notifications  API:status:200");
    res.status(200).send({
      message:'All notification read.'
    })
  });
}
