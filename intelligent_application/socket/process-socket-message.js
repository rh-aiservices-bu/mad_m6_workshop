const { INCOMING_MESSAGE_TYPES } = require("./message-types");

function processSocketMessage(fastify, conn, messageStr) {
  let messageObj;

  try {
    messageObj = JSON.parse(messageStr);
  } catch (error) {
    fastify.log.error("Malformed socket message JSON: %s", error.message);
    return;
  }

  fastify.log.info(`processing message of type '${messageObj.type}'`);
  // fastify.log.debug(`payload for message '${messageObj.type}' was: %j`, messageObj);

  switch (messageObj.type) {
    case INCOMING_MESSAGE_TYPES.INIT:
      require("./handlers/init")(fastify, conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.PING:
      require("./handlers/ping")(fastify, conn, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.IMAGE:
      require("./handlers/image")(fastify, conn, messageObj);
      break;

    default:
      fastify.log.warn(`Unhandled message of type '${messageObj.type}'`);
      break;
  }
}

module.exports = processSocketMessage;
