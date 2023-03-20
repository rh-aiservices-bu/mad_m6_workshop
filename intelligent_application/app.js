"use strict";

const path = require("path");
const Static = require("@fastify/static");
const AutoLoad = require("@fastify/autoload");
const Sensible = require("@fastify/sensible");

const WebSocket = require("@fastify/websocket");
const processSocketMessage = require("./socket/process-socket-message");
const socketInit = require("./socket/init");

global.users = {};

const wsOpts = {
  maxPayload: 20 * 1024 * 1024 * 1024, // 20GB
};

module.exports = async function (fastify, opts) {
  fastify.register(Sensible);

  fastify.register(Static, {
    root: path.join(__dirname, "frontend/build"),
    wildcard: false,
  });

  fastify.register(WebSocket, {
    options: wsOpts,
  });

  fastify.get("/socket", { websocket: true }, (connection, req) => {
    connection.socket.on("message", (message) => {
      processSocketMessage(fastify, connection, message);
    });
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  await fastify.ready(async () => {
    socketInit(fastify);
  });
};
