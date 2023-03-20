function appStatus(fastify) {
  let kafka = "disconnected";
  return {
    status: "ok",
    kafka,
  };
}

module.exports = appStatus;
