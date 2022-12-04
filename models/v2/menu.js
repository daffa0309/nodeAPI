const { Base } = require("./base");
const { BaseRead } = require("./base-read");

class MenuWrite extends Base {
  static get tableName() {
    return "visidata.menus";
  }
}

class MenuRead extends BaseRead {
  static get tableName() {
    return "visidata.menus";
  }
}

module.exports = {
  MenuWrite,
  MenuRead,
};
