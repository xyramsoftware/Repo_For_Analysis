/**
 * Category model events
 */

'use strict';

import {EventEmitter} from 'events';
var QRcodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QRcodeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(QRcode) {
for(var e in events) {
  let event = events[e];
  QRcode.schema.post(e, emitEvent(event));
}
}


function emitEvent(event) {
  return function(doc) {
    QRcodeEvents.emit(event + ':' + doc._id, doc);
    QRcodeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default QRcodeEvents;
