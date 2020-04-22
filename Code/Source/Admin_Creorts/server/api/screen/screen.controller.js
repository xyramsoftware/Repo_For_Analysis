/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  upsert
 * PATCH   /api/categories/:id          ->  patch
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Screen from './screen.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
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
    res.status(statusCode).send(err);
  };
}




// Gets a list of Screen
export function index(req, res) {
//console.log("get all")
  return Screen.find({clientID:req.params.clientID}).populate('image', 'PublicID').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Screens from the DB
export function show(req, res) {
  console.log("get by id")
  return Screen.findById(req.params.id).populate('image', 'PublicID').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Screens in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  var screens = new Screen(req.body);
  screens.clientID = clientID;
 return Screen.create(screens)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Upserts the given Screen in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
    console.log('req.body'+ JSON.stringify(req.body))
  return Screen.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Screen in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Screen.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Screen from the DB
export function destroy(req, res) {
  return Screen.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of six Screen  added recently
export function recentlyAdded(req, res) {
  return Screen.find().sort('-createdAt').limit(6).populate('image', 'PublicID').exec(function(err,sixcategories){
    if(err){
      return handleError(res,err)
    }
    else{
      res.json(sixcategories)
    }
  })
}
