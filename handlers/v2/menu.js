const { get, post, patch } = require(".");
const {
  MenuWrite,
  MenuRead,
} = require("../../models/v2/menu");
const {
  prepareObjectAsAPIResponse,
  transformAttributesToPascalCase,
} = require("../../utils/object");

async function all() {

  let menu = await MenuRead.all(
    undefined,
    {
      VISIBLE: 1,
    },
    undefined,
    undefined
  );

  if (menu.length === 0) {
    return null;
  }
  console.log();

  menu = menu.map((val) => {
    return prepareObjectAsAPIResponse(val, "VISIBLE");
  });

  return {
    menu,
  };
}

async function findById(...args) {
  const params = args[0];
  const { idMenu } = params;

  let menu = await MenuRead.all(
    undefined,
    {
      ID: idMenu,
      visible: 1,
    },
    undefined,
    undefined
  );

  if (menu.length === 0) {
    return null;
  }

  menu = menu.map((val) => {
    return prepareObjectAsAPIResponse(val, "VISIBLE");
  });

  return {
    menu,
  };
}

async function create(...args) {
  const body = args[2];


  let attributes = {
    ...body,
  };

  console.log(attributes);

  await MenuWrite.create(attributes);
}

async function update(...args) {
  const params = args[0];
  const body = args[2];

  const { id } = params;

  let attributes = {
    ...body,
  };

  attributes = transformAttributesToPascalCase(attributes);

  await MenuWrite.update(
    {
      ID: id,
    },
    attributes
  );
}
async function hide(...args) {
  const params = args[0];
  const { id } = params;

  await MenuWrite.hide({
    ID: id
  });
}

async function unhide(...args) {
  const params = args[0];
  const { id } = params;

  await MenuWrite.unhide({
    ID: id
  });
}

const allHandler = get(all, ["params"]);
const findByIdHandler = get(findById, ["params"]);
const createHandler = post(create, "params", "body");
const updateHandler = patch(update, "params", "body");
const hideHandler = patch(hide, "params");
const unhideHandler = patch(unhide, "params");
module.exports = {
  allHandler,
  findByIdHandler,
  createHandler,
  updateHandler,
  hideHandler,
  unhideHandler,
};
