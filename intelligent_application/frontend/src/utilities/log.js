const pino = require("pino");
const env = require("env-var");
const assert = require("assert");

const level = env.get("LOG_LEVEL", "info").asEnum(["trace", "debug", "info", "warn", "error"]);

/**
 * Creates a pino logger instance with a globally configured log level
 * @param {String} name
 */
module.exports = function getLogger(name) {
  assert(name, "logger instances must be named");

  return pino({
    level,
    name,
  });
};
