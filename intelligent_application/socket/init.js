const WebSocket = require("ws");
const appStatus = require("../utils/appStatus");

setup = (fastify) => {
  setInterval(function () {
    const status = appStatus(fastify);
    fastify.websocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify({ type: "heartbeat", status }));
        } catch (error) {
          fastify.log.error(`Failed to broadcast message to client.  Error: ${error.message}`);
        }
      }
    });
  }, 1000);
};

module.exports = setup;
