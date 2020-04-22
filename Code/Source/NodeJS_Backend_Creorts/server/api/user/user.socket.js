
'use strict';
import UserEvents from './user.events';
// Model events to emit
var events = {
  save: 'save'
};
var notify;
export function demo(receiverSocketId) {
  // Bind model events to socket events
 // receiverSocketIds = receiverSocketId;
 // console.log('Conected array222:' + JSON.stringify(receiverSocketId));
}
export function register(socket) {
  // Bind model events to socket events
  var event = events.save;
  var notifyListner = createNotifyListener(socket);
  UserEvents.on(event, notifyListner);
  }
export function createNotifyListener(socket) {
  return function(doc) {
    socket.emit('notify', doc);
  };
}

function removeListener(socket , event, listener) {
  return function() {
    socket.removeListener(event, listener);
  };
}

