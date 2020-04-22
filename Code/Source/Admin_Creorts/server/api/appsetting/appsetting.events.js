/**
 * AppSetting model events
 */

'use strict';

import {EventEmitter} from 'events';
var AppSettingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AppSettingEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(AppSetting) {
  for(var e in events) {
    let event = events[e];
    AppSetting.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    AppSettingEvents.emit(event + ':' + doc._id, doc);
    AppSettingEvents.emit(event, doc);
  };
}

export {registerEvents};
export default AppSettingEvents;
