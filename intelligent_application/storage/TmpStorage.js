const fs = require("fs");
const path = require("path");

class TmpStorage {
  async writeFile(fileContent, dest) {
    const filepath = path.join("/tmp", dest);
    const filedir = path.dirname(filepath);

    try {
      await fs.promises.mkdir(filedir, { recursive: true });
    } catch (err) {
      if (err.code !== "EEXIST") {
        console.error({ type: typeof err, error: err });
        throw err;
      }
    }
    return fs.promises.writeFile(filepath, fileContent);
  }
}

module.exports = TmpStorage;
