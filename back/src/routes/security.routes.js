const express = require("express");
const router = express.Router();
const {
  signIn,
  signOut,
  signUp,
} = require("../controllers/security.controller");

router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.post("/sign-up", signUp);

module.exports = router;
