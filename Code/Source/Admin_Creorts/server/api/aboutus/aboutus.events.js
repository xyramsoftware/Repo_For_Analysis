/**
 * Coupon model events
 */

'use strict';

import {EventEmitter} from 'events';
var AboutUsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AboutUsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(AboutUs) {
  for(var e in events) {
    let event = events[e];
    AboutUs.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    AboutUsEvents.emit(event + ':' + doc._id, doc);
    AboutUsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default AboutUsEvents;
