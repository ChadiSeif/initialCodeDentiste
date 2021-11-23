const express = require("express");
const {
  Create,
  MedecinDispo,
  listedisponibility,
  updateDisponibility,
  updateDisponibilityDay,
} = require("../controllers/disponibility");
const router = express.Router();

//bodyparser
router.use(express.json());

//@desc : Create disponibility
//@method: POST
//@path : /Create
//@data : req.body
router.post("/Create", Create);

//@desc : view disponibility
//@method: GET
//@path : /View
//@data : No
router.get("/View/", listedisponibility);

//@desc : view disponibility
//@method: GET
//@path : /disponibility
//@data : No
router.get("/View/:id", MedecinDispo);

//@desc : update disponibility
//@method: Put
//@path : /Update
//@data : req.body
router.put("/Update/:id", updateDisponibility);

//@desc : update disponibility
//@method: Put
//@path : /Update
//@data : req.body
router.put("/UpdateDay/:id", updateDisponibilityDay);

module.exports = router;
