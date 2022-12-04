const { Base } = require("./base");
const { BaseRead } = require("./base-read");

class UserWrite extends Base {
  static get tableName() {
    return "visidata.users";
  }
}

class UserRead extends BaseRead {
  static get tableName() {
    return "visidata.users";
  }
}

module.exports = {
  UserWrite,
  UserRead,
};
