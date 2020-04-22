
'use strict';
import Gallery from './gallery.model';
var multer = require('multer');
const logger = require("../../middleware/logger");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info(" Gallery API : status : 200 ");
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() =>{
          logger.info(" Gallery API : status : 204 ");
          return res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info(" Gallery API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info(" Gallery API : status : 500 ");
    res.status(statusCode).send(err);
  };
}

// Gets a list of Gallery
export function index(req, res) {
  logger.info(" Gallery Get List API");
  return Gallery.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Gallery by pagination
export function getbypage(req, res) {
  var page = parseInt(req.query.page); 
  var limit = parseInt(req.query.limit);
  var query = {};
  Gallery.find(query)
    .sort({ update_at: -1 })
    .skip(page * limit) 
    .limit(limit)
    .exec((err, doc) => {
      if(err) {
        return res.json(err);
      }
  Gallery.countDocuments(query).exec((count_error, count) => {
        if(err) {
          logger.info(" Gallery List Pagination API:status:400");
          return res.json(count_error);
        }
        logger.info(" Gallery List Pagination API:status:200");
        return res.json({
          total: count,
          page: page,
          pageSize: doc.length,
          books: doc
        });
      });
    });
}


// Gets a single Gallery from the DB
export function show(req, res) {
  logger.info(" Gallery Get By ID");
  return Gallery.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// upload a new Gallery in the DB
export function create(req, res) {
  var images = req.body.images;
  var Storage = multer.diskStorage({
    destination: function (req, file, callback) { 
    callback(null, './../ISFK2020 DATA/GALLERY IMGS/');
      },
    filename: function (req, file ,callback) {
     if(file.fieldname == "images") {
      images =  file.fieldname +"_" + Date.now() +file.originalname;
      callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
   }
 }
});


  const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpg'|| file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

  var uploadImages = multer({
    storage: Storage ,
    fileFilter: fileFilter
  }).fields(
    [{ 
      name: "images"
    }]
  )

  var fullPath = './../ISFK2020 DATA/GALLERY IMGS/';
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);

  uploadImages(req, res, function(err) {
    logger.info(" Gallery Creation API");
    var URL = 'https://creorts.com:444/api/gallery/download?'+'images='+images; 
    var content = new Gallery(req.body);
    content.URL = URL;
    content.title = req.body.title;
    Gallery.create(content)    
   .then(respondWithResult(res, 201))
   .catch(handleError(res));
  }); 
}


 //download images Img
export function downloadGalleryImg(req, res) {
  res.download('./../ISFK2020 DATA/GALLERY IMGS/'+'/'+req.query.images);
}


// Upserts the given Gallery in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info(" Gallery Update API");
  return Gallery.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Gallery from the DB
export function destroy(req, res) {
 logger.info(" Gallery Delete API");
 return Gallery.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

