import Sockette from "sockette";
import { take, put, apply, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  WS_OPEN,
  WS_INCOMING_MESSAGE,
  WS_OUTGOING_MESSAGE,
  WS_MAX,
  WS_CLOSE,
  WS_ERROR,
} from "./actions";

let socket;

function getSocketUrl() {
  if (process.env.REACT_APP_ADMIN_SOCKET_URL) {
    return process.env.REACT_APP_ADMIN_SOCKET_URL;
  }

  let port = "";
  if (window.location.port) {
    port = `:${window.location.port}`;
  }

  const proto = window.location.protocol.includes("https") ? "wss" : "ws";
  return `${proto}://${window.location.hostname}${port}/socket`;
}

// Setup subscription to incoming `ping` events
function createSocketChannel() {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel((emit) => {
    const onWsOpen = (event) => {
      emit({
        type: WS_OPEN,
        payload: { url: getSocketUrl() },
      });
    };

    const onWsMessage = (event) => {
      const json = JSON.parse(event.data);
      emit({
        type: WS_INCOMING_MESSAGE,
        payload: json,
      });
    };

    const onWsClosed = (event) => {
      console.error("Websocket connection closed", event);
      emit({ type: WS_CLOSE });
    };

    const onWsMaximum = (event) => {
      console.error("Websocket maximum reached", event);
      emit({ type: WS_MAX });
    };

    const onWsError = (error) => {
      console.error("Websocket error", error);
      emit({ type: WS_ERROR });
    };

    socket = new Sockette(getSocketUrl(), {
      timeout: 5000,
      onopen: onWsOpen,
      onmessage: onWsMessage,
      onreconnect: onWsOpen,
      onmaximum: onWsMaximum,
      onclose: onWsClosed,
      onerror: onWsError,
    });

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  });
}

export function* watchIncomingMessage() {
  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const channelData = yield take(socketChannel);
      // if (channelData.type === WS_OUTGOING_MESSAGE) {
      //   yield fork(sendMessage, channelData.payload)
      // } else {
      yield put(channelData);
      // }
    } catch (err) {
      console.error("socket error:", err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}

function* sendMessage(data) {
  yield apply(socket, socket.send, data);
}

export function* watchOutgoingMessage() {
  yield takeLatest(WS_OUTGOING_MESSAGE, sendMessage);
}

const socketChannel = createSocketChannel();
export { socket, socketChannel };
