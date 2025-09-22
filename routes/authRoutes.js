const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signin", authController.renderSignIn);
router.get("/signup", authController.renderSignUp);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
