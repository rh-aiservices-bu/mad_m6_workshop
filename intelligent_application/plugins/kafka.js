const fp = require("fastify-plugin");

const fn = (fastify, opts, next) => {
  next();
};

module.exports = fp(fn, {
  fastify: ">=3",
});
