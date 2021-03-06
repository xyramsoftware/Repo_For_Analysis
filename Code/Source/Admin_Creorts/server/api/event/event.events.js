/**
 * MenuItem model events
 */

'use strict';

import {EventEmitter} from 'events';
import Events from './event.model';
var EventsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Events.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EventsEvents.emit(event + ':' + doc._id, doc);
    EventsEvents.emit(event, doc);
  };
}

export default EventsEvents;
