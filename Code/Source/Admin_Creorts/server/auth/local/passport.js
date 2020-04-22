import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User,email,password,done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec()
    .then(user => {
      if(!user) {
        Client.findOne({
          email: email.toLowerCase()
        }).exec()
        then(user => {
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
      }

      if(user.status == false) {
        return done(null, false, {
          message: 'This email is Inactive.Please contact Admin to Register!!.'
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



export function setup(User) {
  console.log(" users 111111111111111111")
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}

