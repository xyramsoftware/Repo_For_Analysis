
'use strict';
import {EventEmitter} from 'events';
var socialMediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
socialMediaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(socialMedia) {
  for(var e in events) {
    let event = events[e];
    socialMedia.post(e, emitEvent(event));
  }
}


function emitEvent(event) {
  return function(doc) {
    socialMediaEvents.emit(event + ':' + doc._id, doc);
    socialMediaEvents.emit(event, doc);
  };
}

export {registerEvents};
export default socialMediaEvents;
