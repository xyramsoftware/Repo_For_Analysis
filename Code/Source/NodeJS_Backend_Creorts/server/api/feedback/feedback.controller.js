
'use strict';
import Feedback from './feedback.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info(" Feedback API : status : 200 ");
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
          logger.info(" Feedback API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info(" Feedback API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info(" Feedback API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of Feedback
export function index(req, res) {
 logger.info(" Feedback Get List API");
 return Feedback.find().sort({"createdAt": 1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Feedback by ID from the DB
export function show(req, res) {
 logger.info(" Feedback Get By ID API");
 return Feedback.findById({_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Create Feedback in the DB
export function create(req, res) {
  logger.info(" Feedback Creation API");
  var userID = req.params.userID;
  Feedback.find({userID: userID}, {}).exec(function(err) {
    if(err) {
      return handleError(err, res);
    } else {
    var feedback = new Feedback(req.body);
    feedback.userID = userID;
    feedback.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
    }
  })
}

// Upserts the given Feedback in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
 logger.info(" Feedback Update API");
 return Feedback.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Feedback from the DB
export function destroy(req, res) {
  logger.info(" Feedback Delete API");
  return Feedback.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


//get a list of Feedback by user
export function getByUser(req, res) {
  logger.info(" Feedback Get List By UserID API");
  var userID = req.params.userID;
  return Feedback.find({'userID':userID}).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//Get Feedback Count
export function getByCount(req, res) {
  Feedback.count(function(err, count) {
    if(err) {
      logger.info(" Feedback Get count API:status:400");
      res.send(err);
    }
    logger.info(" Feedback Get count API:status:200");
    res.json(count); 
  });
}

//GET Feedback Review for Question(RateOrganization)
export function getRateOrganizationReview(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  Feedback.aggregate([
    { $group: {
      _id: '$rateOrganization',
      data: { $sum: 1 },
    }},
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info(" Feedback Review on Question 1 API:status:200");
    res.json(result);
  });
}


//GET Feedback Review for Question(RateEvent)
export function getRateEventReview(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  Feedback.aggregate([
    { $group: {
      _id: '$rateEvent',
      data: { $sum: 1 },
    }},
  ]).exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    length = category.length;
    for(i = 0; i < length; i++) {
      categoryName.push(category[i]._id);
      rawData.push(category[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    logger.info(" Feedback Review on Question 2 API:status:200");
    res.json(result);
  });
}


