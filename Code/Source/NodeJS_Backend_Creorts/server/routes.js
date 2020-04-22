/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below

  app.use('/api/users', require('./api/user')); 
  app.use('/api/clients', require('./api/client')); 
  /*******ACCOMPANY FORMS**************************************/
  app.use('/api/accompanies', require('./api/accompanyPerson'));
  /*********EVENTS ***************************************/
  app.use('/api/dates', require('./api/eventDates'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/type', require('./api/eventType'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/wishlists', require('./api/wishlist'));
  /**********FEEDBACK***********************************/
  app.use('/api/feedback', require('./api/feedback'));
  app.use('/api/eventfeedback', require('./api/eventFeedback'));
  /*************NEWS**************************************/
  app.use('/api/news', require('./api/news'));
  /*************GALLERY**********************************/
  app.use('/api/gallery', require('./api/gallery'));
  /*******SOCIAL MEDIA***********************************/
  app.use('/api/socialMedia', require('./api/socialMedia'));
  /************REFER FRIEND*************************************/
  app.use('/api/referFriends', require('./api/referFriends'));
  /**************EXPENSE*******************************************/
  app.use('/api/expense', require('./api/expense'));
  /*********SETTINGS********************************************/ 
  app.use('/api/carousel', require('./api/carousel'));
  /***********NOTIFICATIONS*****************************/
  app.use('/api/notifications', require('./api/notification'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
