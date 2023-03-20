import get from "lodash/get";

import { GET_STATUS_FULFILLED } from "./actions";
import { WS_OPEN, WS_INCOMING_MESSAGE, WS_MAX, WS_CLOSE, WS_ERROR } from "../Socket/actions";
import { INCOMING_MESSAGE_TYPES } from "../Socket/messageTypes";

const initialState = {
  status: null,
  connection: null,
  connectionUrl: null,
  connectionError: null,
  lastHeartbeat: null,
  user: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_FULFILLED:
      return {
        ...state,
        status: get(action, "payload.response.data"),
      };

    case WS_OPEN:
      return {
        ...state,
        connection: "connected",
        connectionUrl: action.payload.url,
      };
    case WS_CLOSE:
      return {
        ...state,
        connection: "disconnected",
      };
    case WS_MAX:
      return {
        ...state,
        connection: "lost",
      };
    case WS_ERROR:
      return {
        ...state,
        connectionError: action.payload.error,
      };
    case WS_INCOMING_MESSAGE:
      return processWsMessage(state, action.payload);
    default:
      return state;
  }
};

function processWsMessage(state, message) {
  const { type, ...data } = message;
  let newValues = {};

  switch (type) {
    case INCOMING_MESSAGE_TYPES.HEARTBEAT:
      newValues = data;
      newValues.lastHeartbeat = new Date();
      break;
    case INCOMING_MESSAGE_TYPES.CONFIG:
      updateLocalStorage(state, message);
      newValues = data;
      break;
    default:
      newValues = data;
  }
  return { ...state, ...newValues, loading: false, connection: "connected" };
}

function updateLocalStorage(state, message) {
  localStorage.setItem("userId", message.user.id);
  localStorage.setItem("username", message.user.name);
}
