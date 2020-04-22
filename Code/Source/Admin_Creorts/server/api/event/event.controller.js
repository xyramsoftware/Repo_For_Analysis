/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/menuItems              ->  index
 * POST    /api/menuItems              ->  create
 * GET     /api/menuItems/:id          ->  show
 * PUT     /api/menuItems/:id          ->  upsert
 * PATCH   /api/menuItems/:id          ->  patch
 * DELETE  /api/menuItems/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Events from './event.model';
var express = require('express');
var multer = require('multer');


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


// Gets a list of Events
export function index(req, res) {
  var clientID = req.params.clientID;
  return Events.find({'clientID':clientID }).sort({"EventTimings": 1}).collation( { locale: "en"  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Event by ID from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return Events.findById({'clientID':clientID,_id: req.params.id }).populate('image', 'PublicID').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Create Events in the DB
export function create(req, res) {
  var clientID = req.params.clientID;
  let events = new Events(req.body);
  events.clientID = clientID;
  Events.create(events)
      .then(respondWithResult(res, 201))
      .catch(handleError(res))
}


// Upserts the given Events in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var clientID = req.params.clientID;
  return Events.findOneAndUpdate({'clientID':clientID,_id: req.params.id }, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Events from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return Events.findById({'clientID':clientID,_id: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//get a list of Events by category id
export function getByEventDate(req, res) {
  var clientID = req.params.clientID;
  Events.find({'clientID':clientID,'EventDate':req.params.EventDate}, {roll:1, _id:0}).sort('asc').exec(function (err, product) {
    if (err) {
        console.log('err EventDates: ' + err);
      return handleError(res, err);
    }
    if (!product) {
      return res.status(404).send('Not Found');
    }
    return res.json(product);
  });
}





