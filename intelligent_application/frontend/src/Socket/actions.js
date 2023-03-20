const WS_OPEN = "Socket.WS_OPEN";
const WS_INCOMING_MESSAGE = "Socket.WS_INCOMING_MESSAGE";
const WS_MAX = "Socket.WS_MAX";
const WS_CLOSE = "Socket.WS_CLOSE";
const WS_ERROR = "Socket.WS_ERROR";

const WS_OUTGOING_MESSAGE = "Socket.WS_OUTGOING_MESSAGE";
export const sendOutgoingMessage = (payload) => ({
  type: WS_OUTGOING_MESSAGE,
  payload,
});

export { WS_OPEN, WS_INCOMING_MESSAGE, WS_OUTGOING_MESSAGE, WS_MAX, WS_CLOSE, WS_ERROR };
