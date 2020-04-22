/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/clients', require('./api/client'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/screens', require('./api/screen'));
  app.use('/api/appsettings', require('./api/appsetting'));
  app.use('/api/dashboard', require('./api/dashboardsetting'));
  app.use('/api/regforms', require('./api/registrationForm'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/qrcode', require('./api/QRcode'));
  app.use('/api/wishlists', require('./api/wishlist'));
  app.use('/api/carousel', require('./api/carousel'));
  app.use('/api/aboutus', require('./api/aboutus'));
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
