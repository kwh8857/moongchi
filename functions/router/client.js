const express = require("express");
const firebaseApp = require("../config/firebaseModule");
const request = require("request");

const router = express.Router();
const cors = require("cors");
const Fdatabase = firebaseApp.database();

router.use(cors());
router.options("*", cors);
router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "연결 완료",
  });
});
module.exports = router;
