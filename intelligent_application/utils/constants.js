const env = require("env-var");
const PORT = env.get("PORT").default("8080").asString();
const IP = env.get("IP").default("0.0.0.0").asString();
const LOG_LEVEL = env.get("LOG_LEVEL").default("info").asString();
const OBJECT_DETECTION_URL = env
  .get("OBJECT_DETECTION_URL")
  .default("http://localhost:8000/predictions")
  .asString();

const constants = {
  PORT,
  IP,
  LOG_LEVEL,
  OBJECT_DETECTION_URL,
};

console.log(constants)
module.exports = constants;
