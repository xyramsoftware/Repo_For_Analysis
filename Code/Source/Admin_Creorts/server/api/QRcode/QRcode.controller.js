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
import QRcode from './QRcode.model';


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

// Gets a list of Categorys
export function index(req, res) {
  var clientID = req.params.clientID;
  return QRcode.find({'clientID':clientID}).populate('image', 'PublicID').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Category from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return QRcode.findById({'clientID':clientID,_id: req.params.id }).populate('image', 'PublicID').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Category in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  var content = new QRcode(req.body);
  content.clientID = clientID;
 return QRcode.create(content)    
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}



// Upserts the given Category in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var clientID = req.params.clientID;
    console.log('req.body'+ JSON.stringify(req.body))
  return QRcode.findOneAndUpdate({'clientID':clientID,_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Category in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return QRcode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Category from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return QRcode.findById({'clientID':clientID,_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of six categories  added recently
export function recentlyAdded(req, res) {
  return QRcode.find().sort('-createdAt').limit(6).populate('image', 'PublicID').exec(function(err,sixcategories){
    if(err){
      return handleError(res,err)
    }
    else{
      res.json(sixcategories)
    }
  })
}
