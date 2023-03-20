const TmpStorage = require("./TmpStorage");

let storage;
if (process.env.NODE_ENV === "development") {
  storage = new TmpStorage();
} else {
  storage = {
    writeFile: () => Promise.resolve(),
  };
}

module.exports = storage;
