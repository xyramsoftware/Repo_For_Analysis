
'use strict';

import {EventEmitter} from 'events';
var EventTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventTypeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(EventType) {
for(var e in events) {
  let event = events[e];
  EventType.post(e, emitEvent(event));
}
}


function emitEvent(event) {
  return function(doc) {
    EventTypeEvents.emit(event + ':' + doc._id, doc);
    EventTypeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default EventTypeEvents;
