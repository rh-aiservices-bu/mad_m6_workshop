function concatObject(obj) {
  let co = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      co[key] = value.map((x) => concatObject(x));
    } else if (typeof value === "object") {
      co[key] = concatObject(value);
    } else if (typeof value === "string" && value.length > 50) {
      co[key] = value.substring(0, 50);
    } else {
      co[key] = value;
    }
  }
  return co;
}

module.exports = concatObject;
