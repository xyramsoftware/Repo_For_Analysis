
'use strict';
import News from './news.model';
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info(" Latest News API : status : 200 ");
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
          logger.info(" Latest News API : status : 204 ");
          return res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info(" Latest News API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info(" Latest News API : status : 500 ");
    res.status(statusCode).send(err);
  };
}

// Gets a list of Latest News
export function index(req, res) {
  logger.info(" Latest News Get List API");
  return News.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Latest News from the DB
export function show(req, res) {
  logger.info(" Latest News Get By ID API");
  return News.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Latest News in the DB
export function create(req, res) {
  logger.info(" Latest News Creation API");
  var news = new News(req.body);
  return News.create(news)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


//Upserts the given Latest News in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
 logger.info(" Latest News Update API");
 return News.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Latest News from the DB
export function destroy(req, res) {
 logger.info(" Latest News Delete API");
 return News.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//Custom search by Latest News Title
export function customTitle(req, res) {
  logger.info(" Latest News search by Title API");
  News.find({ title: { $regex: req.body.title, $options: 'i' } } ).exec(function(err, data) {
    if(err) {
      return handleError(res);
    } else {
      logger.info(" Latest News search by Title API:status:200");
      res.json(data);
    }
  });
}
