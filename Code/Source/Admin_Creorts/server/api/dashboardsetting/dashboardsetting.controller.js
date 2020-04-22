/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/coupons              ->  index
 * POST    /api/coupons              ->  create
 * GET     /api/coupons/:id          ->  show
 * PUT     /api/coupons/:id          ->  upsert
 * PATCH   /api/coupons/:id          ->  patch
 * DELETE  /api/coupons/:id          ->  destroy 
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Dashboard from './dashboardsetting.model';
var multer = require('multer');
var filenames = "";

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

//create Dashboard images
export function uploaddashImgs(req, res) {

  console.log("inside upload dashicon")
  var clientID = req.params.clientID;
 // var id =req.params._id;
  var dashicon = req.body.dashicon;
  var dashheaderImg = req.body.dashheaderImg;

  var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../CONFERENCE DATA/'+clientID+'/DASHBOARD IMGS/'+req.params.id);
      },
     
    filename: function (req, file ,callback) {

     if (file.fieldname == "dashicon") {
      dashicon =  file.fieldname +"_" + Date.now() +file.originalname   ;
     callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
     console.log("dashicon :",dashicon);
   }

   if (file.fieldname == "dashheaderImg") {
    dashheaderImg =  file.fieldname +"_" + Date.now() +file.originalname   ;
   callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
   console.log("dashheaderImg :",dashheaderImg);
 }

     }
   
 });



  const fileFilter = (req,file,cb)=>{
    console.log("inside filetype")
    if(file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);

    }else{
        cb(null,false);
    }
};
var uploadIcon= multer({
    
  storage: Storage ,
  fileFilter:fileFilter
  }).fields(
  [
    { 
      name: "dashicon", 
      maxCount: 1
    },

    { 
      name: "dashheaderImg", 
      maxCount: 1
    },
  
  ]
  )
var fullPath = './../CONFERENCE DATA/'+clientID+'/DASHBOARD IMGS/'+req.params.id ;

var shell = require('shelljs');
shell.mkdir('-p',fullPath);

uploadIcon(req, res, function (err) {
    if (err) {
      return res.status(404).end("Something went wrong!!");
    }

    return res.status(200).end(dashicon);
   
  })
};

// Creates a new Dashboard header color in the DB
export function createHeadercolor(req, res) {
  var clientID = req.params.clientID;
  var headercolors = new Dashboard(req.body);
  headercolors.headercolor = req.body.headercolor;
  headercolors.dashicon = "";
  headercolors.clientID = clientID;
  return Dashboard.create(headercolors)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
 }

 //download Dash Icon Img
 export function downloaddashIcon(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/DASHBOARD IMGS/'+req.query.id+"/"+req.query.dashicon;
 // console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/DASHBOARD IMGS/'+req.query.id+"/"+req.query.dashicon) ;
 
};

//download Dash Header  Img
/*export function downloaddashheaderImg(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' +req.query.dashheaderImg;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' + req.query.dashheaderImg) ;
 
};*/

export function index(req, res) {
  var clientID = req.params.clientID;
  return Dashboard.find({'clientID':clientID }).populate('image', 'PublicID').sort({ "CarouselID": 1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Dashboard from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return Dashboard.find({'clientID':clientID,_id: req.params.id }).populate('image', 'PublicID').exec()
  .then(respondWithResult(res))
    .catch(handleError(res));
}



// Upserts the given Dashboard in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var clientID = req.params.clientID;
    console.log('req.body'+ JSON.stringify(req.body))
  return Dashboard.findOneAndUpdate({'clientID':clientID,_id: req.params.id}, req.body,{new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing Dashboard in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Dashboard.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dashboard from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return Dashboard.findById({'clientID':clientID,_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

