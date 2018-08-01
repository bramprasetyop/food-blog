var express = require('express');
var router = express.Router();


const {
  signUpGuest,
  loginGuest
} = require("../controllers/guestController");

router.post('/guest/signup', signUpGuest)
  .post('/guest/login', loginGuest)

module.exports = router;