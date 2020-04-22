
'use strict';
import EventFeedback from './eventFeedback.model';
var express = require('express');
const logger = require("../../middleware/logger");


// Include NPM
var async = require("async");
var crypto = require("crypto");
var path = require("path");
var paths = require('path');
var fs = require('fs');     



function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Event Feedback API : status : 200 ");
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
          logger.info("Event Feedback API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Event Feedback API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Event Feedback API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of EventFeedback
export function index(req, res) {
  logger.info("Event Feedback Get List API ");
  return EventFeedback.find().sort({"createdAt": 1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single EventFeedback by ID from the DB
export function show(req, res) {
  logger.info("Event Feedback Get By ID API ");
  return EventFeedback.findById({_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Create EventFeedback in the DB
export function create(req, res) {
  logger.info("Event Feedback Creation API ");
  var userID = req.params.userID;
  var EventID = req.params.EventID;
  EventFeedback.find({userID: userID,EventID:EventID}, {}).exec(function(err) {
    if(err) {
      return handleError(err, res);
    } else {
    var feedback = new EventFeedback(req.body);
    feedback.userID = userID;
    feedback.EventID = EventID;
    feedback.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
    }
  })
}


  
 
// Upserts the given EventFeedback in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Event Feedback Update API ");
  return EventFeedback.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a EventFeedback from the DB
export function destroy(req, res) {
  logger.info("Event Feedback Delete API ");
  return EventFeedback.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


//get a list of Feedback by user
export function getByUser(req, res) {
  logger.info("Event Feedback Get List By UserID API ");
  var userID = req.params.userID;
  var EventID = req.params.EventID;
  return EventFeedback.find({'userID':userID,EventID:EventID}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//Get Feedback Count
export function getByCount(req, res) {
  EventFeedback.count(function(err, count) {
    if(err) {
      logger.info(" Event Feedback Get count API:status:400");
      res.send(err);
    }
    logger.info(" Event  Feedback Get count API:status:200");
    res.json(count); 
  });
}

//GET Event Feedback count for Question(RateEvent)
export function getRateEventReview(req, res) {

  EventFeedback.aggregate([
    {
      "$group": {
          "_id": {
              "EventName": "$EventName",
              "rateEvent": "$rateEvent"
          },
          "statusCount": { "$sum": 1 }
      }
  },
  { 
      "$group": {
          "_id": "$_id.EventName",
          "statuses": { 
              "$push": { 
                  "rateEvent": "$_id.rateEvent",
                  "count": "$statusCount"
              },
          },
          "count": { "$sum": "$statusCount" }
      }
  },
  { "$unwind": "$statuses" },
  { 
      "$group": {
          "_id": "$_id",
           "Good" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateEvent", 
                          "Good"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Satisfactory" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateEvent", 
                          "Satisfactory"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Poor" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateEvent", 
                          "Poor"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
             "Excellent" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateEvent", 
                          "Excellent"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Not Applicable" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateEvent", 
                          "Not Applicable"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          
      }
  }   
]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    logger.info("Event Feedback Review for RateEvent API ");
    res.json(category);
  });
}

//GET Event Feedback count for Question(RateOrganization)
export function getRateOrganizationReview(req, res) {

  EventFeedback.aggregate([
    {
      "$group": {
          "_id": {
              "EventName": "$EventName",
              "rateOrganization": "$rateOrganization"
          },
          "statusCount": { "$sum": 1 }
      }
  },
  { 
      "$group": {
          "_id": "$_id.EventName",
          "statuses": { 
              "$push": { 
                  "rateOrganization": "$_id.rateOrganization",
                  "count": "$statusCount"
              },
          },
          "count": { "$sum": "$statusCount" }
      }
  },
  { "$unwind": "$statuses" },
  { 
      "$group": {
          "_id": "$_id",
           "Good" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateOrganization", 
                          "Good"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Satisfactory" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateOrganization", 
                          "Satisfactory"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Poor" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateOrganization", 
                          "Poor"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
             "Excellent" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateOrganization", 
                          "Excellent"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          "Not Applicable" : {
              "$sum": {
                  "$cond": [ 
                      { "$eq": [ 
                          "$statuses.rateOrganization", 
                          "Not Applicable"
                      ]},
                  "$statuses.count",
                  0 
                  ]
              }
          },
          
      }
  }   
]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    logger.info("Event Feedback Review for RateOrganization API ");
    res.json(category);
  });
}


