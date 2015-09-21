import dispatcher from '../dispatcher';
import { advance } from '../actions/AdvanceActionCreators';
import { receive as chatReceive } from '../actions/ChatActionCreators';
import FakeSocket from './FakeSocket';

const debug = require('debug')('uwave:websocket');

let dispatchToken = null;
export { dispatchToken };

let socket = null;
function send(command, data) {
  socket.send(JSON.stringify({ command, data }));
}

export function connect() {
  socket = new FakeSocket('WebSocket URL will go here');
  socket.on('data', pack => {
    const { command, data } = JSON.parse(pack);
    debug(command, data);
    // convert between server & client message formats
    switch (command) {
    case 'chatMessage':
      chatReceive({
        id: data.chatID,
        userID: data.userID,
        text: data.message,
        timestamp: data.timestamp
      });
      break;
    case 'advance':
      advance(data);
      break;
    default:
      debug('!unknown socket message type');
    }
  });

  dispatchToken = dispatcher.register(payload => {
    switch (payload.action) {
    case 'chatSend':
      send('chat', payload.message);
      break;
    default:
      // Not for us
    }
  });
}