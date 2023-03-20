"use strict";
const appStatus = require("../../../utils/appStatus");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return appStatus(fastify);
  });
};
