const Guest = require("../model/guestModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


function signUpGuest(req, res) {

  let objGuest = {
    guestname: req.body.guestname,
    email: req.body.email,
    password: req.body.password
  };

  Guest.create(objGuest)
    .then(Guests => {
      res.status(200).json({
        message: "Signup success",
        Guests
      });
    })
    .catch(error => {
      res.status(400).json({
        message: "Signup error",
        error
      });
    });
}

function loginGuest(req, res) {
  let pass = req.body.password;
  Guest.findOne({
      email: req.body.email
    })
    .then(Guest => {

      let compare = bcrypt.compareSync(pass, Guest.password);

      if (compare) {
        jwt.sign({
            email: Guest.email,
            id: Guest._id
          },
          process.env.SECRET_KEY,
          (err, token) => {
            console.log(token);

            res.status(200).json({
              message: 'Logged In Successfully',
              token
            });
          }
        );
      }
    })
    .catch(error => {
      res.status(400).json({
        message: "Wrong Guestname/password",
        error
      });
    });
}


module.exports = {
  signUpGuest,
  loginGuest

};