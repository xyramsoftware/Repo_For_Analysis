/**
 * Coupon model events
 */

'use strict';

import {EventEmitter} from 'events';
var CarouselEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CarouselEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Carousel) {
  for(var e in events) {
    let event = events[e];
    Carousel.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CarouselEvents.emit(event + ':' + doc._id, doc);
    CarouselEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CarouselEvents;
