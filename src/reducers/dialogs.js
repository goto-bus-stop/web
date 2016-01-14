import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG
} from '../constants/actionTypes/dialogs';

const initialState = {
  editMedia: {
    open: false,
    payload: {}
  },
  login: {
    open: false,
    payload: {}
  }
};

const openDialog = (state, name, payload, open = true) => ({
  ...state,
  [name]: {
    open,
    payload
  }
});
const closeDialog = (state, name) =>
  openDialog(state, name, {}, false);

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case OPEN_EDIT_MEDIA_DIALOG:
    return openDialog(state, 'editMedia', payload);
  case CLOSE_EDIT_MEDIA_DIALOG:
    return closeDialog(state, 'editMedia');
  case OPEN_LOGIN_DIALOG:
    return openDialog(state, 'login', payload);
  case CLOSE_LOGIN_DIALOG:
    return closeDialog(state, 'login');
  default:
    return state;
  }
}