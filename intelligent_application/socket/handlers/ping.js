const { OUTGOING_MESSAGE_TYPES } = require("../message-types");

async function pingHandler(fastify, conn, messageObj) {
  conn.socket.send(
    JSON.stringify({
      type: OUTGOING_MESSAGE_TYPES.PING_RESPONSE,
    })
  );
}
module.exports = pingHandler;
