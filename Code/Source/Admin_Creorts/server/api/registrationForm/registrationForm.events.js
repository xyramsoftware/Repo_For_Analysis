/**
 * RegistrationForm model events
 */

'use strict';

import {EventEmitter} from 'events';
import RegistrationForm from './registrationForm.model';
var RegistrationFormEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RegistrationFormEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(RegistrationForm) {
for(var e in events) {
  let event = events[e];
  RegistrationForm.schema.post(e, emitEvent(event));
}
}


function emitEvent(event) {
  return function(doc) {
    RegistrationFormEvents.emit(event + ':' + doc._id, doc);
    RegistrationFormEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RegistrationFormEvents;
