import { take, put, fork, apply, takeLatest } from "redux-saga/effects";
import { WS_OUTGOING_MESSAGE } from "./actions";
import { socket, socketChannel } from "./channel";

function* watchIncomingMessage() {
  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const channelData = yield take(socketChannel);
      if (channelData.type === WS_OUTGOING_MESSAGE) {
        yield fork(sendMessage, channelData.payload);
      } else {
        yield put(channelData);
      }
    } catch (err) {
      console.error("socket error:", err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}

function* sendMessage(action) {
  yield apply(socket, socket.json, [action.payload]);
}

function* watchOutgoingMessage() {
  yield takeLatest(WS_OUTGOING_MESSAGE, sendMessage);
}

const exportedObject = [watchIncomingMessage(), watchOutgoingMessage()];

export default exportedObject;
