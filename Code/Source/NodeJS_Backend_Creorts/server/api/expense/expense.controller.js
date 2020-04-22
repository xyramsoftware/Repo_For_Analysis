
'use strict';
import Expense from './expense.model';
var multer = require('multer');
const logger = require("../../middleware/logger");

//Reports Generation
const json2csv = require('json2csv').parse;
const moment = require('moment');
var fs = require('fs'); 

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      logger.info("Expense Management API : status : 200 ");
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
          logger.info("Expense Management API : status : 204 ");
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      logger.info("Expense Management API : status : 404 ");
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    logger.info("Expense Management API : status : 500 ");
    res.status(statusCode).send(err);
  };
}


// Gets a list of Expense
export function index(req, res) {
  logger.info("Expense Management Get List API");
  return Expense.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Expense from the DB
export function show(req, res) {
  logger.info("Expense Management Get By ID API");
  return Expense.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Expense in the DB
export function create(req, res) {
  logger.info("Expense Management Creation API");
  var content = new Expense(req.body);
  content.expenseImg = ' ';
  return Expense.create(content)    
     .then(respondWithResult(res, 201))
     .catch(handleError(res));
  }
  


//Upload  images
export function uploadImgs(req, res) {
  var expenseImg = req.body.expenseImg;
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) { 
    callback(null, './../ISFK2020 DATA/EXPENSE IMGS/'+req.params.id);
    },
    filename: function(req, file, callback) {
      if(file.fieldname == 'expenseImg') {
        expenseImg =  file.fieldname +"_" + Date.now() +file.originalname;
        callback(null, file.fieldname +"_"+ Date.now() + file.originalname);
        console.log("expenseImg :", expenseImg);
      }
    }
  });
  
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf' || file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' || file.mimetype==='image/png') {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  };

  var uploadExpenseImg = multer({
    storage: Storage,
    fileFilter: fileFilter
  }).fields([{ name: 'expenseImg' }]);

  var fullPath = './../ISFK2020 DATA/EXPENSE IMGS/'+req.params.id;
  var shell = require('shelljs');
  shell.mkdir('-p', fullPath);

  uploadExpenseImg(req, res, function(err) {
    if(err) {
      logger.info("Expense Management Upload Image API:status:404");
      return res.status(404).end('Something went wrong!!');
    }
    logger.info("Expense Management Upload Image API:status:200");
    return res.status(200).end(expenseImg);
  });
}

 //download images Img
 export function downloadImg(req, res) {
  res.download('./../ISFK2020 DATA/EXPENSE IMGS/'+req.query.id+"/"+req.query.expenseImg);
}

// Upserts the given Expense in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  logger.info("Expense Management Update API");
  return Expense.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


//Get OverAll Reports
export function getReports(req, res) {

  var AllEvents = [ 'ExpenseItem','Date','InvoiceNo','RecorderBy','Amount','createdAt' ];

  Expense.find({ }, function (err, students) {
     if (err) {
       return res.status(500).json({ err });
     }
     else {
       let csv
       
       try {
    
         csv = json2csv(students, {fields:AllEvents});
       
       } catch (err) {
         return res.status(500).json({ err });
       }
 
       const dateTime = moment().format('YYYYMMDD');
       var filename   = "ExpenseReport"+dateTime+ ".csv";
       res.setHeader('Content-Type', 'text/csv');
       res.setHeader("Content-Disposition", 'attachment; filename='+filename);
       fs.writeFile(filename, csv ,function (err) {
         if (err) {
           return res.json(err).status(500);
         }
        else {
         res.download(filename);
         }
       });
 
     }
   })
 }



// Deletes a Expense from the DB
export function destroy(req, res) {
  logger.info("Expense Management Delete API");
  return Expense.findById({_id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

