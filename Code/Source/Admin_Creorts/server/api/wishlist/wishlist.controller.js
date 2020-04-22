/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wishlists              ->  index
 * POST    /api/wishlists              ->  create
 * GET     /api/wishlists/:id          ->  show
 * PUT     /api/wishlists/:id          ->  upsert
 * PATCH   /api/wishlists/:id          ->  patch
 * DELETE  /api/wishlists/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Wishlist from './wishlist.model';

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

// Gets a list of Wishlists by userID
export function index(req, res) {
  var clientID = req.params.clientID;
  return Wishlist.find({'clientID':clientID,'userId':req.params.userId},{}).populate('eventId').sort('asc').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wishlist from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return Wishlist.findById({'clientID':clientID,_id: req.params.id}).populate('eventId').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wishlist in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  let wishlist = new Wishlist(req.body);
  wishlist.clientID = clientID;
  Wishlist.create(wishlist)
      .then(respondWithResult(res, 201))
      .catch(handleError(res))
}


// Deletes a Favourite from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  var userId = req.params.userId;
  var eventId = req.params.eventId;
  Wishlist.findOne({$and:[{'clientID':clientID},{'userId':userId},{'eventId':eventId}]},{}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}