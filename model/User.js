const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrype = require("bcrypt");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    bcrype.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        throw new Error("Something went wrong while securing your password");
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
