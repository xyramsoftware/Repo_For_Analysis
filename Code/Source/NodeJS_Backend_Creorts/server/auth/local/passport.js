import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';


function localAuthenticate(Client, Username, password, done) {
  Client.findOne({
    Username: Username
  }).exec()
    .then(user => {
      if(!user) {
        return done(null, false, {
          message: 'This Username is not registered.'
        });
      }
      if(user.status == false) {
        return done(null, false, {
          message: 'This Username is Inactive.Please contact Admin to Register!!.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if(authError) {
          return done(authError);
        }
        if(!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(Client) {
  passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'password' // this is the virtual field on the model
  }, function(Username, password, done) {
    return localAuthenticate(Client, Username, password, done);
  }));
}
