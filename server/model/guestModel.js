const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

let guestSchema = new Schema({
  guestname: {
    type: String
  },
  email: {
    type: String
  },
  password: String,
}, {
  timestamps: true
});


guestSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});




const Guest = mongoose.model("Guests", guestSchema);

module.exports = Guest;