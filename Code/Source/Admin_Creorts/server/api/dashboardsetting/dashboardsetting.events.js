/**
 * Coupon model events
 */

'use strict';

import {EventEmitter} from 'events';
var DashboardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DashboardEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Dashboard) {
  for(var e in events) {
    let event = events[e];
    Dashboard.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DashboardEvents.emit(event + ':' + doc._id, doc);
    DashboardEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DashboardEvents;
