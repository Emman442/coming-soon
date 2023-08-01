const express = require("express");
const router = express.Router()
const {SignUpForWaitList, getLatestUser} = require("../controllers/userController");
router.route("/").post(SignUpForWaitList)

module.exports = router
// "New commit"