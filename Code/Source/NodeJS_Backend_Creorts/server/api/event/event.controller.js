
'use strict';
import Events from './event.model';
var express = require('express');
var multer = require('multer');
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Event API: status : 200 ");
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
          logger.info("Event API: status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Event API: status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Event API: status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of Events
export function index(req, res) {
  logger.info("Event Get List API ");
  return Events.find().sort({'EventDate': 1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Event by ID from the DB
export function show(req, res) {
  logger.info("Event Get By ID API");
  return Events.findById({_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Update Events Count For QR Scan by Id
export function UpdateScanCount(req, res, callback) {
  if(req.body._id) {
    delete req.body._id;
  }

  if(req.body.type == 'userCount') {
    var type = { $inc: { userCount: 1} };
  }

  if(req.body.type == 'teamMemberCount') {
    var type = { $inc: { teamMemberCount: 1} };
  }

  if(req.body.type == 'accompanyCount') {
    var type = { $inc: { accompanyCount: 1} };
  }

  if(req.body.type == 'ticketsCount') {
    var type = { $inc: { ticketsCount: 1} };
  }

  
  if(req.body.type == 'visitorsCount') {
    var type = { $inc: { visitorsCount: 1} };
  }

  Events.findOneAndUpdate({ _id: req.params.id }, type, {new: true }, function(err, response) {
    if(err) {
      return callback(err);
    } else {
      logger.info("Events Update for QR Scan count API");
      res.status(200).send({
        message: 'Updated'
      });
    }
  });
}



//get a list of Events by Category ID 
export function getByCategoryName(req, res) {
  Events.find({'CategoryID': req.params.CategoryID }).sort('createdAt').exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    if(!category) {
      logger.info("Event List By Category ID API: status : 404");
      return res.status(404).send('Not Found');
    }
    logger.info("Event List By Category ID API: status : 200");
    return res.json(category);
  });
}

//get a list of Events by EventTypeID 
export function getByEventTypeName(req, res) {
  Events.find({'EventTypeID': req.params.EventTypeID }).sort('createdAt').exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    if(!category) {
      logger.info("Event List By EventType ID API: status : 404");
      return res.status(404).send('Not Found');
    }
    logger.info("Event List By EventType ID API: status : 200");
    return res.json(category);
  });
}


//get a list of Events by CategoryID & EventTypeID
export function getByEventType(req, res) {
  Events.find({'CategoryID': req.params.CategoryID, 'EventTypeID': req.params.EventTypeID}).sort('createdAt').exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    if(!category) {
      logger.info("Event List By CategoryID & EventTypeID API : status : 404");
      return res.status(404).send('Not Found');
    }
    logger.info("Event List By CategoryID & EventTypeID API : status : 200");
    return res.json(category);
  });
}


//get a list of Events by EventDateID &CategoryID
export function getByEvendatecategory(req, res) {
  Events.find({'EventDateID': req.params.EventDateID, 'CategoryID': req.params.CategoryID }).sort('createdAt').exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    if(!category) {
      logger.info("Event List By EventDateID & CategoryID API : status : 404");
      return res.status(404).send('Not Found');
    }
    logger.info("Event List By EventDateID & CategoryID API: status : 200");
    return res.json(category);
  });
}

//get a list of Events By EventDateID 
export function getByEventDates(req, res) {
  Events.find({'EventDateID': req.params.EventDateID}).sort('createdAt').exec(function(err, category) {
    if(err) {
      return handleError(res, err);
    }
    if(!category) {
      logger.info("Event List By EventDateID API: status : 404");
      return res.status(404).send('Not Found');
    }
    logger.info("Event List By EventDateID API: status : 200");
    return res.json(category);
  });
}


// Creates a new Events in the DB
export function create(req, res) {
  logger.info("Event Creation API");
  var content = new Events(req.body);
  content.eventspdf = '';
  return Events.create(content)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
}

//Upload Events PDF in the DB
export function uploadEventsPDF(req, res) {
  var eventspdf = req.body.eventspdf;
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) { 
      callback(null, './../ISFK2020 DATA/EVENTS IMGS/'+req.params.id);
    },
    filename: function(req, file, callback) {
      if(file.fieldname == 'eventspdf') {
        eventspdf =  file.fieldname +"_" +file.originalname;
        callback(null, file.fieldname +"_"+ file.originalname);
      }
    }
  });


  const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'application/pdf' || file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  var uploadEventsImg = multer({
    storage: Storage,
    fileFilter: fileFilter
  }).fields(
    [{ 
      name: 'eventspdf', 
      maxCount: 1
    },
  ]);

  var fullPath = './../ISFK2020 DATA/EVENTS IMGS/'+req.params.id;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);

  uploadEventsImg(req, res, function(err) {
    if(err) {
    logger.info("Event PDF Upload API: status : 404");
    return res.status(404).end('Something went wrong!!');
    }
    logger.info("Event PDF Upload API: status : 200");
    return res.status(200).end(eventspdf);
  })  
}

//Upload Events Image in the DB
export function uploadEventImage(req, res) {
  var image = req.body.image;
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) { 
    callback(null, './../ISFK2020 DATA/EVENTS IMGS/'+req.params.id);
  },
    filename: function(req, file, callback) {
     if(file.fieldname == "image") {
      image =  file.fieldname +"_" +file.originalname   ;
      callback(null, file.fieldname +"_"+ file.originalname);
     }
    }
  });


  const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf' || file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null, true);
      } else {
        cb(null, false);
    }
};
     var uploadEventsImg= multer({
       storage: Storage,
       fileFilter: fileFilter
       }).fields([{ 
            name: "image", 
            maxCount: 1
          },
         ]);
  var fullPath = './../ISFK2020 DATA/EVENTS IMGS/'+req.params.id;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);

  uploadEventsImg(req, res, function(err) {
    if(err) {
      logger.info("Event Image Upload API : status : 404");
    return res.status(404).end('Something went wrong!!');
    }
    logger.info("Event Image Upload API: status : 200");
    return res.status(200).end(image);
  })  
}


 //download eventspdf 
export function downloadEventsPDF(req, res){
  res.download('./../ISFK2020 DATA/EVENTS IMGS/'+req.query.id+"/"+req.query.eventspdf);
}

  //download events image 
export function downloadEventImage(req, res){
  res.download('./../ISFK2020 DATA/EVENTS IMGS/'+req.query.id+"/"+req.query.image) ;
 }

// Upserts the given Events in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Event Update API");
 return Events.findOneAndUpdate({_id: req.params.id }, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Events from the DB
export function destroy(req, res) {
  logger.info("Event Delete API");
  return Events.findById({_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
