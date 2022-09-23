const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema(
  {
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
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;