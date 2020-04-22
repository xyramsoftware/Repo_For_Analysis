
'use strict';

import {EventEmitter} from 'events';
var EventDateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventDateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(EventDate) {
for(var e in events) {
  let event = events[e];
  EventDate.post(e, emitEvent(event));
}
}


function emitEvent(event) {
  return function(doc) {
    EventDateEvents.emit(event + ':' + doc._id, doc);
    EventDateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default EventDateEvents;
