const express = require("express");

const router = express.Router();

const {
  createAccount,
  login,
  profile,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const { route } = require("./timeTable.route");
const auth = require("../middlewares/auth");
const rolecheck = require("../middlewares/rolechecker");

router.route("/register").post(auth, rolecheck, createAccount);
router.route("/login").post(login);
router.route("/profile").get(auth, profile);
router.route("/profile/update").put(auth, updateProfile);

router.route("/profile/password/update").put(auth, updatePassword);

module.exports = router;
