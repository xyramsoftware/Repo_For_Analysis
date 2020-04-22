'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://root:password@localhost:27017/ISFK2020'
  },

  // Seed database on startup
  seedDB: true

};
