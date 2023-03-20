const ADJECTIVES = require("./adjectives");
const NOUNS = require("./nouns");

const generateUserName = () => {
  let username;
  let adjIndex = Math.floor(Math.random() * ADJECTIVES.length);
  let nounIndex = Math.floor(Math.random() * NOUNS.length);
  username = ADJECTIVES[adjIndex] + " " + NOUNS[nounIndex];
  return username;
};

module.exports = generateUserName;
