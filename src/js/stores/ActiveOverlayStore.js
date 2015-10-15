import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let active = null;

const ActiveOverlayStore = assign(new EventEmitter, {
  getActive() {
    return active;
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'openOverlay':
      active = payload.overlay;
      ActiveOverlayStore.emit('change');
      break;
    case 'toggleOverlay':
      if (payload.overlay === active) {
        active = null;
      } else {
        active = payload.overlay;
      }
      ActiveOverlayStore.emit('change');
      break;
    case 'closeOverlay':
      active = null;
      ActiveOverlayStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default ActiveOverlayStore;
