const concatObject = require("../../utils/concat-object");

async function imageHandler(fastify, conn, messageObj) {
  fastify.log.debug("imageHandler %j", concatObject(messageObj));
}

module.exports = imageHandler;
