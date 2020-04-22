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
import AppSetting from './appsetting.model';
var multer = require('multer');
var appicon = "";


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





//create APP images
export function uploadAppImgs(req, res) {

  console.log("inside uploadAppIcon")
  var clientID = req.params.clientID;
  var appicon = req.body.appicon;
  var appheaderImg = req.body.appheaderImg;
  var loginImg = req.body.loginImg;

  var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../CONFERENCE DATA/'+clientID+'/APP IMGS/'+req.params.id);
      },
     
    filename: function (req, file ,callback) {

     if (file.fieldname == "appicon") {
      appicon =  file.fieldname +"_" + Date.now() +file.originalname   ;
     callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
     console.log("appicon :",appicon);
   }

   if (file.fieldname == "appheaderImg") {
    appheaderImg =  file.fieldname +"_" + Date.now() +file.originalname   ;
   callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
   console.log("headerImg :",appheaderImg);
   }

   if (file.fieldname == "loginImg") {
    loginImg =  file.fieldname +"_" + Date.now() +file.originalname   ;
   callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
   console.log("loginImg :",loginImg);
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
      name: "appicon", 
      maxCount: 1
    },

    { 
      name: "appheaderImg", 
      maxCount: 1
    },
    { 
      name: "loginImg", 
      maxCount: 1
    }
  
  ]
  )
var fullPath = './../CONFERENCE DATA/'+clientID+'/APP IMGS/'+req.params.id;

var shell = require('shelljs');
shell.mkdir('-p',fullPath);

uploadIcon(req, res, function (err) {
    if (err) {
      return res.status(404).end("Something went wrong!!");
    }

    return res.status(200).end(appicon);
  
  })
};

// Creates a new App in the DB
export function createHeadercolor(req, res) {
  var clientID = req.params.clientID;
  var headercolors = new AppSetting(req.body);
  headercolors.headercolor = req.body.headercolor;
  headercolors.appicon = "";
  headercolors.clientID = clientID;
  return AppSetting.create(headercolors)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
 }

 //download App Icon Img
 export function downloadAppIcon(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/'+req.query.id+"/"+req.query.appicon;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/'+req.query.id+"/"+req.query.appicon) ;
 
};

//download App Header  Img
/*export function downloadheaderImg(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' +req.query.appheaderImg;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' + req.query.appheaderImg) ;
 
};*/

//download App LOGIN  Img
/*export function downloadloginImg(req, res){
  var file = './../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' +req.query.loginImg;
  console.log("inside download : "+ file);
  res.download('./../CONFERENCE DATA/'+req.query.clientID+'/APP IMGS/' + req.query.loginImg) ;
 
};*/

export function index(req, res) {
  var clientID = req.params.clientID;
  return AppSetting.find({'clientID':clientID }).populate('image', 'PublicID').sort({ "CarouselID": 1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single AppSetting from the DB
export function show(req, res) {
  var clientID = req.params.clientID;
  return AppSetting.find({'clientID':clientID,_id: req.params.id }).populate('image', 'PublicID').exec()
  .then(respondWithResult(res))
    .catch(handleError(res));
    
}


// Upserts the given AppSetting  in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var clientID = req.params.clientID;
    console.log('req.body'+ JSON.stringify(req.body))
  return AppSetting.findOneAndUpdate({'clientID':clientID,_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing AppSetting in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return AppSetting.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a AppSetting from the DB
export function destroy(req, res) {
  var clientID = req.params.clientID;
  return AppSetting.findById({'clientID':clientID,_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

