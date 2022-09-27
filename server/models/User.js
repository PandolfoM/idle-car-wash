const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Not a valid email address"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  sfx: {
    type: Boolean,
    default: true,
  },
  wallet: {
    cash: {
      type: Number,
      required: true,
      default: 0,
    },
    gems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  water: {
    lvl: {
      type: Number,
      default: 1,
    },
    cost: {
      type: Number,
      default: 3,
    },
    profit: {
      type: Number,
      default: 1,
    },
    speed: {
      type: Number,
      default: 10
    }
  },
  wheel: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 7,
    },
    profit: {
      type: Number,
      default: 5,
    },
    speed: {
      type: Number,
      default: 5
    }
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
