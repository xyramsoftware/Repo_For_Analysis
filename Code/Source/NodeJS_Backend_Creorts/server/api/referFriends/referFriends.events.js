
'use strict';
import {EventEmitter} from 'events';
var ReferFriendEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReferFriendEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ReferFriend) {
for(var e in events) {
  let event = events[e];
  ReferFriend.post(e, emitEvent(event));
}
}

function emitEvent(event) {
  return function(doc) {
    ReferFriendEvents.emit(event + ':' + doc._id, doc);
    ReferFriendEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ReferFriendEvents;
