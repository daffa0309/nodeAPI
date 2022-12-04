const express = require("express");

const MenuController = require("../../handlers/v2/menu");

const router = express.Router();
const { authentication } = require("../../middlewares/auth");

router.get(
  "/menu",
 MenuController.allHandler
);
router.get(
  "/menu/:idMenu",
 MenuController.findByIdHandler
);
router.post(
  "/menu",
 MenuController.createHandler
);
router.patch(
  "/data-klinik/:idDataKlinik/menu/all/:idUser",
 MenuController.updateHandler
);
router.patch(
  "/data-klinik/:idDataKlinik/menu/all/:idUser/hide",
 MenuController.hideHandler
);
router.patch(
  "/data-klinik/:idDataKlinik/menu/all/:idUser/unhide",
 MenuController.unhideHandler
);
module.exports = router;
