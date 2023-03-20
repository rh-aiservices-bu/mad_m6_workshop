const { v4: uuidv4 } = require("uuid");
const { OUTGOING_MESSAGE_TYPES } = require("../../message-types");
const generateUsername = require("./generate-username");

async function initHandler(fastify, conn, messageObj) {
  fastify.log.debug("initHandler %j", messageObj);
  const user = initUser(fastify, conn, messageObj);
  conn.socket.send(
    JSON.stringify({
      type: OUTGOING_MESSAGE_TYPES.CONFIG,
      user,
    })
  );
}

function initUser(fastify, conn, { userId }) {
  fastify.log.debug("initUser %s", userId);
  if (userId) {
    const existingUser = global.users[userId];
    if (existingUser) {
      existingUser.conn = conn;
      return {
        id: existingUser.id,
        name: existingUser.name,
      };
    }
  }

  let newUser = {
    id: uuidv4(),
    name: generateUsername(),
  };

  global.users[newUser.id] = { ...newUser, conn };
  return newUser;
}

module.exports = initHandler;
