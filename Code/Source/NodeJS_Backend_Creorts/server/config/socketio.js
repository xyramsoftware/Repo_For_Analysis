
/**
 * Socket.io configuration
 */
'use strict';
import config from './environment';
var mongoose = require('mongoose');
var sockets = [];
var people = {};

// When the user disconnects.. perform this
function onDisconnect(socket) {
  delete people[socket.id];
  // socket.removeAllListeners();
  console.log('spliced');
  sockets.splice(sockets.indexOf(socket), 1);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  // socket.on('info', data => {
  //   socket.log(JSON.stringify(data, null, 2));
  // });
  socket.on('ConferenceInfo', function(data) {
    sockets.push(socket);
    userIds.push(data.userId);
    people[socket.id] = data.userId;
  });


  // Insert sockets below
  require('../api/eventDates/eventDates.socket').register(socket);
  require('../api/category/category.socket').register(socket);
  require('../api/event/event.socket').register(socket);
  require('../api/wishlist/wishlist.socket').register(socket);
  require('../api/accompanyPerson/accompanyPerson.socket').register(socket);
  require('../api/feedback/feedback.socket').register(socket);
  require('../api/news/news.socket').register(socket);
  require('../api/gallery/gallery.socket').register(socket);
  require('../api/gallery/gallery.socket').register(socket);
  require('../api/notification/notification.socket').register(socket);
 
}

export default function(socketio) {

  socketio.on('connection', function(socket) {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}
