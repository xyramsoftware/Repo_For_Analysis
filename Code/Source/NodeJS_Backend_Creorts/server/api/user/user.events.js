
'use strict';
import {EventEmitter} from 'events';
import User from './user.model';

var UserEvents = new EventEmitter();
import Notification from '../notification/notification.model';

//var userEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)

UserEvents.setMaxListeners(0);
// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(User) {
  for(var e in events) {
    let event = events[e];
    User.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    var notification = new Notification();
    notification.user = doc._id;
    notification.UserID = doc.UserID;
    notification.save(function(err) {
      if(err) {
        return res.status(400).send({message: 'Something Wrong'});
      } else { 
        let notifyObj = {
          _id: notification._id,
          readNotification: notification.readNotification,
          user: doc._id,
          UserID: doc.UserID,
          createdAt: doc.createdAt
        };
        UserEvents.emit(event, notifyObj);
      }
    });
  };
}

export {registerEvents};
export default UserEvents;

